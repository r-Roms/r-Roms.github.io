<script lang="ts">
    import { base } from "$app/paths";
    import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from "$lib/components/ui/table/index.js";
    import Rvz from "$lib/components/rvz.svelte";

    interface Link {
        label: string;
        url: string;
    }

    interface DownloadRow {
        title: string;
        downloads: Link[];
        torrents: Link[];
    }

    const headers = ["Title", "Download", "Torrent"];

    const downloads: DownloadRow[] = [
        {
            title: "Redump - GC - NKit RVZ [zstd-19-128k]",
            downloads: [],
            torrents: [{ label: "Minerva", url: "https://minerva-archive.org/browse/Redump/Nintendo%20-%20GameCube%20-%20NKit%20RVZ%20[zstd-19-128k]/" }]
        },
        {
            title: "GC - RVZ",
            downloads: [{ label: "Internet Archive", url: "https://archive.org/details/CentralArquivista-NintendoGameCube-US" }],
            torrents: []
        },
        {
            title: "Redump - GC - ISO - America",
            downloads: [],
            torrents: [
                { label: "Minerva Part 1", url: "https://minerva-archive.org/browse/Internet%20Archive/Unknown/RedumpNintendoGameCubeAmerica/" },
                { label: "Minerva Part 2", url: "https://minerva-archive.org/browse/Internet%20Archive/Unknown/RedumpNintendoGameCubeAmericaPart2/" },
                { label: "Minerva Part 3", url: "https://minerva-archive.org/browse/Internet%20Archive/Unknown/RedumpNintendoGameCubeAmericaPart3/" }
            ]
        },
        {
            title: "Redump - GC - ISO - Japan",
            downloads: [{ label: "Internet Archive", url: "https://archive.org/download/NCubeJ" }],
            torrents: [{ label: "Minerva", url: "https://minerva-archive.org/browse/Internet%20Archive/pixelspoil/NCubeJ/" }]
        },
        {
            title: "Redump - GC - ISO - Europe by Ghostware",
            downloads: [],
            torrents: [{ label: "Minerva", url: "https://minerva-archive.org/browse/Internet%20Archive/kodi_amp_spmc_canada/EuropeanGamecubeCollectionByGhostware/" }]
        },
        {
            title: "Redump - GC - ISO - Australia by Ghostware",
            downloads: [],
            torrents: [{ label: "Minerva", url: "https://minerva-archive.org/browse/Internet%20Archive/kodi_amp_spmc_canada/AustraliaGamecubeCollectionByGhostware/" }]
        },
        {
            title: "Redump - GC - ISO - Asia by Ghostware",
            downloads: [{ label: "Internet Archive", url: "https://archive.org/download/AsiaGamecubeCollectionByGhostware" }],
            torrents: [{ label: "Minerva", url: "https://minerva-archive.org/browse/Internet%20Archive/kodi_amp_spmc_canada/AsiaGamecubeCollectionByGhostware/" }]
        }
    ];
</script>

<!-- Home page for the ROMs megathread -->
<div class="page-container">
    <h1 class="header1">
        Nintendo GameCube
    </h1>
    <h2 class="header2">
        Links
    </h2>
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
                {#each downloads as row}
                    <TableRow>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>
                            {#each row.downloads as link, i}
                                <a href={link.url} class=link>{link.label}</a>
                                {#if i < row.downloads.length - 1} / {/if}
                            {/each}
                        </TableCell>
                        <TableCell>
                            {#each row.torrents as link, i}
                                <a
                                href={link.url} class=link>{link.label}</a>
                                {#if i < row.torrents.length - 1} <br> {/if}
                            {/each}
                        </TableCell>
                    </TableRow>
                {/each}
            </TableBody>
        </Table>
    </div>
    <Rvz />
</div>
