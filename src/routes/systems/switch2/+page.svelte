<script lang="ts">
import type { PageData } from "./$types.js";
import TableDownloads from "$lib/components/tables/downloads.svelte";
import Disallowed from "$lib/components/disallowed.svelte";
import TableFileType from "$lib/components/tables/filetypes.svelte";
import SnippetEmulator from "$lib/components/emulator.svelte";
let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">{data.header}</h1>
<Disallowed />
<SnippetEmulator path={data.EmulatorPath} />
</div>