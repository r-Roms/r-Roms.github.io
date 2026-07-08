<script lang="ts">
    import type { Snippet } from "svelte";
    import Image from "@lucide/svelte/icons/image";
    import X from "@lucide/svelte/icons/x";

    let {
        src,
        children,
    }: {
        src: string;
        children: Snippet;
    } = $props();

    let zoomed = $state(false);
</script>

<button
    class="text text-left hover:text-primary hover:underline underline-offset-4 transition-all cursor-zoom-in inline-flex items-start gap-1 group"
    onclick={() => zoomed = true}
>
    <Image
        class="size-4 mt-1 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
    />
    <span>{@render children()}</span>
</button>

{#if zoomed}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4 cursor-zoom-out"
        onclick={() => zoomed = false}
        onkeydown={(e) => e.key === 'Escape' && (zoomed = false)}
        role="button"
        tabindex="0"
    >
        <div class="relative max-w-full max-h-full">
            <img src={src} alt="Enlarged view" class="rounded-lg shadow-2xl max-h-[90vh] w-auto border bg-card" />
            <button class="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors p-2" aria-label="Close">
                <X class="size-8" />
            </button>
        </div>
    </div>
{/if}