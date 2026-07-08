<script lang="ts">
    import type { PageData } from "./$types.js";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
    <h1 class="header1">
        Direct Downloads
    </h1>
    <p class="text">
        Direct downloads, as the name implies, are links to download files
        directly from a single source. This is the most common way to download
        files online.
    </p>
    <h2 class="header2">
        Sites
    </h2>
    <ListBullet links={data.sites} />

    <h2 class="header2">
        Download Managers
    </h2>
    <p class="text">
        Download Managers are dedicated downloading programs separate from
        using a browser directly. They offer many potential benefits over
        downloading in a browser, such as faster downloads using multiple
        connections, resumable downloads, link grabbing, bulk downloads,
        artificial speed limits, post-download actions, and more.
    </p>
    <ListBullet links={data.managers} />
</div>
