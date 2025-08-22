import { domainDescriptions, entriesOf, flatMorph, hasDomain, isArray, isEmptyObject, printable, throwInternalError, throwParseError, unset } from "@ark/util";
import { nodeClassesByKind, nodeImplementationsByKind } from "./kinds.js";
import { Disjoint } from "./shared/disjoint.js";
import { constraintKeys, defaultValueSerializer, isNodeKind, precedenceOfKind } from "./shared/implement.js";
import { $ark } from "./shared/registry.js";
import { hasArkKind, isNode } from "./shared/utils.js";
export const schemaKindOf = (schema, allowedKinds) => {
    const kind = discriminateRootKind(schema);
    if (allowedKinds && !allowedKinds.includes(kind)) {
        return throwParseError(`Root of kind ${kind} should be one of ${allowedKinds}`);
    }
    return kind;
};
const discriminateRootKind = (schema) => {
    if (hasArkKind(schema, "root"))
        return schema.kind;
    if (typeof schema === "string") {
        return (schema[0] === "$" ? "alias"
            : schema in domainDescriptions ? "domain"
                : "proto");
    }
    if (typeof schema === "function")
        return "proto";
    // throw at end of function
    if (typeof schema !== "object" || schema === null)
        return throwParseError(writeInvalidSchemaMessage(schema));
    if ("morphs" in schema)
        return "morph";
    if ("branches" in schema || isArray(schema))
        return "union";
    if ("unit" in schema)
        return "unit";
    if ("reference" in schema)
        return "alias";
    const schemaKeys = Object.keys(schema);
    if (schemaKeys.length === 0 || schemaKeys.some(k => k in constraintKeys))
        return "intersection";
    if ("proto" in schema)
        return "proto";
    if ("domain" in schema)
        return "domain";
    return throwParseError(writeInvalidSchemaMessage(schema));
};
export const writeInvalidSchemaMessage = (schema) => `${printable(schema)} is not a valid type schema`;
const nodeCountsByPrefix = {};
const serializeListableChild = (listableNode) => isArray(listableNode) ?
    listableNode.map(node => node.collapsibleJson)
    : listableNode.collapsibleJson;
export const nodesByRegisteredId = {};
$ark.nodesByRegisteredId = nodesByRegisteredId;
export const registerNodeId = (prefix) => {
    nodeCountsByPrefix[prefix] ??= 0;
    return `${prefix}${++nodeCountsByPrefix[prefix]}`;
};
export const parseNode = (ctx) => {
    const impl = nodeImplementationsByKind[ctx.kind];
    const configuredSchema = impl.applyConfig?.(ctx.def, ctx.$.resolvedConfig) ?? ctx.def;
    const inner = {};
    const { meta: metaSchema, ...innerSchema } = configuredSchema;
    const meta = metaSchema === undefined ? {}
        : typeof metaSchema === "string" ? { description: metaSchema }
            : metaSchema;
    // ensure node entries are parsed in order of precedence, with non-children
    // parsed first
    const innerSchemaEntries = entriesOf(innerSchema)
        .sort(([lKey], [rKey]) => isNodeKind(lKey) ?
        isNodeKind(rKey) ? precedenceOfKind(lKey) - precedenceOfKind(rKey)
            : 1
        : isNodeKind(rKey) ? -1
            : lKey < rKey ? -1
                : 1)
        .filter(([k, v]) => {
        // move meta. prefixed props to meta, overwriting existing nested
        // props of the same name if they exist
        if (k.startsWith("meta.")) {
            const metaKey = k.slice(5);
            meta[metaKey] = v;
            return false;
        }
        return true;
    });
    for (const entry of innerSchemaEntries) {
        const k = entry[0];
        const keyImpl = impl.keys[k];
        if (!keyImpl)
            return throwParseError(`Key ${k} is not valid on ${ctx.kind} schema`);
        const v = keyImpl.parse ? keyImpl.parse(entry[1], ctx) : entry[1];
        if (v !== unset && (v !== undefined || keyImpl.preserveUndefined))
            inner[k] = v;
    }
    if (impl.reduce && !ctx.prereduced) {
        const reduced = impl.reduce(inner, ctx.$);
        if (reduced) {
            if (reduced instanceof Disjoint)
                return reduced.throw();
            // we can't cache this reduction for now in case the reduction involved
            // impliedSiblings
            return withMeta(reduced, meta);
        }
    }
    const node = createNode({
        id: ctx.id,
        kind: ctx.kind,
        inner,
        meta,
        $: ctx.$
    });
    return node;
};
export const createNode = ({ id, kind, inner, meta, $, ignoreCache }) => {
    const impl = nodeImplementationsByKind[kind];
    const innerEntries = entriesOf(inner);
    const children = [];
    let innerJson = {};
    for (const [k, v] of innerEntries) {
        const keyImpl = impl.keys[k];
        const serialize = keyImpl.serialize ??
            (keyImpl.child ? serializeListableChild : defaultValueSerializer);
        innerJson[k] = serialize(v);
        if (keyImpl.child === true) {
            const listableNode = v;
            if (isArray(listableNode))
                children.push(...listableNode);
            else
                children.push(listableNode);
        }
        else if (typeof keyImpl.child === "function")
            children.push(...keyImpl.child(v));
    }
    if (impl.finalizeInnerJson)
        innerJson = impl.finalizeInnerJson(innerJson);
    let json = { ...innerJson };
    let metaJson = {};
    if (!isEmptyObject(meta)) {
        metaJson = flatMorph(meta, (k, v) => [
            k,
            k === "examples" ? v : defaultValueSerializer(v)
        ]);
        json.meta = possiblyCollapse(metaJson, "description", true);
    }
    innerJson = possiblyCollapse(innerJson, impl.collapsibleKey, false);
    const innerHash = JSON.stringify({ kind, ...innerJson });
    json = possiblyCollapse(json, impl.collapsibleKey, false);
    const collapsibleJson = possiblyCollapse(json, impl.collapsibleKey, true);
    const hash = JSON.stringify({ kind, ...json });
    // we have to wait until after reduction to return a cached entry,
    // since reduction can add impliedSiblings
    if ($.nodesByHash[hash] && !ignoreCache)
        return $.nodesByHash[hash];
    const attachments = {
        id,
        kind,
        impl,
        inner,
        innerEntries,
        innerJson,
        innerHash,
        meta,
        metaJson,
        json,
        hash,
        collapsibleJson: collapsibleJson,
        children
    };
    if (kind !== "intersection") {
        for (const k in inner)
            if (k !== "in" && k !== "out")
                attachments[k] = inner[k];
    }
    const node = new nodeClassesByKind[kind](attachments, $);
    return ($.nodesByHash[hash] = node);
};
export const withId = (node, id) => {
    if (node.id === id)
        return node;
    if (isNode(nodesByRegisteredId[id]))
        throwInternalError(`Unexpected attempt to overwrite node id ${id}`);
    // have to ignore cache to force creation of new potentially cyclic id
    return createNode({
        id,
        kind: node.kind,
        inner: node.inner,
        meta: node.meta,
        $: node.$,
        ignoreCache: true
    });
};
export const withMeta = (node, meta, id) => {
    if (id && isNode(nodesByRegisteredId[id]))
        throwInternalError(`Unexpected attempt to overwrite node id ${id}`);
    return createNode({
        id: id ?? registerNodeId(meta.alias ?? node.kind),
        kind: node.kind,
        inner: node.inner,
        meta,
        $: node.$
    });
};
const possiblyCollapse = (json, toKey, allowPrimitive) => {
    const collapsibleKeys = Object.keys(json);
    if (collapsibleKeys.length === 1 && collapsibleKeys[0] === toKey) {
        const collapsed = json[toKey];
        if (allowPrimitive)
            return collapsed;
        if (
        // if the collapsed value is still an object
        hasDomain(collapsed, "object") &&
            // and the JSON did not include any implied keys
            (Object.keys(collapsed).length === 1 || Array.isArray(collapsed))) {
            // we can replace it with its collapsed value
            return collapsed;
        }
    }
    return json;
};
