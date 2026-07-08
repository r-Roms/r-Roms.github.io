import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Sega 32X"
const EmulatorPath: string = "Sega_Genesis_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "32X Format",
        downloads: [
            extendSite(LolROMs, "SEGA/32X"),
            extendSite(Vimm, "vault/32X"),
            extendSite(InternetArchive, "download/ni-roms/roms/Sega%20-%2032X.zip/"),
            extendSite(InternetArchive, "download/nointro.32x"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Sega%20-%2032X/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".32x",
        recommended: false,
        notes: "Sega 32X cartridge file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Archive file - must contain .32x file. "
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};