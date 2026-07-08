<script lang="ts">
    import type { PageData } from "./$types.js";
    import GridSystem from "$lib/components/grid/system.svelte"
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">Systems</h1>
<GridSystem systems={data.LINKSYSTEMS} />
</div>
