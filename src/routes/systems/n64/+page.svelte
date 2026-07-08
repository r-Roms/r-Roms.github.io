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
<h3 class="header3">Endianness</h3>
<p class="text">
    Endianness refers to the order of individual bytes in the N64 ROM file.
</p>
<p class="text">
    Big Endian is the canonical format used by the N64 and used by the
    recommended .z64 files. Big Endian stores the most significant byte for
    a piece of data first at the lowest memory address. A 32 bit
    hexadecimal value 0x12345678 is stored in that order in memory. Every two
    characters is a byte of data, so (12)(34)(56)(78).
</p>
<p class="text">
    Little Endian is the format used by x86 PCs and used by
    .n64 files. Little Endian stores the least significant byte for
    a piece of data first at the lowest memory address. A 32 bit hexadecimal
    value 0x12345678 is stored reversed in each 4 byte word. Every two
    characters is a byte of data, so (78)(56)(34)(12).
</p>
<p class="text">
    Byte Swapped was the format created by the Doctor V64 and used by
    .v64 files. A 32 bit hexadecimal value 0x12345678 is stored with each
    two byte pair swapped within a four byte word. Every two characters is a
    byte of data, so (34)(12)(78)(56).
</p>
<SnippetEmulator path={data.EmulatorPath} />
</div>
