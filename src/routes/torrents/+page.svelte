<script lang="ts">
    import type { PageData } from "./$types.js";
    import ListBullet from "$lib/components/lists/bullet.svelte";
    let { data }: { data: PageData } = $props();
</script>

<div class="page-container">
<h1 class="header1">
Torrents
</h1>
<p class="text">
Torrents are a distributed, peer-to-peer file distribution system.
Rather than direct downloads which use a single source, torrents
download from other users connected to the same torrent. Use of
torrents require user setup, described below.
</p>
<h2 class="header2">
Sites
</h2>
<ListBullet links={data.sites} />
<h2 class="header2">
What is a Torrent
</h2>
<p class="text">
Torrents are peer-to-peer (P2P) file distribution systems, in which
individual users download files from each other in a group commonly
referred to as a "swarm". This type of distribution decentralizes
the cost of centrally managing files (such as direct downloads). Users
connect to the swarm using a program called a torrent client and a
metadata file, often called a torrent file, with information on the
files and online "trackers" that help users connect to each other.
</p>
<h2 class="header2">
Torrent Clients
</h2>
<p class="text">
At minimum, users will require a torrent client to connect to a swarm.
This is a program that allows your device to connect to a torrent
swarm, manage active torrents, and download/seed the files themselves.
</p>
<h2 class="header2">
Virtual Private Networks
</h2>
<p class="text">
A Virtual Private Network (VPN) is a way to securely extend a network
publicly, often called tunneling. For our purposes, this allows users
to connect to a remote server via a secure encrypted connection prior
to connecting to the public. This means all connections you make via
the VPN connection appear to the public to come from the remote server
instead of you. This provides a level of anonymity necessary in some
cases to safely download copyrighted material via torrent.
</p>
<h3 class="header3">
Are VPNs Necessary
</h3>
<p class="text">
The need for a VPN is dependent on the laws in your country and how
they are enforced. You should research your laws or find a trusted
community to ensure you do not face any repercussions.
</p>
<p class="text">
VPNs help prevent a copyright holder from logging your public IP
Address when accessing the torrent swarm and notifying your Internet
Service Provider (ISP). In the United States, this is known as a DMCA
Strike. The severity of the repercussions for a single or multiple are
dependent on your country.
</p>
<h3 class="header3">
Considerations
</h3>
<p class="text">
If you require a VPN, it is essentially required to setup your torrent
client to be "bound" to the VPN network. This forces your client to
only send data over the VPN network and not your normal internet
connection. Instructions for setting this up should be available
online for most clients. Most VPN Providers include a "Kill-Switch"
to disable internet connections if the VPN disconnects. Kill-Switches
are known to work inconsistently so do not offer sufficient protection
themselves.
</p>
<p class="text">
It is also recommended to use a VPN that allows for port forwarding.
Port forwarding allows your client to accept incoming connections
from users in the swarm. If you port forward, you will be able to
connect to any other user in the swarm. If you do not port forward,
you will only be able to connect to users who do port forward. This
will impact the availability and speed of downloads and seeding.
</p>
<p class="text">
There is no recommended free VPN Provider. You should always pay for
one if needed.
</p>
<h2 class="header2">
Seedboxes
</h2>
<p class="text">
Seedboxes are remote servers that provide high-bandwidth connections
and storage. They provide a web interface for a torrent client, and
allow you to directly download files you have downloaded on the server.
Seedboxes can replace both VPN and local torrent client.
</p>
<h2 class="header2">
Debrid Services
</h2>
<p class="text">
Debrid Services function very similarly to Seedboxes. However, storage
is shared among users and cached on the server, instead of dedicated
storage per user. If you add a torrent that has been cached it will be
available for you to access immediately. Note that torrents are
typically not seeded permanently using a Debrid Service.
</p>
<h2 class="header2">
Summary
</h2>
<ol class="list-numbered">
<li>A torrent client is needed to connect to a torrent swarm</li>
<li>A VPN may be needed to connect without issue, depending on location</li>
<li>If a VPN is needed, bind your client to use the VPN network</li>
<li>It is recommended to use a VPN provider that allows for port forwarding</li>
<li>It is not recommended to use a free VPN</li>
</ol>
<h2 class="header2">
Recommendations
</h2>
<h3 class="header3">
Torrent Clients
</h3>
<ListBullet links={data.clients} />
<h3 class="header3">
VPN Providers
</h3>
<ListBullet links={data.vpn} />
<h3 class="header3">
Seedboxes
</h3>
<ListBullet links={data.seedbox} />
<h3 class="header3">
Debrid Services
</h3>
<ListBullet links={data.debrid} />
</div>
