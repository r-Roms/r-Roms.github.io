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
        Nintendo Games
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Older systems can be found in the <a
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            href={base + "/Retro & Arcade/retro-games"}>Retro Games page</a
        >.
    </p>
    <div class="my-6 w-full overflow-y-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Myrient (Fast & Unrestricted)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        Nintendo - Family Computer Disk System (FDS)
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Family%20Computer%20Disk%20System%20(FDS)/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Nintendo - Family Computer Disk System (QD)
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Family%20Computer%20Disk%20System%20(QD)/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Game Boy Advance</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Game%20Boy%20Advance/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Nintendo - Game Boy Advance (Multiboot)
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Game%20Boy%20Advance%20(Multiboot)/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Game Boy Advance (Video)</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Game%20Boy%20Advance%20(Video)/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Nintendo - Game Boy Advance (e-Reader)
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Game%20Boy%20Advance%20(e-Reader)/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Game Boy Color</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Game%20Boy%20Color/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Game Boy</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Game%20Boy/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Nintendo 64 (BigEndian)</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Nintendo%2064%20(BigEndian)/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Nintendo 64 (ByteSwapped)</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Nintendo%2064%20(ByteSwapped)/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Nintendo 64DD</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Nintendo%2064DD/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Nintendo - Nintendo Entertainment System (Headered)
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Nintendo%20Entertainment%20System%20(Headered)/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Nintendo - Nintendo Entertainment System (Headerless)
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Nintendo%20Entertainment%20System%20(Headerless)/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Pokemon Mini</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Pokemon%20Mini/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Nintendo - Super Nintendo Entertainment System
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nintendo - Virtual Boy</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Virtual%20Boy/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
