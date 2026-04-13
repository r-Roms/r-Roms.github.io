<script lang="ts">
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
        Super Smash Bros
    </h1>
    <div class="my-6 w-full overflow-y-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Myrient (Fast & Unrestricted)</TableHead>
                    <TableHead>Internet Archive</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Super Smash Bros Brawl (Wii) (USA)</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/Redump/Nintendo%20-%20Wii%20-%20NKit%20RVZ%20[zstd-19-128k]/Super%20Smash%20Bros.%20Brawl%20(USA)%20(Rev%202).zip"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Super Smash Bros Melee (GC) (USA)</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/Redump/Nintendo%20-%20GameCube%20-%20NKit%20RVZ%20[zstd-19-128k]/Super%20Smash%20Bros.%20Melee%20(USA)%20(En,Ja)%20(Rev%202).zip"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Super Smash Bros for Wii U (Wii U) (USA)
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/Super%20Smash%20Bros.%20for%20Wii%20U%20(USA)%20(En,Fr,Es).zip"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Game</a
                        >
                        /
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/Super%20Smash%20Bros.%20for%20Wii%20U%20(USA)%20(En,Fr,Es)%20(Update).zip"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Update</a
                        >
                        /
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/Super%20Smash%20Bros.%20for%20Wii%20U%20(USA)%20(En,Fr,Es)%20(v96)%20(DLC).zip"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >DLC</a
                        >
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://archive.org/download/wii-u-retail-nus-usa/Super%20Smash%20Bros.%20for%20Wii%20U%20%5B0005000010144F00%5D.7z"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Game</a
                        >
                        /
                        <a
                            href="https://archive.org/download/wii-u-retail-nus-usa/Super%20Smash%20Bros.%20for%20Wii%20U%20%5B0005000E10144F00%5D%20%5BUPDATE%20v304%5D.7z"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Update</a
                        >
                        /
                        <a
                            href="https://archive.org/download/wii-u-retail-nus-usa/Super%20Smash%20Bros.%20for%20Wii%20U%20%5B0005000C10144F00%5D%20%5BDLC%5D.7z"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >DLC</a
                        >
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        To run Wii U games in Cemu: Use <a
            href="https://github.com/VitaSmith/cdecrypt/releases"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >CDecrypt</a
        > to unpack the files.
    </p>
</div>
