<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLTdAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLTdAttributes> = $props();
</script>

<td
	bind:this={ref}
	data-slot="table-cell"
	class={cn(
		"border px-4 py-2 text-primary font-light text-left [&[align=center]]:text-center [&[align=right]]:text-right",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>
