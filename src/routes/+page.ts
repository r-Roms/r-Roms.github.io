import type { PageLoad } from "./$types.js";
import { type Link } from "$lib/types.js";
import { resolve } from "$app/paths";
import { DOWNLOADS, TORRENTS, SYSTEMS, SETS, PATCHING, TYPES, PRESERVE, OTHER} from "$lib/data/siteparts.js";

let pagetitle = "/r/ROMs Megathread Site"
const links: Link[] = [
    { name: SYSTEMS.name, url: SYSTEMS.url, description: "Links to console & system specific pages" },
    { name: DOWNLOADS.name, url: DOWNLOADS.url, description: "Links & information for downloading files" },
    { name: TORRENTS.name, url: TORRENTS.url, description: "Links & information for torrenting files" },
    { name: PATCHING.name, url: PATCHING.url, description: "Information on patching ROMs and ROM hacks" },
    { name: SETS.name, url: SETS.url, description: "Links for larger file collections" },
    { name: TYPES.name, url: TYPES.url, description: "Information for important file types" },
    { name: PRESERVE.name, url: PRESERVE.url, description: "Information for reference databases and file verification" },
    { name: OTHER.name, url: OTHER.url, description: "Miscellaneous information" },
]

export const load: PageLoad = () => {    
    return { links, pagetitle };
};