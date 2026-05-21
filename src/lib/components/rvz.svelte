<script lang="ts">
    import img1 from "$lib/img/rvz1.png";
    import img2 from "$lib/img/rvz2.png";
    import Maximize2 from "@lucide/svelte/icons/maximize-2";
    import Image from "@lucide/svelte/icons/image";
    import X from "@lucide/svelte/icons/x";

    let zoomedImg = $state<string | null>(null);
</script>

<h2 class="header2">
    RVZ Files
</h2>
<p class="text">
    RVZ files are compressed ISO files for GameCube and Wii. They will work
    on the Dolphin emulator but not on real hardware. Since RVZ is
    compressed, they will download and use less storage, at some cost to
    loading speed. It is recommended to use RVZ if you are emulating. If you
    are planning to use real hardware, use <a
        href="https://dolphin-emu.org/"
        class="link"
        >Dolphin Emulator</a
    >
    to convert the files to ISO.<br />
</p>

<p class="text-emphasis">Recommended Settings:</p>
<ul class="list-bulleted">
    <li>Block Size: 128KiB</li>
    <li>Compression: Zstandard</li>
    <li>Compression Level: 19 (or lower to speed up loading)</li>
    <li>Remove Junk Data: Uncheck</li>
</ul>

<div>
    <button
        class="text text-left hover:text-primary hover:underline underline-offset-4 transition-all cursor-zoom-in flex items-start gap-2 group"
        onclick={() => zoomedImg = img1}
    >
        <Image
            class="size-4 mt-1 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
        />
        <span>In Dolphin, right-click on a game and select <strong>Convert File...</strong></span>
    </button>
</div>

<div>
    <button
        class="text text-left hover:text-primary hover:underline underline-offset-4 transition-all cursor-zoom-in flex items-start gap-2 group"
        onclick={() => zoomedImg = img2}
    >
        <Image
            class="size-4 mt-1 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
        />
        <span>Select your conversion settings as shown, or follow the recommended list above.</span>
    </button>
</div>

{#if zoomedImg}
    <div 
        class="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4 cursor-zoom-out"
        onclick={() => zoomedImg = null}
        onkeydown={(e) => e.key === 'Escape' && (zoomedImg = null)}
        role="button"
        tabindex="0"
    >
        <div class="relative max-w-full max-h-full">
            <img src={zoomedImg} alt="Enlarged view" class="rounded-lg shadow-2xl max-h-[90vh] w-auto border bg-card" />
            <button class="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors p-2" aria-label="Close">
                <X class="size-8" />
            </button>
        </div>
    </div>
{/if}