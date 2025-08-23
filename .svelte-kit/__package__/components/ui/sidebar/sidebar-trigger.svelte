<script lang="ts">
	import { Button } from "../button/index.js";
	import { cn } from "../../../utils.js";
	import Hamburger from "@lucide/svelte/icons/menu";
	import type { ComponentProps } from "svelte";
	import { useSidebar } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		onclick,
		...restProps
	}: ComponentProps<typeof Button> & {
		onclick?: (e: MouseEvent) => void;
	} = $props();

	const sidebar = useSidebar();
</script>

<Button
	data-sidebar="trigger"
	data-slot="sidebar-trigger"
	variant="ghost"
	type="button"
	onclick={(e) => {
		onclick?.(e);
		sidebar.toggle();
	}}
	{...restProps}
>
	<Hamburger />
	Menu
	<span class="sr-only">Toggle Sidebar</span>
</Button>
