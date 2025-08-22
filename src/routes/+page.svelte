<script lang="ts">
    import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from "$lib/components/ui/table/index.js";
    import img1 from "$lib/img/internetarchivelock.png";
    import img2 from "$lib/img/internetarchivelockfile1.png";
    import img3 from "$lib/img/internetarchivelockfile2.png";
    import img4 from "$lib/img/internetarchivemetadata.png";
</script>

<!-- Home page for the ROMs megathread -->
<div class="mx-8 mb-8 mt-8 space-y-4 bg-background">
    <h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
        r/ROMs Megathread
    </h1>
    <p
        class="text-muted-foreground text-xl leading-7 [&:not(:first-child)]:mt-6"
    >
        Use the menu bar on the side to navigate this megathread.
    </p>
    <h2
        class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
        Donate to Myrient and/or the Internet Archive
    </h2>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        This megathread comprises of aggregated links hosted at <a
            href="https://myrient.erista.me/"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >Myrient</a
        >
        and the
        <a
            href="https://archive.org/"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >Internet Archive</a
        >. Without the support of users like you, this megathread would have
        much less content available for download.<br /> Please consider making a
        donation to Myrient
        <a
            href="https://myrient.erista.me/donate/"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >here</a
        >
        and/or to the Internet Archive
        <a
            href="https://myrient.erista.me/donate/"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >here</a
        >.
    </p>
    <h2
        class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
        Additional Information
    </h2>
    <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        "No-Intro" and "Redump"
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        No-Intro and Redump are groups that catalog hashes of dumped games for
        many systems. If "No-Intro" or "Redump" is present in the name of a
        group of links, it is a collection of the currently best-available ROMs
        for the system.
    </p>
    <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Locked Internet Archive Items
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Internet Archive restricts items that contain high-risk content or
        generate a high amount of traffic from being able to be downloaded
        without an account to decrease the likelihood of takedowns and to
        prevent abuse. This is shown with a lock icon beside the file name in
        the item's file listing.
        <img src={img1} alt="" class="h-full w-full rounded-md object-cover" />
        When accessing the file directly, one of the following errors is shown.
        <img src={img2} alt="" class="h-full w-full rounded-md object-cover" />
        <br />
        <img src={img3} alt="" class="h-full w-full rounded-md object-cover" />
        To download locked items or files, register an
        <a
            href="https://archive.org/account/signup"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >Internet Archive account</a
        > or download it from Myrient instead.
    </p>
    <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Internet Archive Metadata
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Internet Archive items have metadata files that end in extensions such
        as <code
            class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        >
            .xml
        </code>
        and
        <code
            class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        >
            .sqlite
        </code>. These files are not important to download but are meant for the
        website to know what files to display and the reviews of the item.
        <img src={img4} alt="" class="h-full w-full rounded-md object-cover" />
    </p>
    <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Internet Archive Torrents
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Some Internet Archive items contain torrent files as another download
        method. However, the torrent's file listing is usually incomplete
        compared to what is listed on the website. For this reason, it is
        recommended to use direct downloads with a download manager instead of
        torrents.
    </p>
    <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Archive File Types (ZIP, 7z, RAR)
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        ZIP, 7z, and RAR are archive file types which means they must be
        extracted. 7-Zip is recommended for extracting these files.
        Download and install it <a
            href="https://www.7-zip.org/"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >here</a
        >
        and run it. Then, open the archive file in 7-Zip or right click on it and
        go to <br />
        <code
            class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        >
            7-Zip -> Extract Files
        </code>.
    </p>
    <h2
        class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
        Blocking Ads with uBlock Origin
    </h2>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        uBlock Origin is recommended when accessing certain links on this
        megathread and the Internet in general. It blocks ads,
        trackers,and much more. <br /> Below are links to download and install
        it for certain web browsers.
    </p>
    <div class="my-6 w-full overflow-y-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Links</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Chrome Web Store</TableCell>
                    <TableCell>
                        <a
                            href="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Link</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Firefox Add-ons</TableCell>
                    <TableCell>
                        <a
                            href="https://addons.mozilla.org/en-US/android/addon/ublock-origin/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Link</a
                        >
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Opera Add-ons</TableCell>
                    <TableCell>
                        <a
                            href="https://addons.opera.com/en/extensions/details/ublock/"
                            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
                            >Link</a
                        >
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        For Android: Download Firefox from the Play Store, locate the Addons
        menu and select uBlock Origin. Add it to Firefox and remember to only
        use Firefox to download ROMs.
    </p>
    <h2
        class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
        Bypassing Download Limits
    </h2>
    <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Google Drive
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        From time to time when trying to download a file, you may see an
        error message saying “Download quota exceeded, so you can’t download
        this file at this time”. The steps to bypass the download quota limit
        are as follows:
    </p>

    <ol class="my-6 ml-6 font-medium list-decimal [&>li]:mt-2">
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
    <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        MEGA
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        MEGA has a 5 GB download limit every 24 hours. To bypass MEGA's download
        limits, you will need either a VPN or a list of proxies. If you are
        using a VPN, simply connect to it. If you are using a list of proxies,
        download <a
            href="https://github.com/tonikelope/megabasterd"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >MegaBasterd</a
        > and configure it with the list of proxies.
    </p>
</div>
