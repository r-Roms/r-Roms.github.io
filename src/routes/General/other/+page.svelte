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
        Other Information
    </h1>
    <h2 class="header2">
        Archive Files
    </h2>
    <p class="text">
        Archives are used to store the content of one or more files within a
        single file. Archives are commonly compressed to reduce disk and
        network usage. Archives may need to be extracted depending on
        your emulator and the ROM file type inside. The most common archives
        for ROMs are .zip and .7z, among several others. The following is a
        small set of recommendations on archive programs.
    </p>    
    <div class="table-container">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Supported Systems</TableHead>
                    <TableHead>Supported Archive Types</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://peazip.github.io"
                            class="link"
                            >PeaZip</a
                        >
                    </TableCell>
                    <TableCell>Windows, MacOS, Linux</TableCell>
                    <TableCell>Most</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.7-zip.org"
                            class="link"
                            >7Zip</a
                        >
                    </TableCell>
                    <TableCell>Windows</TableCell>
                    <TableCell>Most</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Files (iOS)</TableCell>
                    <TableCell>iOS</TableCell>
                    <TableCell>
                        .zip<br>
                        Can rename .7z to .zip
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Windows Explorer</TableCell>
                    <TableCell>Windows</TableCell>
                    <TableCell>.zip</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <h2 class="header2">
        Adblock
    </h2>
    <p class="text">
        An adblocker is recommended when accessing certain links on this
        megathread and the Internet in general. This can be installed as
        an extension in your browser. Some browsers come with an adblocker
        integrated.
    </p>
    <div class="table-container">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Browser</TableHead>
                    <TableHead>Extension</TableHead>
                    <TableHead>Links</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://vivaldi.com"
                            class="link"
                            >Vivaldi</a
                        >
                    </TableCell>
                    <TableCell></TableCell><TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://brave.com"
                            class="link"
                            >Brave</a
                        >
                    </TableCell>
                    <TableCell></TableCell><TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://helium.computer"
                            class="link"
                            >Helium</a
                        >
                    </TableCell>
                    <TableCell></TableCell><TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                        <a
                            href="https://ublockorigin.com"
                            class="link"
                            >uBlock Origin</a
                        >
                    </TableCell>
                    <TableCell>
                        <a
                            href="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en"
                            class="link"
                            >Chrome</a
                        >
                        <a
                            href="https://addons.mozilla.org/en-US/android/addon/ublock-origin/"
                            class="link"
                            >Firefox</a
                        >
                        <a
                            href="https://addons.opera.com/en/extensions/details/ublock/"
                            class="link"
                            >Opera</a
                        >
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <p class="text">
        For Android: Download Firefox from the Play Store, locate the Addons
        menu and select uBlock Origin. Add it to Firefox and remember to only
        use Firefox to download ROMs.
    </p>
    <h2 class="header2">
        Bypassing Download Limits
    </h2>
    <h3 class="header3">
        Google Drive
    </h3>
    <p class="text">
        From time to time when trying to download a file, you may see an
        error message saying “Download quota exceeded, so you can’t download
        this file at this time”. The steps to bypass the download quota limit
        are as follows:
    </p>

    <ol class="list-numbered">
        <li>
            Sign in to your Google account or create one, if you have not
            already.
        </li>
        <li>Open Google Drive and go to “My Drive” in the sidebar.</li>
        <li>Make a new folder. It does not matter what you name it.</li>
        <li>
            Go to the quota'd folder, right click on the file you want to
            download, and click “Add Shortcut to Drive”.
        </li>
        <li>
            Navigate to “My Drive” and then to the folder you made, and click
            “Add Shortcut”.
        </li>
        <li>
            Go to “My Drive” on the sidebar. Right-click the folder you made and
            click “Download”.
        </li>
        <li>A .zip file with the file(s) you selected starts downloading.</li>
    </ol>
    <h3 class="header3">
        MEGA
    </h3>
    <p class="text">
        MEGA has a 5 GB download limit every 24 hours. To bypass MEGA's download
        limits, you will need either a VPN or a list of proxies. If you are
        using a VPN, simply connect to it. If you are using a list of proxies,
        download <a
            href="https://github.com/tonikelope/megabasterd"
            class="link"
            >MegaBasterd</a
        > and configure it with the list of proxies.
    </p>
</div>