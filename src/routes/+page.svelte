<script lang="ts">
    import type { PageData } from "./$types.js";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">{data.pagetitle}</h1>
<h2 class="header2">Sections</h2>
<ListBullet links={data.LINKSITES} />
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
    Having a single source of truth allows us to provide the most
    up-to-date and safe links in a concise format. Reddit comments are
    unlikely to be updated, may provide conflicting information, and
    may require you to look up several comments across several posts over
    many years.
</p>
<h2 class="header2">Reddit DMs</h2>
<p class="text">
    We do not recommend accepting unsolicited DMs from users if you comment on
    or create a post on the r/ROMs. Users looking to DM you could be trying
    to help, but they may be pushing you to malicious sites or links without
    the public visibility to call them out. Any safe information they provide
    likely should be provided in a comment (allowing users to review or
    benefit from), included in this site, provided as an Issue to include
    on the site, or be covered by an existing public community. 

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
