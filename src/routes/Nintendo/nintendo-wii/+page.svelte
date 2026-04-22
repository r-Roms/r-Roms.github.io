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
            title: "Redump - Wii - NKit RVZ [zstd-19-128k]",
            downloads: [],
            torrents: [{ label: "Minerva", url: "https://minerva-archive.org/browse/Redump/Nintendo%20-%20Wii%20-%20NKit%20RVZ%20%5Bzstd-19-128k%5D/" }]
        },
        {
            title: "Wii - WBFS by Ghostware",
            downloads: [],
            torrents: [
                { label: "Minerva Part 1", url: "https://minerva-archive.org/browse/Internet%20Archive/kodi_amp_spmc_canada/WiiRomSetByGhostware/" },
                { label: "Minerva Part 2", url: "https://minerva-archive.org/browse/Internet%20Archive/kodi_amp_spmc_canada/WiiRomSetByGhostwarePart2/" },
                { label: "Minerva Part 3", url: "https://minerva-archive.org/browse/Internet%20Archive/kodi_amp_spmc_canada/WiiRomSetByGhostwarePart3/" }
            ]
        },
        {
            title: "WiiWare, VC, DLC, Channels & IOS",
            downloads: [
                { label: "MarioCube", url: "https://repo.mariocube.com/WADs/_WiiWare,%20VC,%20DLC,%20Channels%20&amp;%20IOS/" },
                { label: "Internet Archive", url: "https://archive.org/download/MarioCubeLite/WADs/_WiiWare%2C%20VC%2C%20DLC%2C%20Channels%20%26%20IOS/" }
            ],
            torrents: []
        },
        {
            title: "NKit Fully Loaded (NKit recovery only)",
            downloads: [{ label: "Internet Archive", url: "https://archive.org/download/NKitFullyLoaded2020429" }],
            torrents: [{ label: "Minerva", url: "https://minerva-archive.org/browse/Internet%20Archive/bingbong294/NKitFullyLoaded2020429/" }]
        }
    ];

    const linkClass = "text-primary font-medium underline underline-offset-4 hover:text-foreground";
</script>

<!-- Home page for the ROMs megathread -->
<div class="page-container">
    <h1 class="header1">
        Nintendo Wii
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
                                {#if i < row.downloads.length - 1} <br> {/if}
                            {/each}
                        </TableCell>
                        <TableCell>
                            {#each row.torrents as link, i}
                                <a href={link.url} class=link>{link.label}</a>
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
