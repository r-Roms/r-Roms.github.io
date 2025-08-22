<script lang="ts">
    import { base } from "$app/paths";
    import {
        Table,
        TableHeader,
        TableRow,
        TableHead,
        TableBody,
        TableCell,
    } from "$lib/components/ui/table/index.js";
</script>

<!-- Home page for the ROMs megathread -->
<div class="mx-8 mb-8 mt-8 space-y-4 bg-background">
    <h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
        SEGA Games
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Older systems can be found in the <a
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            href={base + "/Retro & Arcade/retro-games"}>Retro Games page</a
        >.
    </p>
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
                <TableCell>Sega - 32X</TableCell>
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://myrient.erista.me/files/No-Intro/Sega%20-%2032X/"
                        >Download</a
                    ></TableCell
                >
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/ni-roms/roms/Sega%20-%2032X.zip/"
                        >Download 1</a
                    >
                    /
                    <a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/nointro.32x"
                        >Download 2</a
                    ></TableCell
                >
            </TableRow>
            <TableRow>
                <TableCell>Sega - Game Gear</TableCell>
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://myrient.erista.me/files/No-Intro/Sega%20-%20Game%20Gear/"
                        >Download</a
                    ></TableCell
                >
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/ni-roms/roms/Sega%20-%20Game%20Gear.zip/"
                        >Download 1</a
                    >
                    /
                    <a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/nointro.gg"
                        >Download 2</a
                    ></TableCell
                >
            </TableRow>
            <TableRow>
                <TableCell>Sega - Master System - Mark III</TableCell>
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://myrient.erista.me/files/No-Intro/Sega%20-%20Master%20System%20-%20Mark%20III/"
                        >Download</a
                    ></TableCell
                >
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/ni-roms/roms/Sega%20-%20Master%20System%20-%20Mark%20III.zip/"
                        >Download 1</a
                    >
                    /
                    <a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/nointro.ms-mkiii"
                        >Download 2</a
                    ></TableCell
                >
            </TableRow>
            <TableRow>
                <TableCell>Sega - Mega Drive - Genesis</TableCell>
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://myrient.erista.me/files/No-Intro/Sega%20-%20Mega%20Drive%20-%20Genesis/"
                        >Download</a
                    ></TableCell
                >
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/ni-roms/roms/Sega%20-%20Mega%20Drive%20-%20Genesis.zip/"
                        >Download 1</a
                    >
                    /
                    <a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/nointro.md"
                        >Download 2</a
                    ></TableCell
                >
            </TableRow>
        </TableBody>
    </Table>
</div>
