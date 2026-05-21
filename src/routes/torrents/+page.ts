import type { PageLoad } from "./$types.js";
import type { Link } from "$lib/types.js";

const sites: Link[] = [
    {
        name: "Free Media Heck Yeah",
        url: "https://fmhy.net/gaming#rom-sites",
        description: "A large collection of sites related to acquiring " +
        "free media of all types."
    },
    {
        name: "Minerva Archive",
        url: "https://minerva-archive.org",
        description: "Torrents are provided as large collections. " +
        "Your client should be able to select specific files to " +
        "download.<br>" +
        "<a href='https://discord.com/invite/MiNERVA-archive' " +
        "class='link'>Discord</a><br>" +
        "<a href='https://cdn.minerva-archive.org/torrents/' " +
        "class='link'>Torrent Index</a>"
    }
]

const clients: Link[] = [
    {
        name: "qBittorrent",
        url: "https://www.qbittorrent.org",
        description: "Windows, MacOS, Linux"
    },
    {
        name: "LibreTorrent",
        url: "https://gitlab.com/proninyaroslav/libretorrent",
        description: "Android"
    }
]

const vpn: Link[] = [
    { name: "AirVPN", url: "https://airvpn.org" },
    { name: "Windscribe", url: "https://windscribe.net" },
    { name: "ProtonVPN", url: "https://protonvpn.com" },
]

const seedbox: Link[] = [
    { name: "Seedr", url: "https://www.seedr.cc" },
    { name: "Webtor", url: "https://webtor.io" },
]

const debrid: Link[] = [
    { name: "Torbox", url: "https://torbox.app" },
]

export const load: PageLoad = () => {    
    return { sites, clients, vpn, seedbox, debrid};
};