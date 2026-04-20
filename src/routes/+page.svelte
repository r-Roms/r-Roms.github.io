<script lang="ts">
    import { on } from "svelte/events";
</script>

<!-- Home page for the ROMs megathread -->
<div class="mx-8 mb-8 mt-8 space-y-4 bg-background">
    <h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
        r/ROMs Megathread Site
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Use the menu bar to navigate the site for all information.
    </p>
    <h2
        class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Issues
    </h2>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        Any issues found on this site should be posted to the
        <a
            href="https://github.com/r-Roms/r-Roms.github.io/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >GitHub Issues page</a
        >.
    </p>
    <h2
        class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Contributing
    </h2>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        The Megathread consists of aggregated links hosted on many sites.
        Keeping these files available require the support of users. Please
        consider making donations to your favorite sites if they allow it.
    </p>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        If you are downloading via torrent you can also contribute by seeding
        files back to the torrent swarm. This ensures both availability and
        speed for files.
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
        > or download it from Minerva instead.
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
        class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Designer Shoutout
    </h2>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
        This is a shoutout to my designer and friend AshLee whose design skills helped make the megathread more usable, easier to update and visually nicer.
        Her blog can be found at         
        <a
            href="https://www.ashleehee.com/"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >https://www.ashleehee.com/</a>.
    </p>
</div>
