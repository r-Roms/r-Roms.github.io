<script lang="ts">
    import type { PageData } from "./$types.js";
    import TableDownloads from "$lib/components/tables/downloads.svelte";
    import TableFileType from "$lib/components/tables/filetypes.svelte";
    import SnippetEmulator from "$lib/components/emulator.svelte";
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">{data.header}</h1>
<TableDownloads rows={data.downloads} />
<TableFileType rows={data.fileTypes} />
<h2 class="header2">Set Types</h2>
<h3 class="header3">Merged</h3>
    In Merged ROM sets, each parent game and all of its child games
    (revisions, regional variants, etc) are combined in a single .zip.
<h3 class="header3">Non-Merged</h3>
<p class="text">
    In Non-Merged ROM sets, every parent game & child is contained in its own
    .zip archive. Any shared files between related versions of a game are
    duplicated in each child's .zip.
</p>
<h3 class="header3">Split</h3>
<p class="text">
    In Split ROM sets, each parent game is in its own .zip archive and
    each child game .zip contains only the files for that version that
    differ from the parent.
</p>
<SnippetEmulator path={data.EmulatorPath} />
</div>