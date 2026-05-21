<script lang="ts">
    import type { Link } from "$lib/types.js";

    let { links }: { links: Link[] } = $props();
</script>

<ul class="list-bulleted">
    {#each links as link}
        <li>
            <a href={link.url} class="link">{link.name}</a>
            {#if link.description}
                <br><span class="text-note">{@html link.description}</span>
            {/if}
        </li>
    {/each}
</ul>