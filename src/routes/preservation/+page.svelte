<script lang="ts">
    import type { PageData } from "./$types.js";
    import ListBullet from "$lib/components/lists/bullet.svelte"
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
    <h1 class="header1">Preservation</h1>
    <h1 class="header2">Databases</h1>
    <p class="text">
        Many online groups serve to aggregate accurate information related to
        Video Games, ROM files, BIOS files, media, and more. This is done to
        ensure users can verify files for emulation and provide various types
        of metadata and media for presentation.
    </p>
    <p class="text">
        Collections often refer to one of the below databases, typically
        No-Intro or Redump, to denote that the ROMs or BIOS files have been
        verified for accuracy with that database.
    </p>
    <ListBullet links={data.databases} />
    <h2 class="header2">File Hashing / Checksums</h2>
    <p class="text">
        File hashing is a method of generating a unique fingerprint (called a
        hash or checksum) from a file's data using an algorithm. Any change in
        the file data produces a different hash. Users can ensure any
        file they have is accurate simply by comparing the hash string to a
        known good hash without redownloading a file in its entirety.
    </p>
    <p class="text">
        File hashing is extremely beneficial with ROM files, allowing users
        to validate their ROM files against known good databases regardless of
        file-naming scheme. Hashing is also used to validate base ROMs to
        ensure ROM patches are applied only to ROMs that will work.
    </p>
    <p class="text">
        Preservation groups maintain databases of accurate ROM file hashes
        without distributing ROMs themselves. This lets them serve as stable
        resources since they not restricted by copyright issues (they do not
        host ROMs) or data storage costs (file hashes are short text strings).
    </p>
    <h3 class="header3">Example</h3>
    <p class="text">
        Paper Mario: The Thousand-Year Door:
    </p>
    <ol class="list-bulleted">
        <li>Uncompressed <code class="inline-code">.iso</code> is
        1,459,978,240 bytes or ~1.36GiB</li>
        <li>Compressed <code class="inline-code">.rvz</code> is
        330,493,036 bytes or ~315.2MiB</li>
        <li>Common hashes for the <code class="inline-code">.iso</code>
            are: <br>
            CRC32 = <code class="inline-code">0477b085</code> or 8 bytes<br>
            MD5 = <code class="inline-code"
                >e30d573cf8a53f22c6c5bb355c0cfd61</code> or 32 bytes<br>
            SHA-1 = <code class="inline-code"
                >1fbb7eaa7b4188c96f1019bac43439c972ba6758</code> or 40 bytes
        </li>
    </ol>
    <h3 class="header3">Hashing Tools</h3>
    <ListBullet links={data.hashers} />
</div>
