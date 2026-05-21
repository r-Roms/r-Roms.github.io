import type { PageLoad } from "./$types.js";
import type { Link } from "$lib/types.js";

import * as Sites from "$lib/data/sites.js";

const sites: Link[] = [
    Sites.FMHY,
    Sites.Vimm,
    Sites.InternetArchive,
    Sites.hShop,
    Sites.LolROMs,
    Sites.EdgeEmulation,
    Sites.StartGame,
    Sites.NoPayStation,
];
const managers: Link[] = [
    { name: "AB Download Manager", url: "https://abdownloadmanager.com" },
    { name: "JDownloader2", url: "https://jdownloader.org/jdownloader2" },
];

export const load: PageLoad = () => {    
    return { sites, managers };
};