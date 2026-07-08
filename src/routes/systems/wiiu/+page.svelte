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

<h2 class="header2">Wii U Downloader</h2>
<p class="text">
<a href="https://github.com/Xpl0itU/WiiUDownloader" class="link"
    >Wii U Downloader</a>
is a Windows/Mac/Linux program to download files directly from Nintendo's
servers. These will come as encrypted WUP/app files that can be used on a
real Wii U or optionally decrypted for use by emulators.
</p>
<a href="https://xpl0itu.github.io/WiiUDownloaderDocs/docs/use-on-wiiu/" class="link"
    >Downloading files for use on Wii U</a><br>
    <a href="https://xpl0itu.github.io/WiiUDownloaderDocs/docs/use-on-cemu/" class="link"
    >Downloading files for use an emulator</a>

<SnippetEmulator path={data.EmulatorPath} />
</div>