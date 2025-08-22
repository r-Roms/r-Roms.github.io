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
        Nintendo Wii
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        RVZ format is recommended for its size and convenience. For more
        information, please refer to the
        <a
            href={base + "/Populars/about-rvz-files"}
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >RVZ format page</a
        >. <br /> NKit can be used to convert NKit to ISO, do note that the
        download is
        <code
            class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
            >~14 GB</code
        > so using RVZ is recommended over NKit.
    </p>
    <div class="my-6 w-full overflow-y-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Myrient (Fast & Unrestricted)</TableHead>
                    <TableHead>Internet Archive</TableHead>
                    <TableHead>Open Directory</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        Nintendo - Wii - NKit RVZ [zstd-19-128k]
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/Redump/Nintendo%20-%20Wii%20-%20NKit%20RVZ%20[zstd-19-128k]/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Wii Rom Set By Ghostware Part 1</TableCell>
                    <TableCell
                        ><a
                            href="https://myrient.erista.me/files/Internet%20Archive/kodi_amp_spmc_canada/WiiRomSetByGhostware/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Wii Rom Set By Ghostware Part 2</TableCell>
                    <TableCell
                        ><a
                            href="https://myrient.erista.me/files/Internet%20Archive/kodi_amp_spmc_canada/WiiRomSetByGhostwarePart2/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Wii Rom Set By Ghostware Part 3</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/kodi_amp_spmc_canada/WiiRomSetByGhostwarePart3/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>WiiWare, VC, DLC, Channels &amp; IOS</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://repo.mariocube.com/WADs/_WiiWare,%20VC,%20DLC,%20Channels%20&amp;%20IOS/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/MarioCubeLite/WADs/_WiiWare%2C%20VC%2C%20DLC%2C%20Channels%20%26%20IOS/"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>NKit Fully Loaded</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/bingbong294/NKitFullyLoaded2020429/NKit%202020.4.29/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/NKitFullyLoaded2020429/NKit%202020.4.29"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
