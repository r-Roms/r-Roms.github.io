# Svelte Toolbelt

Utilities for Svelte 5 that I find useful and will use in the various projects I work on. It's maintained by me, for me.

For more robust and feature-rich utilities, I recommend checking out/using [runed](https://runed.dev).

## Installation

```bash
npm install svelte-toolbelt
```

## Box

### `box`

Initializes a writable boxed state.

```svelte
<script lang="ts">
	import { box } from "runed";
	const count = box(0);
</script>

<button onclick={() => count.current++}>
	clicks: {count.current}
</button>
```

### `box.with`

Creates reactive state using getter and setter functions. If a setter function is provided, the box
is writable. If not, the box is readonly.

Useful for passing synced reactive values across boundaries.

```svelte
<script lang="ts">
	import { type WritableBox, box } from "runed";
	function useCounter(count: WritableBox<number>) {
		return {
			increment() {
				count.current++;
			},
			// We pass a box that doubles the count value
			double: box.with(() => count.current * 2)
		};
	}
	let count = $state(0);
	// We pass count to box.with so it stays in sync
	const { double, increment } = useCounter(
		box.with(
			() => count.current,
			(v) => (count = v)
		)
	);
</script>

<button onclick={increment}>
	clicks: {count}
	double: {double.current}
</button>
```

### `box.from`

Creates a box from an existing box, a getter function, or a static value.

Useful for receiving arguments that may or may not be reactive.

```svelte
<script lang="ts">
	import { box } from "runed";
	function useCounter(_count: WritableBox<number> | number) {
		const count = box.from(_count);
		return {
			count,
			increment() {
				count.current++;
			},
			// We pass a box that doubles the count value
			double: box.with(() => count.current * 2)
		};
	}
	const counter1 = useCounter(1);
	console.log(counter1.count.current); // 1
	console.log(counter1.double.current); // 2
	const counter2 = useCounter(box(2));
	console.log(counter2.count.current); // 2
	console.log(counter2.double.current); // 4
	function useDouble(_count: number | (() => number) | ReadableBox<number>) {
		const count = box.from(_count);
		return box.with(() => count.current * 2);
	}
	const double1 = useDouble(1);
	console.log(double1.current); // 2
	const double2 = useDouble(box(2));
	console.log(double2.current); // 4
	const double3 = useDouble(() => counter1.count.current);
	console.log(double3.current); // 2
</script>
```

### `box.flatten`

Transforms any boxes within an object to reactive properties, removing the need to access each
property with `.current`.

```ts
const count = box(1);
const flat = box.flatten({
	count,
	double: box.with(() => count.current * 2),
	increment() {
		count.current++;
	}
});

console.log(flat.count); // 1
console.log(flat.double); // 2
flat.increment();
console.log(flat.count); // 2
```

### `box.readonly`

Creates a readonly box from a writable box that remains in sync with the original box.

```ts
const count = box(1);
const readonlyCount = box.readonly(count);
console.log(readonlyCount.current); // 1
count.current++;
console.log(readonlyCount.current); // 2

readonlyCount.current = 3; // Error: Cannot assign to read only property 'value' of object
```

### `box.isBox`

Checks if a value is a `Box`.

```ts
const count = box(1);
console.log(box.isBox(count)); // true
console.log(box.isBox(1)); // false
```

### `box.isWritableBox`

Checks if a value is a `WritableBox`.

```ts
const count = box(1);
const double = box.with(() => count.current * 2);
console.log(box.isWritableBox(count)); // true
console.log(box.isWritableBox(double)); // false
```

### `unbox`

Unboxes the value from a box.

```ts
const count = box(1);
const double = box.with(() => count.current * 2);
console.log(unbox(double)); // 2
```

## Utils

### `afterSleep`

Executes a callback after a specified number of milliseconds.

```ts
afterSleep(1000, () => console.log("Hello, world!"));
```

### `afterTick`

Executes a callback after the next tick.

```ts
afterTick(() => console.log("Hello, world!"));
```

### `composeHandlers`

Composes event handlers into a single function that can be called with an event.

If the previous handler cancels the event using `event.preventDefault()`, the handlers
that follow will not be called.

```ts
import { composeHandlers } from "svelte-toolbelt";
const handler1 = () => console.log("Handler 1");
const handler2 = () => console.log("Handler 2");
const composedHandler = composeHandlers(handler1, handler2);
const event = new MouseEvent("click", { cancelable: true });
console.log(composedHandler(event)); // Handler 1, Handler 2
```

### `cssToStyleObj`

Converts a CSS string to a style object.

```ts
const css = "color: red; font-size: 16px;";
const styleObj = cssToStyleObj(css);
console.log(styleObj); // { color: "red", fontSize: "16px" }
```

### `executeCallbacks`

Executes an array of callback functions with the same arguments.

```ts
const callback1 = () => console.log("Callback 1");
const callback2 = () => console.log("Callback 2");
console.log(executeCallbacks(callback1, callback2)); // Callback 1, Callback 2
```

### `addEventListener`

Adds an event listener to the specified target element(s) for the given event(s), and returns a function to remove it.

```ts
import { addEventListener } from "svelte-toolbelt";
const target = document.getElementById("my-element");
const event = "click";
const handler = () => console.log("Clicked!");
const removeListener = addEventListener(target, event, handler);

// Later, remove the listener
removeListener();
```

### `mergeProps`

Merges props into a single object.

```ts
import { mergeProps } from "svelte-toolbelt";
const props1 = { a: 1 };
const props2 = { b: 2 };
const result = mergeProps(props1, props2);
console.log(result); // { a: 1, b: 2 }
```

#### Event Handlers

Event handlers are chained in the order they're passed. If a handler calls `event.preventDefault()`, subsequent handlers in the chain are not executed.

```ts
const props1 = { onclick: (e: MouseEvent) => console.log("First click") };
const props2 = { onclick: (e: MouseEvent) => console.log("Second click") };

const mergedProps = mergeProps(props1, props2);
mergedProps.onclick(new MouseEvent("click")); // Logs: "First click" then "Second click"
```

If `preventDefault()` is called:

```ts
const props1 = { onclick: (e: MouseEvent) => console.log("First click") };
const props2 = {
	onclick: (e: MouseEvent) => {
		console.log("Second click");
		e.preventDefault();
	}
};
const props3 = { onclick: (e: MouseEvent) => console.log("Third click") };

const mergedProps = mergeProps(props1, props2, props3);
mergedProps.onclick(new MouseEvent("click")); // Logs: "First click" then "Second click" only
```

Since `props2` called `event.preventDefault()`, `props3`'s `onclick` handler will not be called.

#### Non-Event Handler Functions

Non-event handler functions are also chained, but without the ability to prevent subsequent functions from executing:

```ts
const props1 = { doSomething: () => console.log("Action 1") };
const props2 = { doSomething: () => console.log("Action 2") };

const mergedProps = mergeProps(props1, props2);
mergedProps.doSomething(); // Logs: "Action 1" then "Action 2"
```

#### Classes

Class names are merged using [`clsx`](https://www.npmjs.com/package/clsx):

```ts
const props1 = { class: "text-lg font-bold" };
const props2 = { class: ["bg-blue-500", "hover:bg-blue-600"] };

const mergedProps = mergeProps(props1, props2);
console.log(mergedProps.class); // "text-lg font-bold bg-blue-500 hover:bg-blue-600"
```

#### Styles

Style objects and strings are merged, with later properties overriding earlier ones:

```ts
const props1 = { style: { color: "red", fontSize: "16px" } };
const props2 = { style: "background-color: blue; font-weight: bold;" };

const mergedProps = mergeProps(props1, props2);
console.log(mergedProps.style);
// "color: red; font-size: 16px; background-color: blue; font-weight: bold;"
```

```ts
import { mergeProps } from "bits-ui";

const props1 = { style: "--foo: red" };
const props2 = { style: { "--foo": "green", color: "blue" } };

const mergedProps = mergeProps(props1, props2);

console.log(mergedProps.style); // "--foo: green; color: blue;"
```

### `onDestroyEffect`

Executes a callback when a component is destroyed.

### `onMountEffect`

Executes a callback when a component is mounted.

### `styleToString`

Converts a style object to a CSS string.

```ts
const style = { color: "red", fontSize: "16px" };
const css = styleToString(style);
console.log(css); // "color: red; font-size: 16px;"
```

### `srOnlyStyles`

An object of styles that can be used to hide content from the DOM but still be accessible to screen readers.

```ts
export const srOnlyStyles: StyleProperties = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0",
	transform: "translateX(-100%)"
};
```

### `srOnlyStylesString`

A string representation of `srOnlyStyles`.

### `useRefById`

Finds the node with the given boxed `id` and sets it to the boxed `ref`. Reactive using `$effect` to ensure when the `id` or `deps` change, an update is triggered and the node is re-found.

#### Props

```ts
type UseRefByIdProps = {
	/**
	 * The ID of the node to find.
	 */
	id: Box<string>;

	/**
	 * The ref to set the node to.
	 */
	ref: WritableBox<HTMLElement | null>;

	/**
	 * A reactive condition that will cause the node to be set.
	 */
	deps?: Getter<unknown>;

	/**
	 * A callback fired when the ref changes.
	 */
	onRefChange?: (node: HTMLElement | null) => void;

	/**
	 * A function that returns the root node to search for the element by ID.
	 * Defaults to `() => (typeof document !== "undefined" ? document : undefined)
	 */
	getRootNode?: Getter<Document | ShadowRoot | undefined>;
};
```

### `useOnChange`

A simple helper function to react to changes to reactive state. This is useful for syncing a read-only dependency that may change with some writable state in your app.

```svelte
<script lang="ts">
	import { useOnChange } from "svelte-toolbelt";

	let { data } = $props();

	let myData = $state(data);

	useOnChange(
		() => myData,
		(newData) => (myData = newData)
	);
</script>
```

### `attachRef`

Creates a Svelte attachment that attaches a DOM element to a ref.

```svelte
<script lang="ts">
	import { attachRef } from "svelte-toolbelt";

	const ref = box<Element | null>(null);
</script>

<div {...attachRef(ref)}>Content</div>
```

or

```svelte
<script lang="ts">
	import { attachRef } from "svelte-toolbelt";

	let ref = $state<HTMLElement | null>(null);
</script>

<div {...attachRef((node) => (ref = node))}>Content</div>
```
