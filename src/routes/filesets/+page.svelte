<script lang="ts">
    import type { PageData } from "./$types.js";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">File Sets</h1>
<p class="text">
These File Sets are large, organized, and validated collections typically
provided as a single, large archive file that will need to be extracted.
The File Sets are provided in no particular order.
</p>
<h2 class="header2">ROMs</h2>
<ListBullet links={data.romsets} />
<h2 class="header2">BIOS</h2>
<ListBullet links={data.biossets} />
<h2 class="header2">Other</h2>
<ListBullet links={data.othersets} />
</div>