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
<div class="page-container">
    <h1 class="header1">
        Direct Downloads
    </h1>
    <p class="text">
        Direct downloads, as the name implies, are links to download files
        directly from a single source. This is the most common way to download
        files online.
    </p>
    <h2 class="header2">
        Sites
    </h2>
    <div class="table-container">
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
                            class="link"
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
                            class="link"
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
                            class="link"
                            >Internet Archive</a
                        >  
                    </TableCell>
                    <TableCell>
                        High-risk and traffic content cannot be is locked to
                        minimize takedowns and abuse. These files are shown
                        with a lock icon beside the file name in the item's
                        file listing. A free account is required to unlock
                        them.<br><br>
                        Items hosted by the Internet Archive have metadata
                        files ending in extensions such as
                        <code
                            class="inline-code">
                            .xml
                        </code>
                        and
                        <code
                            class="inline-code">
                            .sqlite
                        </code>.
                        These files are not important to download but are used
                        by the website to store information about the item and
                        the files the items contain.<br><br>
                        Some Internet Archive items are available for
                        torrenting by downloading the
                        <code
                            class="inline-code">
                            .torrent
                        </code>
                        file. However this is not recommended as the torrent's
                        file list is usually incomplete compared to downloading
                        directly from the website.
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://edgeemu.net"
                            class="link"
                            >Edge Emulation</a
                        >  
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://romheaven.com"
                            class="link"
                            >RomHeaven</a
                        >  
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://startgame.world"
                            class="link"
                            >StartGame</a
                        >  
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <h2 class="header2">
        Download Managers
    </h2>
    <p class="text">
        Download Managers are dedicated downloading programs separate from
        using a browser directly. They offer many potential benefits over
        downloading in a browser, such as faster downloads using multiple
        connections, resumable downloads, link grabbing, bulk downloads,
        artificial speed limits, post-download actions, and more.
    </p>
    <div class="table-container">
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
                            class="link"
                            >AB Download Manager</a
                        >                        
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://jdownloader.org/jdownloader2"
                            class="link"
                            >JDownloader2</a
                        >  
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
