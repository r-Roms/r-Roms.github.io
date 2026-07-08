<script lang="ts">
    import type { PageData } from "./$types.js";
    import { resolve } from "$app/paths";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    import { PRESERVE } from "$lib/data/siteparts.js"
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">Patching</h1>
<p class="text">
    Patching is the process of applying a patch file to a base ROM to
    create a new, specific patched output ROM. This allows developers to
    modify ROMs in any number of ways and distribute their work without
    running into possible copyright issues providing the full ROM with
    all assets. Patches must be applied to specific versions of a ROM to
    ensure the patched ROM is accurate. The developer will either provide the
    required checksum for users to verify or use a patch file that integrates
    the checksum so programs can verify your provided ROM matches. See the
    <a href={PRESERVE.url} class="link"
    >Preservation</a>
    section for more information on checksums.
</p>
<h2 class="header2">Sites</h2>
<ListBullet links={data.sites} />
<h2 class="header2">ROM Hacks</h2>
<p class="text">
    ROM Hacks are custom modifications to an existing game. These can
    be anything from small bug fixes or quality of life improvements to
    massive updates to the maps, stories, or functionality of the game.
</p>
<h2 class="header2">Translations</h2>
<p class="text">
    Translations are a form of ROM hack. Rather than modifying the game for
    gameplay or story purposes, it is modified so users can experience a game
    in their native language.
</p>
<h2 class="header2">Fan Games</h2>
<p class="text">
    Fan Games are made in a PC game engine like Unity, Godotm or RPG Maker.
    They are often mistaken with ROM Hacks. ROM Hacks are made by modifying
    an existing game and are emulated like the existing game. Fan Games are
    built from the ground up and run as a PC executable, typically
    <code class="inline-code">.exe</code> for Windows,
    but may also be 
    <code class="inline-code">*.dmg</code> for MacOS, and
    <code class="inline-code">.appimage</code> or
    <code class="inline-code">.flatpak</code> for Linux.  
</p>
<h2 class="header2">Pre-patched ROMs</h2>
<p class="text">
    It is not recommended to download prepatched ROMs, unless that is how
    the developers distribute the game themselves. Some possible issues
    include:
</p>
<ol class="list-numbered">
    <li>Not downloading the most recent version of the game</li>
    <li>Not getting changelogs or update notifications</li>
    <li>Not getting info on breaking changes requiring user input</li>
    <li>Not finding a prepatched ROM for the game </li>
    <li>Getting a ROM that was not properly patched</li>
    <li>Downloading malware (not likely, but possible)</li>
</ol>
<h2 class="header2">Common Base ROM Names</h2>
<p class="text">
    The most common method today for ROM hacks to specify the required
    base ROM is the No-Intro or Redump Databases for file names and checksums.
    Many older ROM hacks predating common usage of No-Intro / Redump and
    sometimes today for legacy reasons may use a different name for the ROM.
    Typically this would include an ID number dependent on whomever was
    cataloging the ROMs and the username/group that released the specific
    ROM dump.
</p>
<p class="text">
    To avoid confusion, developers should always provide the CRC32, MD5, and
    SHA-1 checksums of the ROMs users should use to patch. They may also
    provide the patch as a BPS or UPS file which provides required checksums
    programs may use to ensure compatibility. The following lists ROM name
    permutations that reflect the same ROM version.
</p>
<Accordion.Root type="single">
    {#each data.baseRoms as rom, i}
        <Accordion.Item value={`rom-${i}`}>
            <Accordion.Trigger>{rom.name}</Accordion.Trigger>
            <Accordion.Content>
                {#if rom.altnames.length === 1}
                    <p class="text-sm">
                        <span class="font-semibold">Alternative name:</span> {rom.altnames[0]}
                    </p>
                {:else if rom.altnames.length > 1}
                    <p class="text-sm">
                        <span class="font-semibold">Alternative names:</span>
                    </p>
                    <div class="ml-4 mt-1 text-sm">
                        {#each rom.altnames as alt}
                            <p>{alt}</p>
                        {/each}
                    </div>
                {/if}
                <div class="text-xs mt-2">
                    <p><span class="font-semibold">CRC32:</span> <span class="font-mono">{rom.hashes.crc32}</span></p>
                    <p><span class="font-semibold">MD5:</span> <span class="font-mono">{rom.hashes.md5}</span></p>
                    <p><span class="font-semibold">SHA-1:</span> <span class="font-mono">{rom.hashes.sha1}</span></p>
                </div>
            </Accordion.Content>
        </Accordion.Item>
    {/each}
</Accordion.Root>
</div>
