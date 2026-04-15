<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { cn } from "../../../utils.js";
	import { PaginationLink } from "./index.js";
	import { HugeiconsIcon } from "@hugeicons/svelte"
	import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';

	type PaginationPreviousProps = ComponentProps<typeof PaginationLink>;

	let { class: className, ...restProps }: PaginationPreviousProps = $props();
</script>

<PaginationLink
	aria-label="Go to previous page"
	size="default"
	class={cn("pl-1.5!", className)}
	{...restProps}
>
	<HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} data-icon="inline-start" />
	<span class="cn-pagination-previous-text hidden sm:block">Previous</span>
</PaginationLink>
