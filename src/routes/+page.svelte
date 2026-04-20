<script lang="ts">
    import { on } from "svelte/events";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { SidebarLeftIcon } from '@hugeicons/core-free-icons';
</script>

<!-- Home page for the ROMs megathread -->
<div class="page-container">
    <h1 class="header1">
        r/ROMs Megathread Site
    </h1>
    <p class="page-description">
        Use the sidebar icon
        <HugeiconsIcon icon={SidebarLeftIcon} size={18} strokeWidth={2} class="inline-block align-middle" />
        at the top of the page to navigate the site for all information.
    </p>
    <h2 class="header2">
        Quick Links
    </h2>
    <p class="text">
        <a
            href="./General/ddl"
            class="link"
            >Information for standard downloads</a
        ><br>
        <a
            href="./General/torrents"
            class="link"
            >Information for torrenting</a
        >
    </p>
    <h2 class="header2">
        Issues
    </h2>
    <p class="text">
        Any issues found on this site should be posted to the
        <a
            href="https://github.com/r-Roms/r-Roms.github.io/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen"
            class="link"
            >GitHub Issues page</a
        >.
    </p>
    <h2 class="header2">
        Contributing
    </h2>
    <p class="text">
        The Megathread consists of aggregated links hosted on many sites.
        Keeping these files available require the support of users. Please
        consider making donations to your favorite sites if they allow it.
    </p>
    <p class="text">
        If you are downloading via torrent you can also contribute by seeding
        files back to the torrent swarm. This ensures both availability and
        speed for files.
    </p>
    <h2 class="header2">
        Additional Information
    </h2>
    <h3 class="header3">
        "No-Intro" and "Redump"
    </h3>
    <p class="text">
        No-Intro and Redump are groups that catalog hashes of dumped games for
        many systems. If "No-Intro" or "Redump" is present in the name of a
        group of links, it is a collection of the currently best-available ROMs
        for the system.
    </p>
    <h3 class="header3">
        Locked Internet Archive Items
    </h3>
    <p class="text">
        Internet Archive restricts items that contain high-risk content or
        generate a high amount of traffic from being able to be downloaded
        without an account to decrease the likelihood of takedowns and to
        prevent abuse. This is shown with a lock icon beside the file name in
        the item's file listing.
        To download locked items or files, register an
        <a
            href="https://archive.org/account/signup"
            class="link"
            >Internet Archive account</a
        > or download it from Minerva instead.
    </p>
    <h3 class="header3">
        Internet Archive Metadata
    </h3>
    <p class="text">
        Internet Archive items have metadata files that end in extensions such
        as <code
            class="inline-code"
        >
            .xml
        </code>
        and
        <code
            class="inline-code"
        >
            .sqlite
        </code>. These files are not important to download but are meant for the
        website to know what files to display and the reviews of the item.
    </p>
    <h3 class="header3">
        Internet Archive Torrents
    </h3>
    <p class="text">
        Some Internet Archive items contain torrent files as another download
        method. However, the torrent's file listing is usually incomplete
        compared to what is listed on the website. For this reason, it is
        recommended to use direct downloads with a download manager instead of
        torrents.
    </p>
    <h3 class="header3">
        Archive File Types (ZIP, 7z, RAR)
    </h3>
    <p class="text">
        ZIP, 7z, and RAR are archive file types which means they must be
        extracted. 7-Zip is recommended for extracting these files.
        Download and install it <a
            href="https://www.7-zip.org/"
            class="link"
            >here</a
        >
        and run it. Then, open the archive file in 7-Zip or right click on it and
        go to <br />
        <code
            class="inline-code"
        >
            7-Zip -> Extract Files
        </code>.
    </p>
    <h2 class="header2">
        Designer Shoutout
    </h2>
    <p class="text">
        This is a shoutout to my designer and friend AshLee whose design skills helped make the megathread more usable, easier to update and visually nicer.
        Her blog can be found at         
        <a
            href="https://www.ashleehee.com/"
            class="link"
            >https://www.ashleehee.com/</a>.
    </p>
</div>
