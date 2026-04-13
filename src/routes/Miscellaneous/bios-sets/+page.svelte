<script lang="ts">
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
        BIOS Sets
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        BIOS sets are large, sorted, verified collections of BIOS and firmware
        files, typically provided as a single archive file that you will need
        to extract prior to use. The BIOS sets here are provided in no
        particular order.
    </p>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Links</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>RetroBIOS</TableCell>
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://abdess.github.io/retrobios/"
                        >RetroBIOS</a
                    ><br>
                    <a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://github.com/Abdess/retrobios"
                        >GitHub</a
                    ></TableCell
                >
            </TableRow>
            <TableRow>
                <TableCell>Redump BIOS sets</TableCell>
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/2019_11_25_redump_bios"
                        >Internet Archive</a
                    ></TableCell
                >
            </TableRow>
            <TableRow>
                <TableCell
                    >TOSEC Firmware and Operating Systems Collection</TableCell
                >
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/tosec_fw_os"
                        >Internet Archive</a
                    ></TableCell
                >
            </TableRow>
            <TableRow>
                <TableCell>Retroarch System Files (BIOS/Firmwares/OS)</TableCell
                >
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://archive.org/download/RetroarchSystemFiles/Retroarch-System/"
                        >Internet Archive</a
                    ></TableCell
                >
            </TableRow>
            <TableRow>
                <TableCell>Firmwares</TableCell>
                <TableCell
                    ><a
                        class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                        href="https://mega.nz/folder/9ZdQwaaY#u63KaI0MsKcIqWE2GQmUuA"
                        >MEGA</a
                    ></TableCell
                >
            </TableRow>
        </TableBody>
    </Table>
</div>
