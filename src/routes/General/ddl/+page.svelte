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
        Direct Downloads
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        This page provides general resources related to downloading files direct from websites.
    </p>
    <h2
        class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Sites
    </h2>
    <div class="my-6 w-full overflow-y-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://fmhy.net/gaming#rom-sites"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >FMHY</a
                        >                        
                    </TableCell>
                    <TableCell>
                        A large collection of sites related to acquiring free media of all types.
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://vimm.net"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Vimm's Lair</a
                        >  
                    </TableCell>
                    <TableCell>
                        Provides files up to the 3DS/PS3. Restricted to one download at a time.
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://archive.org"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Internet Archive</a
                        >  
                    </TableCell>
                    <TableCell>
                        High-risk and traffic content is prevented from being
                        accessed without an account to minimize takedowns and
                        abuse. These items are shown with a lock icon beside
                        the file name in the item's file listing. Accounts
                        are free to create.
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://edgeemu.net"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Edge Emulation</a
                        >  
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://startgame.world"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >StartGame</a
                        >  
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <h2
        class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Download Managers
    </h2>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Download Managers are dedicated downloading programs separate from
        using a browser directly. They offer many potential benefits over
        downloading in a browser, such as faster downloads using multiple
        connections, resumable downloads, link grabbing, bulk downloads,
        artificial speed limits, post-download actions, and more.
    </p>
    <div class="my-6 w-full overflow-y-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://abdownloadmanager.com"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >AB Download Manager</a
                        >                        
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://jdownloader.org/jdownloader2"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >JDownloader2</a
                        >  
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
