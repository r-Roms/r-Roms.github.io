<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import { sidebarSections } from "$lib/data/sidebar.js";

    let openSections = $state(
        Object.fromEntries(sidebarSections.map(s => [s.title, s.defaultOpen ?? true]))
    );
</script>

<Sidebar.Root collapsible="offcanvas">
    <Sidebar.Content>
        {#each sidebarSections as section}
            <Collapsible.Root
                class="group/collapsible"
                open={openSections[section.title]}
                onOpenChange={v => openSections[section.title] = v}
            >
                <Sidebar.Group>
                    <Sidebar.GroupLabel>
                        <Collapsible.Trigger class="flex w-full items-center justify-between">
                            {section.title}
                            <ChevronDown class="transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </Collapsible.Trigger>
                    </Sidebar.GroupLabel>
                    <Collapsible.Content>
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
                    </Collapsible.Content>
                </Sidebar.Group>
            </Collapsible.Root>
        {/each}
    </Sidebar.Content>
</Sidebar.Root>
