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
    <div class="my-6 w-full overflow-y-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Myrient (Fast &amp; Unrestricted)</TableHead>
                    <TableHead>Internet Archive</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>No-Intro</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/No-Intro/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Redump</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Redump/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>TOSEC</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/TOSEC/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>TOSEC-ISO</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/TOSEC-ISO/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>TOSEC-PIX</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/TOSEC-PIX/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Miscellaneous</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Miscellaneous/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>No-Intro ROM Sets</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/ni-roms/roms/"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>No-Intro - Source Code Sets</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/ni-sc/ni-sc/"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>The Unofficial Redump Hoard</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/details/redump"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>CVLT OF MIRRORS</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/details/@cvlt_of_mirrors?query=Redump.org&amp;sort=title"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>TOSEC (2024-05-17)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-main"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] 3DO (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-3do"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Acorn (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-acorn"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >[TOSEC-ISO] American Laser Games (2023-07-10)</TableCell
                    >
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-american-laser-games"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Apple (2023-01-23) (-2)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-apple"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Atari (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-atari"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Bandai (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-bandai"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Capcom (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-capcom"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Commodore (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-commodore"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Fujitsu (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-fujitsu"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] IBM (2023-01-23) (-1078)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-ibm"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >[TOSEC-ISO] Incredible Technologies (2023-07-10)</TableCell
                    >
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-incredible-technologies"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Konami (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-konami"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Mattel (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-mattel"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Memorex (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-memorex"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Microsoft (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-microsoft"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >[TOSEC-ISO] Multi-format (2023-07-10) (-29)</TableCell
                    >
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-multi-format"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >[TOSEC-ISO] Namco-Sega-Nintendo (2023-07-10)</TableCell
                    >
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-namco-sega-nintendo"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] NEC (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-nec"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Nintendo (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-nintendo_"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Philips (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-philips"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Sega Part 1 (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-sega"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Sega Part 2 (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-sega-part2"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Sinclair (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-sinclair"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] SNK (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-snk"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Sony (2023-01-23) (-5)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-sony"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] Tomy (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-tomy"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] VM Labs (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-vm-labs"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] VTech (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-vtech"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-ISO] ZAPiT Games (2023-07-10)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-iso-zapit-games"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-PIX] Part 1 (2023-01-23)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-pix"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-PIX] Part 2 (2023-01-23)</TableCell>
                    <TableCell></TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-pix-part2"
                            >Download</a
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
                            href="https://myrient.erista.me/files/Internet%20Archive/the_last_collector/htgdb-gamepacks/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/htgdb-gamepacks"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell
                        >English Translation ROMs Collection (2024)</TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/chadmaster/En-ROMs/En-ROMs/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/En-ROMs/En-ROMs/"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Super Mario World Hacks</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/storage_manager/super-mario-world-hacks/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/super-mario-world-hacks"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Super Famicom - MSU1</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/chadmaster/nintendo-super-famicom-msu1/ROMs/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Super Famicom - Enhanced Colors</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/chadmaster/super-famicom-enhanced-colors/ROMs/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/super-famicom-enhanced-colors/ROMs/"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Super Famicom - Speed Hacks</TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/chadmaster/sfc-speedhacks/ROMs/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/sfc-speedhacks/ROMs/"
                            >Download</a
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
                            href="https://myrient.erista.me/files/Internet%20Archive/md_/mdplus_collection_22_04_16/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/mdplus_collection_22_04_16"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>Sega Model 3 ROMs</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://myrient.erista.me/files/Internet%20Archive/chadmaster/segamodel3/ROMs/"
                            >Download</a
                        ></TableCell
                    >
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/segamodel3/ROMs/"
                            >Download</a
                        ></TableCell
                    >
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
