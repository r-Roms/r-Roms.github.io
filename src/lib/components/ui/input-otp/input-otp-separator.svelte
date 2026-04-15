<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { WithElementRef } from "$lib/utils.js";
	import { cn } from "$lib/utils.js";
	import { HugeiconsIcon } from "@hugeicons/svelte"
	import { MinusSignIcon } from '@hugeicons/core-free-icons';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="input-otp-separator"
	role="separator"
	class={cn("[&_svg:not([class*='size-'])]:size-4 flex items-center", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		<HugeiconsIcon icon={MinusSignIcon} strokeWidth={2}  />
	{/if}
</div>
