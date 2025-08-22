<script lang="ts">
    import { base } from "$app/paths";
    import img1 from "$lib/img/9K4CIDd.png";
    import img2 from "$lib/img/75nhplt.png";
</script>

<!-- Home page for the ROMs megathread -->
<div class="mx-8 mb-8 mt-8 space-y-4 bg-background">
    <h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
        About RVZ files
    </h1>
    <p
        class="text-muted-foreground text-xl leading-7 [&:not(:first-child)]:mt-6"
    >
        RVZ files work with the Dolphin emulator but not on real hardware. They
        also help save bandwidth for both you and the website hosting the files
        when downloading. If you are using real hardware, use <a
            href="https://dolphin-emu.org/"
            class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"
            >Dolphin Emulator</a
        >
        to convert the files to ISO<br />
        <img src={img1} alt="" class="h-full w-full rounded-md object-cover" />
        <img src={img2} alt="" class="h-full w-full rounded-md object-cover" />
    </p>
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
        controls
        class="h-full w-full rounded-md object-cover"
        autoplay
        muted
        playsinline
        preload="metadata"
        style="aspect-ratio: 16 / 9"
        ><source
            src="https://myrient.erista.me/assets/rvz.mp4"
            type="video/mp4"
        /></video
    >
</div>
