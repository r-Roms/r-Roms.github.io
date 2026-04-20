<script lang="ts">
    import { base } from "$app/paths";
    import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from "$lib/components/ui/table/index.js";
</script>

<!-- Home page for the ROMs megathread -->
<div class="page-container">
    <h1 class="header1">
        Torrents
    </h1>
    <p class="text">
        This page provides general resources related to downloading files
        via torrent. This will require manual setup by the user to
        download and seed files.
    </p>
    <h2 class="header2">
        Sites
    </h2>
    <div class="table-container">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Website</TableHead>
                    <TableHead>Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://fmhy.net/gaming#rom-sites"
                            class="link"
                            >FMHY</a
                        >                        
                    </TableCell>
                    <TableCell>
                        A large collection of sites related to acquiring free media of all types.
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://minerva-archive.org"
                            class="link"
                            >Minerva</a
                        >
                    </TableCell>
                    <TableCell>
                        A torrent-based mirror of the original Myrient archive.
                        Torrents are provided as larger collections. Your
                        client should be capable of individually selecting
                        files to download.<br>
                        <a
                            href="https://discord.com/invite/MiNERVA-archive"
                            class="link"
                            >Discord</a
                        ><br>
                        <a
                            href="https://cdn.minerva-archive.org/torrents/"
                            class="link"
                            >Minerva Torrent Index</a
                        >  
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
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
    <p class="text-emphasis">
        VPNs help prevent a copyright holder from logging your public IP
        Address when accessing the torrent swarm and notifying your Internet
        Service Provider (ISP). In the United States, this is known as a DMCA
        Strike. The severity of the repercussions for a single or multiple are
        dependent on your country.
    </p>
    <h3 class="header3">
        Considerations
    </h3>
    <p class="text-emphasis">
        There is no recommended free VPN Provider. You should always pay for
        one if needed.
    </p>
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
    <h2 class="header2">
        Seedboxes
    </h2>
    <p class="text">
        Seedboxes are remote servers that provide high-bandwidth connections
        and storage. They provide a web interface for a torrent client, and
        allow you to directly download files you have downloaded via torrent.
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
        <li>
            A torrent client is required to connect to a swarm for file transfer
        </li>
        <li>
            You may require a VPN to connect safely, depending on your location
        </li>
        <li>
            If you require a VPN, you must bind your client to use the VPN network
        </li>
        <li>
            It is recommended to use a VPN provider that allows for port forwarding
            and ensure it is setup correctly
        </li>
        <li>
            It is never recommended to use a free VPN.
        </li>
    </ol>
    <h2 class="header2">
        Recommendations
    </h2>
    <h3 class="header3">
        Torrent Clients
    </h3>
    <div class="table-container">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Supported Systems</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.qbittorrent.org"
                            class="link"
                            >qBittorrent</a
                        >                        
                    </TableCell>
                    <TableCell>
                        Windows, MacOS, Linux
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://gitlab.com/proninyaroslav/libretorrent"
                            class="link"
                            >LibreTorrent</a
                        >  
                    </TableCell>
                    <TableCell>
                        Android
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <h3 class="header3">
        VPN Providers
    </h3>
    <div class="table-container">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Supported Systems</TableHead>
                    <TableHead>Port Forwarding</TableHead>
                    <TableHead>Protocols</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://airvpn.org"
                            class="link"
                            >AirVPN</a
                        >                        
                    </TableCell>
                    <TableCell> Windows, Linux, MacOS, Android </TableCell>
                    <TableCell> Allowed </TableCell>
                    <TableCell> OpenVPN, Wireguard </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://windscribe.net"
                            class="link"
                            >Windscribe</a
                        >  
                    </TableCell>
                    <TableCell> Windows, Linux, MacOS, Android </TableCell>
                    <TableCell> Allowed </TableCell>
                    <TableCell> OpenVPN, Wireguard </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://protonvpn.com"
                            class="link"
                            >ProtonVPN</a
                        >  
                    </TableCell>
                    <TableCell> Windows, Linux, MacOS, Android </TableCell>
                    <TableCell> Allowed </TableCell>
                    <TableCell> OpenVPN, Wireguard </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <h3 class="header3">
        Seedboxes
    </h3>
    <div class="table-container">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://www.seedr.cc"
                            class="link"
                            >Seedr</a
                        >                        
                    </TableCell>
                    <TableCell>
                        TBD
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <h3 class="header3">
        Debrid Services
    </h3>
    <div class="table-container">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <a
                            href="https://torbox.app"
                            class="link"
                            >Torbox</a
                        >                        
                    </TableCell>
                    <TableCell>
                        TBD
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
