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
<div class="mx-8 mb-8 mt-8 space-y-4 bg-background">
    <h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
        Preservation Databases
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Many online groups serve to aggregate accurate information related to
        Video Games, ROM files, BIOS files, media, and more. This is done to
        ensure users can verify files for emulation and provide various types
        of metadata and media for presentation.
    </p>
       <div class="my-6 w-full overflow-y-auto">
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
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >No-Intro</a
                        >
                    </TableCell>
                    <TableCell>Catalogs accurate file hashes for flash media</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="http://redump.org"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Redump</a
                        >
                    </TableCell>
                    <TableCell>Catalogs accurate file hashes for optical media</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.tosecdev.org"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
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
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Hasheous</a
                        >
                    </TableCell>
                    <TableCell>Catalogs ROM hashes and matches those hashes with metadata providers</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.igdb.com"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >IGDB</a
                        >
                    </TableCell>
                    <TableCell>Metadata and media for games</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.screenscraper.fr"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Screenscraper</a
                        >
                    </TableCell>
                    <TableCell>Visual (Image & Video) media</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://retroachievements.org"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >RetroAchievements</a
                        >
                    </TableCell>
                    <TableCell>Retro game achievements</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.steamgriddb.com"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >SteamGridDB</a
                        >
                    </TableCell>
                    <TableCell>Images for front-end presentation</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://howlongtobeat.com"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >HowLongToBeat</a
                        >
                    </TableCell>
                    <TableCell>Game & playtime tracking</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>