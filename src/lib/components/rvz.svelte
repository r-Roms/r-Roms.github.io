<script lang="ts">
    import img1 from "$lib/img/rvz1.png";
    import img2 from "$lib/img/rvz2.png";
    import ImageZoomed from "$lib/components/ImageZoomed.svelte";
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
    <li>Compression Level: 19 (or lower to possibly speed up loading)</li>
    <li>Remove Junk Data: Uncheck</li>
</ul>
<div>
    <ImageZoomed src={img1}>In Dolphin, right-click on a game and select <strong>Convert File...</strong></ImageZoomed>
</div>

<div>
    <ImageZoomed src={img2}>Select your conversion settings as shown, or follow the recommended list above.</ImageZoomed>
</div>
