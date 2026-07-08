<script lang="ts">
    import {
        Table, TableBody, TableCell,
        TableHead, TableHeader, TableRow,
    } from "$lib/components/ui/table/index.js";
    import type { DownloadRow } from "$lib/types.js";

    let {
        headers = ["Title", "Downloads", "Torrents"],
        rows,
    }: {
        headers?: [string, string, string];
        rows: DownloadRow[];
    } = $props();
</script>

<h2 class="header2">ROM Collections</h2>
<div class="table-container">
<Table>
    <TableHeader>
        <TableRow>
            {#each headers as header}
                <TableHead>{header}</TableHead>
            {/each}
        </TableRow>
    </TableHeader>
    <TableBody>
        {#each rows as row}
            <TableRow>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                    {#each row.downloads as link, i}
                        <a href={link.url} class="link">{link.name}</a>
                        {#if i < row.downloads.length - 1}<br>{/if}
                    {/each}
                </TableCell>
                <TableCell>
                    {#each row.torrents as link, i}
                        <a href={link.url} class="link">{link.name}</a>
                        {#if i < row.torrents.length - 1}<br>{/if}
                    {/each}
                </TableCell>
            </TableRow>
        {/each}
    </TableBody>
</Table>        
</div>
