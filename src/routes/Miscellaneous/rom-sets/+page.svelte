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
        ROM Sets
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        ROM sets are large, sorted, verified collections of ROMs, typically
        provided as a single archive file that you will need to extract prior
        to use. The ROM sets here are provided in no particular order.
    </p>
    <div class="my-6 w-full overflow-y-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Links</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>No-Intro - ROM Sets</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/ni-roms/roms/"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>The Unofficial Redump Hoard</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/details/redump"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>CVLT OF MIRRORS</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/details/@cvlt_of_mirrors"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>TOSEC</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-main"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] 3DO</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-3do"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Acorn</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-acorn"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] American Laser Games</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-american-laser-games"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Apple</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-apple"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Atari</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-atari"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Bandai</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-bandai"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Capcom</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-capcom"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Commodore</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-commodore"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Fujitsu</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-fujitsu"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] IBM</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-ibm"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >[TOSEC-ISO] Incredible Technologies</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-incredible-technologies"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Konami</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-konami"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Mattel</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-mattel"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Memorex</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-memorex"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Microsoft</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-microsoft"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >[TOSEC-ISO] Multi-format</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-multi-format"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >[TOSEC-ISO] Namco-Sega-Nintendo</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-namco-sega-nintendo"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] NEC</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-nec"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Nintendo</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-nintendo_"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Philips</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-philips"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Sega Part 1</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-sega"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Sega Part 2</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-sega-part2"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Sinclair</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-sinclair"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] SNK</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-snk"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Sony</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-sony"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Tomy</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-tomy"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] VM Labs</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-vm-labs"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] VTech</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-vtech"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] ZAPiT Games</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-zapit-games"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >Hardware Target Game Database (HTGDB) Gamepacks</TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/htgdb-gamepacks"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >English Translation ROMs Collection</TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/En-ROMs/En-ROMs/"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Super Mario World Hacks</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/super-mario-world-hacks"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Super Famicom - Enhanced Colors</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/super-famicom-enhanced-colors/ROMs/"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >Nintendo - Super Famicom - Speed Hacks</TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/sfc-speedhacks/ROMs/"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >Complete Sega MD+ Collection (MegaSD, Mega Everdrive
                        Pro &amp; Genesis Plus GX Compatible)</TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/mdplus_collection_22_04_16"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Sega Model 3 ROMs</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/segamodel3/ROMs/"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
