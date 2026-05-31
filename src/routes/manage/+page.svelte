<script lang="ts">
    import type { PageData } from "./$types.js";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">
    ROM Managers & Front Ends
</h1>
<p class="text">
    ROM Managers are programs that help organize or fix a ROM collection.
    ROM Front Ends are programs to provide a single entry point for starting
    any ROM from a collection. Many programs may provide some or all functions
    of both.
</p>
<p class="text">
    Managers and Frontends can further be classified into 2 additional types,
    local and server access. Local is how most programs you are likely
    familiar with work. They run on the device itself and manipulate or
    display ROMs on that device. Server would mean the
    program runs on a device that you then access on another device, typically
    via web browser. Some programs may provide functionality to be used in
    both ways.
</p>
<h2 class="header2">Local</h2>
<ListBullet links={data.local} />
<h2 class="header2">Server</h2>
<ListBullet links={data.server} />
</div>
