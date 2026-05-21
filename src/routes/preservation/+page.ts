import type { PageLoad } from "./$types.js";
import type { Link } from "$lib/types.js";

const databases: Link[] = [
    {
        name: "No-Intro",
        url: "https://no-intro.org",
        description: "Catalogs accurate file hashes for flash media"
    },
    {
        name: "Redump",
        url: "http://redump.org",
        description: "Catalogs accurate file hashes for optical media"
    },
    {
        name: "TOSEC",
        url: "https://www.tosecdev.org",
        description: "Catalogs accurate file hashes for flash media " +
        "(TOSEC), optical media (TOSEC-ISO), and auxiliary resources " +
        "(TOSEC-PIX)"
    },
    {
        name: "Hasheous",
        url: "https://hasheous.org",
        description: "Catalogs ROM hashes and matches those hashes with " +
        "metadata providers"
    },
    {
        name: "IGDB",
        url: "https://www.igdb.com",
        description: "Metadata and media for games"
    },
    {
        name: "Screenscraper",
        url: "https://www.screenscraper.fr",
        description: "Visual (Image & Video) media"
    },
    {
        name: "RetroAchievements",
        url: "https://retroachievements.org",
        description: "Retro game achievements"
    },
    {
        name: "SteamGridDB",
        url: "https://www.steamgriddb.com",
        description: "Images for front-end presentation"
    },
    {
        name: "HowLongToBeat",
        url: "https://howlongtobeat.com",
        description: "Game & playtime tracking"
    },
]

const hashers: Link[] = [
    {
        name: "emn178's Online Tools",
        url: "https://emn178.github.io/online-tools/md5_checksum.html",
    },
]
export const load: PageLoad = () => {    
    return { databases, hashers };
};