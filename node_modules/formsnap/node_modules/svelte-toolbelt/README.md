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
