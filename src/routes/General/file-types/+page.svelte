<script lang="ts">
    import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from "$lib/components/ui/table/index.js";
    import Rvz from "$lib/components/rvz.svelte";

    interface ProgramRow {
        name: string;
        url?: string;
        systems: string[];
        types: string[];
    }

    const headers = ["Program", "Supported Systems", "Supported Types"];

    const software: ProgramRow[] = [
        { name: "PeaZip", url: "https://peazip.github.io", systems: ["Windows", "MacOS", "Linux"], types: ["Most"] },
        { name: "7-Zip", url: "https://www.7-zip.org", systems: ["Windows"], types: ["Most"] },
        { name: "Files (iOS)", systems: ["iOS"], types: [".zip", ".7z (renamed to .zip)"] },
        { name: "Windows Explorer", systems: ["Windows"], types: [".zip"] }
    ];
</script>

<!-- Home page for the ROMs megathread -->
<div class="page-container">
    <h1 class="header1">
        File Types
    </h1>
    <h2 class="header2">
        Archive Files
    </h2>
    <p class="text">
        Archives are used to store the content of one or more files within a
        single file. Archives are commonly compressed to reduce disk and
        network usage. The most common archives for ROMs are .zip and .7z,
        among several others.
    </p> 
    <p class="text">
        Archives may need to be extracted depending on your emulator and the
        ROM file type inside. Generally, disc-based games and cartidge-based
        games starting with the 3DS must be extracted.
    </p>      
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
                {#each software as row}
                    <TableRow>
                        <TableCell>
                            {#if row.url}
                                <a href={row.url} class="link">{row.name}</a>
                            {:else}
                                {row.name}
                            {/if}
                        </TableCell>
                        <TableCell>
                            {#each row.systems as sys, i}
                                {sys}
                                {#if i < row.systems.length - 1}<br>{/if}
                            {/each}
                        </TableCell>
                        <TableCell>
                            {#each row.types as type, i}
                                {type}
                                {#if i < row.types.length - 1}<br>{/if}
                            {/each}
                        </TableCell>
                    </TableRow>
                {/each}
            </TableBody>
        </Table>
    </div>
    <Rvz />
</div>
