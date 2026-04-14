import { get_request_store, with_request_store } from "@sveltejs/kit/internal/server";
import { parse } from "devalue";
import { error, json } from "@sveltejs/kit";
import { x as stringify_remote_arg, j as create_remote_key, y as unfriendly_hydratable, e as noop, l as stringify, M as MUTATIVE_METHODS, z as create_field_proxy, A as normalize_issue, B as set_nested_value, C as flatten_issues, D as deep_set, h as handle_error_and_jsonify, p as parse_remote_arg } from "./chunks/shared.js";
import { ValidationError, HttpError, SvelteKitError } from "@sveltejs/kit/internal";
import { B as BROWSER } from "./chunks/false.js";
import { b as base, c as app_dir } from "./chunks/server.js";
import { p as prerendering } from "./chunks/environment.js";
function create_validator(validate_or_fn, maybe_fn) {
  if (!maybe_fn) {
    return (arg) => {
      if (arg !== void 0) {
        error(400, "Bad Request");
      }
    };
  }
  if (validate_or_fn === "unchecked") {
    return (arg) => arg;
  }
  if ("~standard" in validate_or_fn) {
    return async (arg) => {
      const { event, state } = get_request_store();
      const result = await validate_or_fn["~standard"].validate(arg);
      if (result.issues) {
        error(
          400,
          await state.handleValidationError({
            issues: result.issues,
            event
          })
        );
      }
      return result.value;
    };
  }
  throw new Error(
    'Invalid validator passed to remote function. Expected "unchecked" or a Standard Schema (https://standardschema.dev)'
  );
}
async function get_response(internals, arg, state, get_result) {
  await 0;
  const cache = get_cache(internals, state);
  const key = stringify_remote_arg(arg, state.transport);
  const entry = cache[key] ??= {
    serialize: false,
    data: get_result()
  };
  entry.serialize ||= !!state.is_in_universal_load;
  if (state.is_in_render && internals.id) {
    const remote_key = create_remote_key(internals.id, key);
    Promise.resolve(entry.data).then((value) => {
      void unfriendly_hydratable(remote_key, () => stringify(value, state.transport));
    }).catch(noop);
  }
  return entry.data;
}
function parse_remote_response(data, transport) {
  const revivers = {};
  for (const key in transport) {
    revivers[key] = transport[key].decode;
  }
  return parse(data, revivers);
}
async function run_remote_function(event, state, allow_cookies, get_input, fn) {
  const store = {
    event: {
      ...event,
      setHeaders: () => {
        throw new Error("setHeaders is not allowed in remote functions");
      },
      cookies: {
        ...event.cookies,
        set: (name, value, opts) => {
          if (!allow_cookies) {
            throw new Error("Cannot set cookies in `query` or `prerender` functions");
          }
          if (opts.path && !opts.path.startsWith("/")) {
            throw new Error("Cookies set in remote functions must have an absolute path");
          }
          return event.cookies.set(name, value, opts);
        },
        delete: (name, opts) => {
          if (!allow_cookies) {
            throw new Error("Cannot delete cookies in `query` or `prerender` functions");
          }
          if (opts.path && !opts.path.startsWith("/")) {
            throw new Error("Cookies deleted in remote functions must have an absolute path");
          }
          return event.cookies.delete(name, opts);
        }
      }
    },
    state: {
      ...state,
      is_in_remote_function: true
    }
  };
  const input = await with_request_store(store, get_input);
  return with_request_store(store, () => fn(input));
}
function get_cache(internals, state = get_request_store().state) {
  let cache = state.remote.data?.get(internals);
  if (cache === void 0) {
    cache = {};
    (state.remote.data ??= /* @__PURE__ */ new Map()).set(internals, cache);
  }
  return cache;
}
// @__NO_SIDE_EFFECTS__
function command(validate_or_fn, maybe_fn) {
  const fn = maybe_fn ?? validate_or_fn;
  const validate = create_validator(validate_or_fn, maybe_fn);
  const __ = { type: "command", id: "", name: "" };
  const wrapper = (arg) => {
    const { event, state } = get_request_store();
    if (!MUTATIVE_METHODS.includes(event.request.method)) {
      throw new Error(
        `Cannot call a command (\`${__.name}(${maybe_fn ? "..." : ""})\`) from a ${event.request.method} handler`
      );
    }
    if (state.is_in_render) {
      throw new Error(
        `Cannot call a command (\`${__.name}(${maybe_fn ? "..." : ""})\`) during server-side rendering`
      );
    }
    state.remote.refreshes ??= {};
    const promise = Promise.resolve(
      run_remote_function(event, state, true, () => validate(arg), fn)
    );
    promise.updates = () => {
      throw new Error(`Cannot call '${__.name}(...).updates(...)' on the server`);
    };
    return (
      /** @type {ReturnType<RemoteCommand<Input, Output>>} */
      promise
    );
  };
  Object.defineProperty(wrapper, "__", { value: __ });
  Object.defineProperty(wrapper, "pending", {
    get: () => 0
  });
  return wrapper;
}
// @__NO_SIDE_EFFECTS__
function form(validate_or_fn, maybe_fn) {
  const fn = maybe_fn ?? validate_or_fn;
  const schema = !maybe_fn || validate_or_fn === "unchecked" ? null : (
    /** @type {any} */
    validate_or_fn
  );
  function create_instance(key) {
    const instance = {};
    instance.method = "POST";
    Object.defineProperty(instance, "enhance", {
      value: () => {
        return { action: instance.action, method: instance.method };
      }
    });
    const __ = {
      type: "form",
      name: "",
      id: "",
      fn: async (data, meta, form_data) => {
        const output = {};
        output.submission = true;
        const { event, state } = get_request_store();
        const validated = await schema?.["~standard"].validate(data);
        if (meta.validate_only) {
          return validated?.issues?.map((issue) => normalize_issue(issue, true)) ?? [];
        }
        if (validated?.issues !== void 0) {
          handle_issues(output, validated.issues, form_data);
        } else {
          if (validated !== void 0) {
            data = validated.value;
          }
          state.remote.refreshes ??= {};
          const issue = create_issues();
          try {
            output.result = await run_remote_function(
              event,
              state,
              true,
              () => data,
              (data2) => !maybe_fn ? fn() : fn(data2, issue)
            );
          } catch (e) {
            if (e instanceof ValidationError) {
              handle_issues(output, e.issues, form_data);
            } else {
              throw e;
            }
          }
        }
        if (!event.isRemoteRequest) {
          get_cache(__, state)[""] ??= { serialize: true, data: output };
        }
        return output;
      }
    };
    Object.defineProperty(instance, "__", { value: __ });
    Object.defineProperty(instance, "action", {
      get: () => `?/remote=${__.id}`,
      enumerable: true
    });
    Object.defineProperty(instance, "fields", {
      get() {
        return create_field_proxy(
          {},
          () => get_cache(__)?.[""]?.data?.input ?? {},
          (path, value) => {
            const cache = get_cache(__);
            const entry = cache[""];
            if (entry?.data?.submission) {
              return;
            }
            if (path.length === 0) {
              (cache[""] ??= { serialize: true, data: {} }).data.input = value;
              return;
            }
            const input = entry?.data?.input ?? {};
            deep_set(input, path.map(String), value);
            (cache[""] ??= { serialize: true, data: {} }).data.input = input;
          },
          () => flatten_issues(get_cache(__)?.[""]?.data?.issues ?? [])
        );
      }
    });
    Object.defineProperty(instance, "result", {
      get() {
        try {
          return get_cache(__)?.[""]?.data?.result;
        } catch {
          return void 0;
        }
      }
    });
    Object.defineProperty(instance, "pending", {
      get: () => 0
    });
    Object.defineProperty(instance, "preflight", {
      // preflight is a noop on the server
      value: () => instance
    });
    Object.defineProperty(instance, "validate", {
      value: () => {
        throw new Error("Cannot call validate() on the server");
      }
    });
    if (key == void 0) {
      Object.defineProperty(instance, "for", {
        /** @type {RemoteForm<any, any>['for']} */
        value: (key2) => {
          const { state } = get_request_store();
          const cache_key = __.id + "|" + JSON.stringify(key2);
          let instance2 = (state.remote.forms ??= /* @__PURE__ */ new Map()).get(cache_key);
          if (!instance2) {
            instance2 = create_instance(key2);
            instance2.__.id = `${__.id}/${encodeURIComponent(JSON.stringify(key2))}`;
            instance2.__.name = __.name;
            state.remote.forms.set(cache_key, instance2);
          }
          return instance2;
        }
      });
    }
    return instance;
  }
  return create_instance();
}
function handle_issues(output, issues, form_data) {
  output.issues = issues.map((issue) => normalize_issue(issue, true));
  if (form_data) {
    output.input = {};
    for (let key of form_data.keys()) {
      if (/^[.\]]?_/.test(key)) continue;
      const is_array = key.endsWith("[]");
      const values = form_data.getAll(key).filter((value) => typeof value === "string");
      if (is_array) key = key.slice(0, -2);
      set_nested_value(
        /** @type {Record<string, any>} */
        output.input,
        key,
        is_array ? values : values[0]
      );
    }
  }
}
function create_issues() {
  return (
    /** @type {InvalidField<any>} */
    new Proxy(
      /** @param {string} message */
      (message) => {
        if (typeof message !== "string") {
          throw new Error(
            "`invalid` should now be imported from `@sveltejs/kit` to throw validation issues. The second parameter provided to the form function (renamed to `issue`) is still used to construct issues, e.g. `invalid(issue.field('message'))`. For more info see https://github.com/sveltejs/kit/pulls/14768"
          );
        }
        return create_issue(message);
      },
      {
        get(target, prop) {
          if (typeof prop === "symbol") return (
            /** @type {any} */
            target[prop]
          );
          return create_issue_proxy(prop, []);
        }
      }
    )
  );
  function create_issue(message, path = []) {
    return {
      message,
      path
    };
  }
  function create_issue_proxy(key, path) {
    const new_path = [...path, key];
    const issue_func = (message) => create_issue(message, new_path);
    return new Proxy(issue_func, {
      get(target, prop) {
        if (typeof prop === "symbol") return (
          /** @type {any} */
          target[prop]
        );
        if (/^\d+$/.test(prop)) {
          return create_issue_proxy(parseInt(prop, 10), new_path);
        }
        return create_issue_proxy(prop, new_path);
      }
    });
  }
}
// @__NO_SIDE_EFFECTS__
function prerender(validate_or_fn, fn_or_options, maybe_options) {
  const maybe_fn = typeof fn_or_options === "function" ? fn_or_options : void 0;
  const options = maybe_options ?? (maybe_fn ? void 0 : fn_or_options);
  const fn = maybe_fn ?? validate_or_fn;
  const validate = create_validator(validate_or_fn, maybe_fn);
  const __ = {
    type: "prerender",
    id: "",
    name: "",
    has_arg: !!maybe_fn,
    inputs: options?.inputs,
    dynamic: options?.dynamic
  };
  const wrapper = (arg) => {
    const promise = (async () => {
      const { event, state } = get_request_store();
      const payload = stringify_remote_arg(arg, state.transport);
      const id = __.id;
      const url = `${base}/${app_dir}/remote/${id}${payload ? `/${payload}` : ""}`;
      if (!state.prerendering && !BROWSER && !event.isRemoteRequest) {
        try {
          return await get_response(__, arg, state, async () => {
            const key = stringify_remote_arg(arg, state.transport);
            const cache = get_cache(__, state);
            const promise3 = (cache[key] ??= {
              serialize: true,
              data: fetch(new URL(url, event.url.origin).href).then(async (response) => {
                if (!response.ok) {
                  throw new Error("Prerendered response not found");
                }
                const prerendered = await response.json();
                if (prerendered.type === "error") {
                  error(prerendered.status, prerendered.error);
                }
                return prerendered.result;
              })
            }).data;
            return parse_remote_response(await promise3, state.transport);
          });
        } catch {
        }
      }
      if (state.prerendering?.remote_responses.has(url)) {
        return (
          /** @type {Promise<any>} */
          state.prerendering.remote_responses.get(url)
        );
      }
      const promise2 = get_response(
        __,
        arg,
        state,
        () => run_remote_function(event, state, false, () => validate(arg), fn)
      );
      if (state.prerendering) {
        state.prerendering.remote_responses.set(url, promise2);
      }
      const result = await promise2;
      if (state.prerendering) {
        const body = { type: "result", result: stringify(result, state.transport) };
        state.prerendering.dependencies.set(url, {
          body: JSON.stringify(body),
          response: json(body)
        });
      }
      return result;
    })();
    promise.catch(noop);
    return (
      /** @type {RemoteResource<Output>} */
      promise
    );
  };
  Object.defineProperty(wrapper, "__", { value: __ });
  return wrapper;
}
// @__NO_SIDE_EFFECTS__
function query(validate_or_fn, maybe_fn) {
  const fn = maybe_fn ?? validate_or_fn;
  const validate = create_validator(validate_or_fn, maybe_fn);
  const __ = { type: "query", id: "", name: "", validate };
  const wrapper = (arg) => {
    if (prerendering) {
      throw new Error(
        `Cannot call query '${__.name}' while prerendering, as prerendered pages need static data. Use 'prerender' from $app/server instead`
      );
    }
    const { event, state } = get_request_store();
    const is_validated = is_validated_argument(__, state, arg);
    return create_query_resource(
      __,
      arg,
      state,
      () => run_remote_function(event, state, false, () => is_validated ? arg : validate(arg), fn)
    );
  };
  Object.defineProperty(wrapper, "__", { value: __ });
  return wrapper;
}
function is_validated_argument(__, state, arg) {
  return state.remote.validated?.get(__.id)?.has(arg) ?? false;
}
function mark_argument_validated(__, state, arg) {
  const validated = state.remote.validated ??= /* @__PURE__ */ new Map();
  let validated_args = validated.get(__.id);
  if (!validated_args) {
    validated_args = /* @__PURE__ */ new Set();
    validated.set(__.id, validated_args);
  }
  validated_args.add(arg);
  return arg;
}
// @__NO_SIDE_EFFECTS__
function batch(validate_or_fn, maybe_fn) {
  const fn = maybe_fn ?? validate_or_fn;
  const validate = create_validator(validate_or_fn, maybe_fn);
  const __ = {
    type: "query_batch",
    id: "",
    name: "",
    run: async (args, options) => {
      const { event, state } = get_request_store();
      return run_remote_function(
        event,
        state,
        false,
        async () => Promise.all(args.map(validate)),
        async (input) => {
          const get_result = await fn(input);
          return Promise.all(
            input.map(async (arg, i) => {
              try {
                const data = get_result(arg, i);
                return { type: "result", data: stringify(data, state.transport) };
              } catch (error2) {
                return {
                  type: "error",
                  error: await handle_error_and_jsonify(event, state, options, error2),
                  status: error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : 500
                };
              }
            })
          );
        }
      );
    }
  };
  let batching = /* @__PURE__ */ new Map();
  const wrapper = (arg) => {
    if (prerendering) {
      throw new Error(
        `Cannot call query.batch '${__.name}' while prerendering, as prerendered pages need static data. Use 'prerender' from $app/server instead`
      );
    }
    const { event, state } = get_request_store();
    return create_query_resource(__, arg, state, () => {
      return new Promise((resolve, reject) => {
        const key = stringify_remote_arg(arg, state.transport);
        const entry = batching.get(key);
        if (entry) {
          entry.resolvers.push({ resolve, reject });
          return;
        }
        batching.set(key, {
          arg,
          resolvers: [{ resolve, reject }]
        });
        if (batching.size > 1) return;
        setTimeout(async () => {
          const batched = batching;
          batching = /* @__PURE__ */ new Map();
          const entries = Array.from(batched.values());
          const args = entries.map((entry2) => entry2.arg);
          try {
            return await run_remote_function(
              event,
              state,
              false,
              async () => Promise.all(args.map(validate)),
              async (input) => {
                const get_result = await fn(input);
                for (let i = 0; i < entries.length; i++) {
                  try {
                    const result = get_result(input[i], i);
                    for (const resolver of entries[i].resolvers) {
                      resolver.resolve(result);
                    }
                  } catch (error2) {
                    for (const resolver of entries[i].resolvers) {
                      resolver.reject(error2);
                    }
                  }
                }
              }
            );
          } catch (error2) {
            for (const entry2 of batched.values()) {
              for (const resolver of entry2.resolvers) {
                resolver.reject(error2);
              }
            }
          }
        }, 0);
      });
    });
  };
  Object.defineProperty(wrapper, "__", { value: __ });
  return wrapper;
}
function create_query_resource(__, arg, state, fn) {
  let promise = null;
  const get_promise = () => {
    return promise ??= get_response(__, arg, state, fn);
  };
  return {
    /** @type {Promise<any>['catch']} */
    catch(onrejected) {
      return get_promise().catch(onrejected);
    },
    current: void 0,
    error: void 0,
    /** @type {Promise<any>['finally']} */
    finally(onfinally) {
      return get_promise().finally(onfinally);
    },
    loading: true,
    ready: false,
    refresh() {
      const refresh_context = get_refresh_context(__, "refresh", arg);
      const is_immediate_refresh = !refresh_context.cache[refresh_context.cache_key];
      const value = is_immediate_refresh ? get_promise() : fn();
      return update_refresh_value(refresh_context, value, is_immediate_refresh);
    },
    run() {
      if (!state.is_in_universal_load) {
        throw new Error(
          "On the server, .run() can only be called in universal `load` functions. Anywhere else, just await the query directly"
        );
      }
      return get_response(__, arg, state, fn);
    },
    /** @param {any} value */
    set(value) {
      return update_refresh_value(get_refresh_context(__, "set", arg), value);
    },
    /** @type {Promise<any>['then']} */
    then(onfulfilled, onrejected) {
      return get_promise().then(onfulfilled, onrejected);
    },
    withOverride() {
      throw new Error(`Cannot call '${__.name}.withOverride()' on the server`);
    },
    get [Symbol.toStringTag]() {
      return "QueryResource";
    }
  };
}
Object.defineProperty(query, "batch", { value: batch, enumerable: true });
function get_refresh_context(__, action, arg) {
  const { state } = get_request_store();
  const { refreshes } = state.remote;
  if (!refreshes) {
    const name = __.type === "query_batch" ? `query.batch '${__.name}'` : `query '${__.name}'`;
    throw new Error(
      `Cannot call ${action} on ${name} because it is not executed in the context of a command/form remote function`
    );
  }
  const cache = get_cache(__, state);
  const cache_key = stringify_remote_arg(arg, state.transport);
  const refreshes_key = create_remote_key(__.id, cache_key);
  return { __, state, refreshes, refreshes_key, cache, cache_key };
}
function update_refresh_value({ __, refreshes, refreshes_key, cache, cache_key }, value, is_immediate_refresh = false) {
  const promise = Promise.resolve(value);
  if (!is_immediate_refresh) {
    cache[cache_key] = { serialize: true, data: promise };
  }
  if (__.id) {
    refreshes[refreshes_key] = promise;
  }
  return promise.then(noop, noop);
}
function requested(query2, limit = Infinity) {
  const { state } = get_request_store();
  const internals = (
    /** @type {RemoteQueryInternals | undefined} */
    /** @type {any} */
    query2.__
  );
  if (!internals || internals.type !== "query") {
    throw new Error("requested(...) expects a query function created with query(...)");
  }
  const requested2 = state.remote.requested;
  const payloads = requested2?.get(internals.id) ?? [];
  const refreshes = state.remote.refreshes ??= {};
  const [selected, skipped] = split_limit(payloads, limit);
  const record_failure = (payload, error2) => {
    const promise = Promise.reject(error2);
    promise.catch(noop);
    const key = create_remote_key(internals.id, payload);
    refreshes[key] = promise;
  };
  for (const payload of skipped) {
    record_failure(
      payload,
      new Error(
        `Requested refresh was rejected because it exceeded requested(${internals.name}, ${limit}) limit`
      )
    );
  }
  return {
    *[Symbol.iterator]() {
      for (const payload of selected) {
        try {
          const parsed = parse_remote_arg(payload, state.transport);
          const validated = internals.validate(parsed);
          if (is_thenable(validated)) {
            throw new Error(
              // TODO improve
              `requested(${internals.name}, ${limit}) cannot be used with synchronous iteration because the query validator is async. Use \`for await ... of\` instead`
            );
          }
          yield mark_argument_validated(internals, state, validated);
        } catch (error2) {
          record_failure(payload, error2);
          continue;
        }
      }
    },
    async *[Symbol.asyncIterator]() {
      yield* race_all(selected, async (payload) => {
        try {
          const parsed = parse_remote_arg(payload, state.transport);
          const validated = await internals.validate(parsed);
          return mark_argument_validated(internals, state, validated);
        } catch (error2) {
          record_failure(payload, error2);
          throw new Error(`Skipping ${internals.name}(${payload})`, { cause: error2 });
        }
      });
    },
    async refreshAll() {
      for await (const arg of this) {
        void query2(arg).refresh();
      }
    }
  };
}
function split_limit(array, limit) {
  if (limit === Infinity) {
    return [array, []];
  }
  if (!Number.isInteger(limit) || limit < 0) {
    throw new Error("Limit must be a non-negative integer or Infinity");
  }
  return [array.slice(0, limit), array.slice(limit)];
}
function is_thenable(value) {
  return !!value && (typeof value === "object" || typeof value === "function") && "then" in value;
}
async function* race_all(array, fn) {
  const pending = /* @__PURE__ */ new Set();
  for (const value of array) {
    const promise = Promise.resolve(fn(value)).then((result) => ({
      promise,
      value: result
    }));
    promise.catch(noop);
    pending.add(promise);
  }
  while (pending.size > 0) {
    try {
      const { promise, value } = await Promise.race(pending);
      pending.delete(promise);
      yield value;
    } catch {
    }
  }
}
export {
  command,
  form,
  prerender,
  query,
  requested
};
