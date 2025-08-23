import { m as spread_attributes, n as bind_props, e as pop, p as push } from "./index.js";
import { c as cn } from "./utils.js";
import { c as clsx } from "./attributes.js";
function Table($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out.push(`<div data-slot="table-container" class="relative w-full overflow-x-auto"><table${spread_attributes(
    {
      "data-slot": "table",
      class: clsx(cn("w-full", className)),
      ...restProps
    }
  )}>`);
  children?.($$payload);
  $$payload.out.push(`<!----></table></div>`);
  bind_props($$props, { ref });
  pop();
}
function Table_body($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out.push(`<tbody${spread_attributes(
    {
      "data-slot": "table-body",
      class: clsx(cn("[&_tr:last-child]:border-0", className)),
      ...restProps
    }
  )}>`);
  children?.($$payload);
  $$payload.out.push(`<!----></tbody>`);
  bind_props($$props, { ref });
  pop();
}
function Table_cell($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out.push(`<td${spread_attributes(
    {
      "data-slot": "table-cell",
      class: clsx(cn("border px-4 py-2 text-primary font-light text-left [&[align=center]]:text-center [&[align=right]]:text-right", className)),
      ...restProps
    }
  )}>`);
  children?.($$payload);
  $$payload.out.push(`<!----></td>`);
  bind_props($$props, { ref });
  pop();
}
function Table_head($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out.push(`<th${spread_attributes(
    {
      "data-slot": "table-head",
      class: clsx(cn("border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right", className)),
      ...restProps
    }
  )}>`);
  children?.($$payload);
  $$payload.out.push(`<!----></th>`);
  bind_props($$props, { ref });
  pop();
}
function Table_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out.push(`<thead${spread_attributes(
    {
      "data-slot": "table-header",
      class: clsx(cn("[&_tr]:border-b", className)),
      ...restProps
    }
  )}>`);
  children?.($$payload);
  $$payload.out.push(`<!----></thead>`);
  bind_props($$props, { ref });
  pop();
}
function Table_row($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out.push(`<tr${spread_attributes(
    {
      "data-slot": "table-row",
      class: clsx(cn("even:bg-muted m-0 border-t p-0", className)),
      ...restProps
    }
  )}>`);
  children?.($$payload);
  $$payload.out.push(`<!----></tr>`);
  bind_props($$props, { ref });
  pop();
}
export {
  Table as T,
  Table_header as a,
  Table_row as b,
  Table_head as c,
  Table_body as d,
  Table_cell as e
};
