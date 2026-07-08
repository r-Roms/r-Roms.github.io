<script lang="ts">
    import type { PageData } from "./$types.js";
    import TableDownloads from "$lib/components/tables/downloads.svelte";
    import TableFileType from "$lib/components/tables/filetypes.svelte";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    import SnippetEmulator from "$lib/components/emulator.svelte";
    import { SETS } from "$lib/data/siteparts.js"
    import prohibitionSign from "$lib/img/3dsmiierror.png";
    import ImageZoomed from "$lib/components/ImageZoomed.svelte";

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
<h2 class="header2">Mii Errors</h2>
<p class="text">
    Emulators may not display Miis correctly in game. Instead of the Mii's
    head it displays the
    <ImageZoomed src={prohibitionSign}>ISO standard general prohibition sign</ImageZoomed>.
    This is because the emulator does not come with the Mii system files
    required. To fix this you will need to download and run
    <code class="inline-code">errfix.3dsx</code> as if it was a game ROM in
    your emulator. Use the following links to download the file. To confirm
    the file is correct the SHA-1 checksum should be
    <code class="inline-code">8da42d751916db5b505ac954575ae8274b9f3387</code>.
</p>
<ListBullet links={data.errfix} />
<SnippetEmulator path={data.EmulatorPath} />
</div>
