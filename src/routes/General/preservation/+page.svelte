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
</script>

<!-- Home page for the ROMs megathread -->
<div class="page-container">
    <h1 class="header1">
        Preservation Databases
    </h1>
    <p class="text">
        Many online groups serve to aggregate accurate information related to
        Video Games, ROM files, BIOS files, media, and more. This is done to
        ensure users can verify files for emulation and provide various types
        of metadata and media for presentation.
    </p>
       <div class="table-container">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Database</TableHead>
                    <TableHead>Purpose</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://no-intro.org"
                            class="link"
                            >No-Intro</a
                        >
                    </TableCell>
                    <TableCell>Catalogs accurate file hashes for flash media</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="http://redump.org"
                            class="link"
                            >Redump</a
                        >
                    </TableCell>
                    <TableCell>Catalogs accurate file hashes for optical media</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.tosecdev.org"
                            class="link"
                            >TOSEC</a
                        >
                    </TableCell>
                    <TableCell>Catalogs accurate file hashes for flash media (TOSEC)
                        , optical media (TOSEC-ISO)
                        , and auxiliary resources (TOSEC-PIX)</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://hasheous.org"
                            class="link"
                            >Hasheous</a
                        >
                    </TableCell>
                    <TableCell>Catalogs ROM hashes and matches those hashes with metadata providers</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.igdb.com"
                            class="link"
                            >IGDB</a
                        >
                    </TableCell>
                    <TableCell>Metadata and media for games</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.screenscraper.fr"
                            class="link"
                            >Screenscraper</a
                        >
                    </TableCell>
                    <TableCell>Visual (Image & Video) media</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://retroachievements.org"
                            class="link"
                            >RetroAchievements</a
                        >
                    </TableCell>
                    <TableCell>Retro game achievements</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.steamgriddb.com"
                            class="link"
                            >SteamGridDB</a
                        >
                    </TableCell>
                    <TableCell>Images for front-end presentation</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://howlongtobeat.com"
                            class="link"
                            >HowLongToBeat</a
                        >
                    </TableCell>
                    <TableCell>Game & playtime tracking</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>