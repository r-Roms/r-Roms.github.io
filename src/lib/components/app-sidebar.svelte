<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { base } from "$app/paths";

    type SidebarItem = {
        title: string;
        url: string;
    };

    type SidebarSection = {
        label: string;
        items: SidebarItem[];
    };

    const sidebarSections: SidebarSection[] = [
        {
            label: "General",
            items: [
                { title: "Home", url: "/" },
                { title: "Direct Downloads", url: base + "/General/ddl" },
                { title: "Torrents", url: base + "/General/torrents" },
                { title: "Preservation", url: base + "/General/preservation" },
                { title: "Other", url: base + "/General/other" },
            ]
        },
        {
            label: "Popular",
            items: [
                { title: "About RVZ files", url: base + "/Populars/about-rvz-files" },
                { title: "Metroid", url: base + "/Populars/metroid" },
                { title: "Mario", url: base + "/Populars/mario" },
                { title: "Fire Emblem", url: base + "/Populars/fire-emblem" },
                { title: "The Legend of Zelda", url: base + "/Populars/zelda" },
                { title: "Pokemon", url: base + "/Populars/pokemon" },
                { title: "Persona", url: base + "/Populars/persona" },
                { title: "Super Smash Bros", url: base + "/Populars/super-smash-bros" },
                { title: "Xenoblade", url: base + "/Populars/xenoblade" },
            ]
        },
        {
            label: "Nintendo",
            items: [
                { title: "Nintendo Games", url: base + "/Nintendo/nintendo-games" },
                { title: "Nintendo DS", url: base + "/Nintendo/nintendo-ds" },
                { title: "Nintendo 3DS", url: base + "/Nintendo/nintendo-3ds" },
                { title: "Nintendo GameCube", url: base + "/Nintendo/nintendo-gamecube" },
                { title: "Nintendo Wii", url: base + "/Nintendo/nintendo-wii" },
                { title: "Nintendo Wii U", url: base + "/Nintendo/nintendo-wii-u" },
            ]
        },
        {
            label: "Sony",
            items: [
                { title: "NoPayStation", url: base + "/Sony/nopaystation" },
                { title: "Sony Playstation", url: base + "/Sony/sony-playstation" },
                { title: "Sony Playstation 2", url: base + "/Sony/sony-playstation-2" },
                { title: "Sony Playstation Portable", url: base + "/Sony/sony-playstation-portable" },
                { title: "Sony Playstation 3", url: base + "/Sony/sony-playstation-3" },
                { title: "Sony Playstation Vita", url: base + "/Sony/sony-playstation-vita" },
            ]
        },
        {
            label: "Microsoft",
            items: [
                { title: "Microsoft Xbox", url: base + "/Microsoft/microsoft-xbox" },
                { title: "Microsoft Xbox 360", url: base + "/Microsoft/microsoft-xbox360" },
            ]
        },
        {
            label: "Sega",
            items: [
                { title: "Sega Games", url: base + "/Sega/sega-games" },
                { title: "Sega Dreamcast", url: base + "/Sega/sega-dreamcast" },
                { title: "Sega Saturn", url: base + "/Sega/sega-saturn" },
                { title: "Sega CD", url: base + "/Sega/sega-cd" },
            ]
        },
        {
            label: "Retro & Arcade",
            items: [
                { title: "Retro Games", url: base + "/Retro & Arcade/retro-games" },
                { title: "Arcade", url: base + "/Retro & Arcade/arcade" },
            ]
        },
        {
            label: "PC",
            items: [
                { title: "PC Games", url: base + "/PC/pc-games" },
            ]
        },
        {
            label: "Miscellaneous",
            items: [
                { title: "ROM Sets", url: base + "/Miscellaneous/rom-sets" },
                { title: "BIOS Sets", url: base + "/Miscellaneous/bios-sets" },
                { title: "Other", url: base + "/Miscellaneous/other" },
            ]
        }
    ];
</script>

<Sidebar.Root collapsible="offcanvas">
    <Sidebar.Content>
        {#each sidebarSections as section}
            <Sidebar.Group>
                <Sidebar.GroupLabel>{section.label}</Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                    <Sidebar.Menu>
                        {#each section.items as item}
                            <Sidebar.MenuItem>
                                <Sidebar.MenuButton>
                                    {#snippet child({ props })}
                                        <a href={item.url} {...props}>
                                            <span>{item.title}</span>
                                        </a>
                                    {/snippet}
                                </Sidebar.MenuButton>
                            </Sidebar.MenuItem>
                        {/each}
                    </Sidebar.Menu>
                </Sidebar.GroupContent>
            </Sidebar.Group>
        {/each}
    </Sidebar.Content>
</Sidebar.Root>
