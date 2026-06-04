<script lang="ts">
    import type { PageData } from "./$types.js";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">Sites to Avoid</h1>
<p class="text">
    This is a compiled list of sites specifically to avoid
    with a provided reason.
</p>
<h2 class="header2">Sites</h2>
<ListBullet links={data.sites} />
</div>
