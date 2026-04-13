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
        Xenoblade
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
                    <TableCell>Xenoblade Chronicles (Wii) (USA)</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/Redump/Nintendo%20-%20Wii%20-%20NKit%20RVZ%20%5Bzstd-19-128k%5D/Xenoblade%20Chronicles%20%28USA%2C%20Asia%29%20%28En%2CFr%2CEs%29.zip"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Download</a
                        >
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Xenoblade Chronicles X (Wii U) (USA)</TableCell>
                    <TableCell>
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/Xenoblade%20Chronicles%20X%20(USA)%20(En,Fr,Es).zip"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Game</a
                        >
                        /
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/Xenoblade%20Chronicles%20X%20(USA)%20(En,Fr,Es)%20(Update).zip"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Update</a
                        >
                        /
                        <a
                            href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/Xenoblade%20Chronicles%20X%20(USA)%20(En,Fr,Es)%20(v0)%20(DLC).zip"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >DLC</a
                        >
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://archive.org/download/wii-u-retail-nus-usa/Xenoblade%20Chronicles%20X%20%5B00050000101C4D00%5D.7z"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Game</a
                        >
                        /
                        <a
                            href="https://archive.org/download/wii-u-retail-nus-usa/Xenoblade%20Chronicles%20X%20%5B0005000E101C4D00%5D%20%5BUPDATE%20v48%5D.7z"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Update</a
                        >
                        /
                        <a
                            href="https://archive.org/download/wii-u-retail-nus-usa/Xenoblade%20Chronicles%20X%20%5B0005000C101C4D00%5D%20%5BDLC%5D.7z"
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
