<script lang="ts">
    import type { PageData } from "./$types.js";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { SidebarLeftIcon } from '@hugeicons/core-free-icons';
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">{data.pagetitle}</h1>
<p class="page-description">
    Use the sidebar icon
    <HugeiconsIcon icon={SidebarLeftIcon} size={18} strokeWidth={2} class="inline-block align-middle" />
    at the top of the page to navigate the site.
</p>
<h2 class="header2">Issues</h2>
<p class="text">
    Any issues found on this site should be posted to the
    <a
        href="https://github.com/r-Roms/r-Roms.github.io/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen"
        class="link" >GitHub Issues page</a
    >.
</p>
<h2 class="header2">Contributing</h2>
<p class="text">
    The Megathread consists of aggregated links hosted on many sites.
    Keeping these files available require the support of users. Please
    consider making donations to your favorite sites if they allow it.
</p>
<h2 class="header2">Why have a Megathread site</h2>
<p class="text">
    Having a single source of truth ensures links are up to date, safe, and
    convenient to use. Information from Reddit comments could be malicious,
    pointing users to unsafe sites or to sites designed to appear like other
    trusted sites. Comments are also unlikely to be updated to reflect new
    information.
</p>
<h2 class="header2">Reddit DMs</h2>
<p class="text">
    We do not recommend accepting unsolicited DMs from users if you comment
    or create a post on r/ROMs. Users looking to DM you could be trying
    to help, but they may be pushing you to malicious sites or links without
    the public visibility to call them out. Any information they provide
    can be provided in a comment (allowing other users to review or
    benefit from the infomation), included on this site, provided as an
    issue on GitHub to include on the site, or be covered by an existing
    public community (such as a different subreddit). 

</p>
<h2 class="header2">Designer Shoutout</h2>
<p class="text">
    This is a shoutout to my designer and friend AshLee whose design skills helped make the megathread more usable, easier to update and visually nicer.
    Her blog can be found at         
    <a
        href="https://www.ashleehee.com/"
        class="link"
        >https://www.ashleehee.com/</a>.
</p>
</div>
