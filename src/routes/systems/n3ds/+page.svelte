<script lang="ts">
    import type { PageData } from "./$types.js";
    import TableDownloads from "$lib/components/tables/downloads.svelte";
    import TableFileType from "$lib/components/tables/filetypes.svelte";
    import SnippetEmulator from "$lib/components/emulator.svelte";
    import { SETS } from "$lib/data/siteparts.js"
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">{data.header}</h1>
<TableDownloads rows={data.downloads} />
<TableFileType rows={data.fileTypes} />

<h2 class="header2">hShop</h2>
<p class="text"></p>
<a
    href="https://hshop.erista.me"
    class="link">hShop</a
>
    provides encrypted CIA files for download. The main use is using their 3DS
    client app 3hs to download onto a custom firmware 3DS directly. For
    emulator use you will need to decrypt the ROMs.
<h2 class="header2">Decryption Instructions</h2>
<p class="text">
    The easiest way to get a decrypted ROM is to find and download from a
    source that provides them. If you cannot find one or you want to decrypt
    your files yourself, you can use
    <a
        href="https://github.com/xxmichibxx/Batch-CIA-3DS-Decryptor-Redux"
        class="link">Batch CIA 3DS Decryptor Redux</a
    >
    to decrypt them.<br />
    If your emulator supports playing encrypted ROMs using an aes_keys.txt
    file, you can find it online, through the
    <a
        href={SETS.url}
        class="link">File Sets - BIOS</a
    >
    section of this site, or by dumping from your own 3DS.
</p>

<SnippetEmulator path={data.EmulatorPath} />
</div>