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
        Nintendo Wii U
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        <a
            href="https://github.com/Xpl0itU/WiiUDownloader/releases/latest"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >WiiUDownloader</a
        >
        meant to be a replacement for Wii U USB Helper as it is more lightweight
        and supports Mac and Linux. <br /> If for whatever reason you want to
        install Wii U USB Helper, you can follow
        <a
            href="https://wiki.agilly1989.xyz/books/wiiu/page/usbhelper-usbhelperlauncher"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >this guide</a
        >.<br />
        To unpack the files for Cemu, use
        <a
            href="https://github.com/VitaSmith/cdecrypt/releases/latest"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >CDecrypt</a
        >.<br />
        Follow this video guide to learn how to convert WUX files to WUD.
    </p>
    <video
        controls
        class="h-full w-full rounded-md object-cover"
        autoplay
        muted
        playsinline
        preload="metadata"
        style="aspect-ratio: 16 / 9"
        ><source
            src="https://myrient.erista.me/assets/wux.mp4"
            type="video/mp4"
        /></video
    >
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
                    <TableCell>
                        Nintendo Wii U Disc (USA) Full Set WUA Format (Embedded
                        DLC &amp; Updates)</TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/teamgt19/nintendo-wii-u-usa-full-set-wua-format-embedded-dlc-updates/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell
                        >Nintendo Wii U [eShop] (USA) Full Set WUA Format
                        (Embedded DLC &amp; Updates) + Virtual Console</TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/teamgt19/nintendo-wii-u-eshop-usa-full-set-wua-format-embedded-dlc-updates/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Wii U (Digital) (CDN)</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: Retail NUS [USA]</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-retail-nus-usa/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/wii-u-retail-nus-usa"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: Download NUS [USA]</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-download-nus-usa/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: TurboGrafx-16 NUS</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-turbografx16-nus/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/wii-u-turbografx16-nus"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: Wii NUS</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-wii-nus/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/wii-u-wii-nus"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: Nintendo 64 NUS</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-nintendo-64-nus/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/wii-u-nintendo-64-nus"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: NES &amp; Famicom NUS</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-nes-fc-nus/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/wii-u-nes-fc-nus"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: Super Nintendo NUS</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-super-nintendo-snes-nus/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/wii-u-super-nintendo-snes-nus"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: Nintendo DS NUS</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-nintendo-ds-nds-nus/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/wii-u-nintendo-ds-nds-nus"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: Gameboy Advance NUS</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-gameboy-advance-nus/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/wii-u-gameboy-advance-nus"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Wii U: Retail Game Disc NUS</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/archiver_2020/wii-u-retail-game-disc-nus-usa/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/wii-u-retail-game-disc-nus-usa"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Wii U - WUX</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Redump/Nintendo%20-%20Wii%20U%20-%20WUX/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
