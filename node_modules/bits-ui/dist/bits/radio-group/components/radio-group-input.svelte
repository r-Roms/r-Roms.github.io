<script lang="ts">
	import HiddenInput from "../../utilities/hidden-input.svelte";
	import { RadioGroupInputState } from "../radio-group.svelte.js";

	const inputState = RadioGroupInputState.create();
</script>

{#if inputState.shouldRender}
	<HiddenInput {...inputState.props} />
{/if}
