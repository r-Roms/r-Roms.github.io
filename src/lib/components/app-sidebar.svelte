<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { base } from "$app/paths";

    //Popular items,
    const populars = [
        {
            title: "About RVZ files",
            url: base + "/Populars/about-rvz-files",
        },
        {
            title: "Metroid",
            url: base + "/Populars/metroid",
        },
        {
            title: "Mario",
            url: base + "/Populars/mario",
        },
        {
            title: "Fire Emblem",
            url: base + "/Populars/fire-emblem",
        },
        {
            title: "The Legend of Zelda",
            url: base + "/Populars/zelda",
        },
        {
            title: "Pokemon",
            url: base + "/Populars/pokemon",
        },
        {
            title: "Persona",
            url: base + "/Populars/persona",
        },
        {
            title: "Super Smash Bros",
            url: base + "/Populars/super-smash-bros",
        },
        {
            title: "Xenoblade",
            url: base + "/Populars/xenoblade",
        },
    ];

    //Nintendo items,
    const Nintendo = [
        {
            title: "Nintendo Games",
            url: base + "/Nintendo/nintendo-games",
        },
        {
            title: "Nintendo DS",
            url: base + "/Nintendo/nintendo-ds",
        },
        {
            title: "Nintendo 3DS",
            url: base + "/Nintendo/nintendo-3ds",
        },
        {
            title: "Nintendo GameCube",
            url: base + "/Nintendo/nintendo-gamecube",
        },
        {
            title: "Nintendo Wii",
            url: base + "/Nintendo/nintendo-wii",
        },
        {
            title: "Nintendo Wii U",
            url: base + "/Nintendo/nintendo-wii-u",
        },
    ];

    //Sony items,
    const sony = [
        {
            title: "NoPayStation",
            url: base + "/Sony/nopaystation",
        },
        {
            title: "Sony Playstation",
            url: base + "/Sony/sony-playstation",
        },
        {
            title: "Sony Playstation 2",
            url: base + "/Sony/sony-playstation-2",
        },
        {
            title: "Sony Playstation Portable",
            url: base + "/Sony/sony-playstation-portable",
        },
        {
            title: "Sony Playstation 3",
            url: base + "/Sony/sony-playstation-3",
        },
        {
            title: "Sony Playstation Vita",
            url: base + "/Sony/sony-playstation-vita",
        },
    ];

    //Microsoft items,
    const microsoft = [
        {
            title: "Microsoft Xbox",
            url: base + "/Microsoft/microsoft-xbox",
        },
        {
            title: "Microsoft Xbox 360",
            url: base + "/Microsoft/microsoft-xbox360",
        },
    ];

    //Sega items,
    const sega = [
        {
            title: "Sega Games",
            url: base + "/Sega/sega-games",
        },
        {
            title: "Sega Dreamcast",
            url: base + "/Sega/sega-dreamcast",
        },
        {
            title: "Sega Saturn",
            url: base + "/Sega/sega-saturn",
        },
        {
            title: "Sega CD",
            url: base + "/Sega/sega-cd",
        },
    ];

    // Retro & Arcade items,
    const retroArcade = [
        {
            title: "Retro Games",
            url: base + "/Retro & Arcade/retro-games",
        },
        {
            title: "Arcade",
            url: base + "/Retro & Arcade/arcade",
        },
    ];

    //PC items,
    const pc = [
        {
            title: "PC Games",
            url: base + "/PC/pc-games",
        },
    ];

    // Miscellaneous items,
    const misc = [
        {
            title: "ROM Sets",
            url: base + "/Miscellaneous/rom-sets",
        },
        {
            title: "BIOS Files",
            url: base + "/Miscellaneous/bios-files",
        },
    ];
</script>

<Sidebar.Root collapsible="offcanvas">
    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupLabel>Popular</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each populars as item}
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
        <Sidebar.Group>
            <Sidebar.GroupLabel>Nintendo</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each Nintendo as item}
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
        <Sidebar.Group>
            <Sidebar.GroupLabel>Sony</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each sony as item}
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
        <Sidebar.Group>
            <Sidebar.GroupLabel>Microsoft</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each microsoft as item}
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
        <Sidebar.Group>
            <Sidebar.GroupLabel>Sega</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each sega as item}
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
        <Sidebar.Group>
            <Sidebar.GroupLabel>Retro & Arcade</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each retroArcade as item}
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
        <Sidebar.Group>
            <Sidebar.GroupLabel>PC</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each pc as item}
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
        <Sidebar.Group>
            <Sidebar.GroupLabel>Miscellaneous</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each misc as item}
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
    </Sidebar.Content>
</Sidebar.Root>
