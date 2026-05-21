<script lang="ts">
    let {
        path,
        baseUrl = "https://emulation.gametechwiki.com/index.php/",
    }: {
        path?: string;
        baseUrl?: string;
    } = $props();

    const url = $derived(`${baseUrl}${path}`);
</script>

<h2 class="header2">Emulators</h2>
<p class="text">
    See the <a href={url} class="link">Emulation Wiki</a> for more information
</p>