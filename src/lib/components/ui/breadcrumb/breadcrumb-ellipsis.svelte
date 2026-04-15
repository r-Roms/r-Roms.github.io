<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils.js";
	import { HugeiconsIcon } from "@hugeicons/svelte"
	import { MoreHorizontalCircle01Icon } from '@hugeicons/core-free-icons';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
	bind:this={ref}
	data-slot="breadcrumb-ellipsis"
	role="presentation"
	aria-hidden="true"
	class={cn("size-5 [&>svg]:size-4 flex items-center justify-center", className)}
	{...restProps}
>
	<HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2}  />
	<span class="sr-only">More</span>
</span>
