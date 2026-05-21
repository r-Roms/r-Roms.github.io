<script lang="ts">
    import type { PageData } from "./$types.js";
    import { resolve } from "$app/paths";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    import { PRESERVE } from "$lib/data/siteparts.js"
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
    section for more information.
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
    in their native language. Though translations can be to and from any
    language, most common is translating from Japanese-only games to English.
</p>
<h2 class="header2">Fan Games</h2>
<p class="text">
    Fan Games are frequently and wrongly lumped into the ROM Hack category.
    Like ROM Hacks, Fan Games are user created games based on an existing
    game. Unlike ROM Hacks they are not ROMs nor are they emulated. Fan
    Games are made in a PC game engine like Unity or Godot, and are provided
    as an executable file. Either
    <code class="inline-code">.exe</code> for Windows,
    <code class="inline-code">*.dmg</code> for MacOS, or
    <code class="inline-code">.appimage</code> /
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
</div>
