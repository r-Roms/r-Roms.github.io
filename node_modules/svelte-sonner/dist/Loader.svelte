<script lang="ts" module>"use strict";
const bars = Array(12).fill(0);
</script>

<script lang="ts">"use strict";
let { visible, class: className } = $props();
</script>

<div
	class={['sonner-loading-wrapper', className].filter(Boolean).join(' ')}
	data-visible={visible}
>
	<div class="sonner-spinner">
		{#each bars as _, i (`spinner-bar-${i}`)}
			<div class="sonner-loading-bar"></div>
		{/each}
	</div>
</div>
