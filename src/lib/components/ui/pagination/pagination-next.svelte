<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import { PaginationLink } from "./index.js";
	import { HugeiconsIcon } from "@hugeicons/svelte"
	import { ArrowRight01Icon } from '@hugeicons/core-free-icons';

	type PaginationNextProps = ComponentProps<typeof PaginationLink>;

	let { class: className, ...restProps }: PaginationNextProps = $props();
</script>

<PaginationLink
	aria-label="Go to next page"
	size="default"
	class={cn("pr-1.5!", className)}
	{...restProps}
>
	<span class="cn-pagination-next-text hidden sm:block">Next</span>
	<HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
</PaginationLink>
