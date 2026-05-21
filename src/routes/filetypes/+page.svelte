<script lang="ts">
    import type { PageData } from "./$types.js";
    import Rvz from "$lib/components/rvz.svelte";
    import ListBullet from "$lib/components/lists/bullet.svelte"

    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
    <h1 class="header1">
        File Types
    </h1>
    <h2 class="header2">
        Archive Files
    </h2>
    <p class="text">
        Archives are used to store the content of one or more files within a
        single file. Archives are commonly compressed to reduce disk and
        network usage. The most common archives for ROMs are .zip and .7z,
        among several others.
    </p> 
    <p class="text">
        Archives may need to be extracted depending on your emulator and the
        ROM file type inside. Generally, disc-based games and cartidge-based
        games starting with the 3DS must be extracted.
    </p>
    <h2 class="header3">
        Programs
    </h2>
    <ListBullet links={data.software} />
    <Rvz />
</div>
