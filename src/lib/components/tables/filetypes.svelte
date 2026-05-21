<script lang="ts">
    import {
        Table, TableBody, TableCell,
        TableHead, TableHeader, TableRow,
    } from "$lib/components/ui/table/index.js";
    import type { FileType } from "$lib/types.js";
    import Check from "@lucide/svelte/icons/check";
    import X from "@lucide/svelte/icons/x";

    let {
        headers = ["Extension", "Recommend", "Notes"],
        rows,
    }: {
        headers?: [string, string, string];
        rows: FileType[];
    } = $props();
</script>

<h2 class="header2">ROM File Types</h2>
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
                <TableCell>{row.extension}</TableCell>
                <TableCell>
                    {#if row.recommended}
                        <Check class="size-4 text-green-500" />
                    {:else}
                        <X class="size-4 text-muted-foreground/50" />
                    {/if}
                </TableCell>
                <TableCell>{row.notes}</TableCell>
            </TableRow>
        {/each}
    </TableBody>
</Table>        
</div>
