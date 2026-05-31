<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { sidebarItems } from "$lib/data/sidebar.js";
</script>

<Sidebar.Root collapsible="offcanvas">
    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each sidebarItems as item}
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