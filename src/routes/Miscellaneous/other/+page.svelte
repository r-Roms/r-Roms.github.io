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
        Other
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Other files that are not ROMs or BIOS files.
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
                    <TableCell>No-Intro - Source Code Sets</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/ni-sc/ni-sc/"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-PIX] Part 1</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-pix"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
                <TableRow>
                    <TableCell>[TOSEC-PIX] Part 2</TableCell>
                    <TableCell
                        ><a
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            href="https://archive.org/download/tosec-pix-part2"
                            >Internet Archive</a
                        ></TableCell
                    >
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
