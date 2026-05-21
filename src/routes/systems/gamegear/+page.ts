import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Sega Game Gear"
const EmulatorPath: string = "Master_System/Game_Gear_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "GG Format",
        downloads: [
            extendSite(LolROMs, "SEGA/Game%20Gear"),
            extendSite(Vimm, "vault/GG"),
            extendSite(InternetArchive, "download/ni-roms/roms/Sega%20-%20Game%20Gear.zip/"),
            extendSite(InternetArchive, "download/nointro.gg"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Sega%20-%20Game%20Gear/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".gg",
        recommended: false,
        notes: "Standard Game Gear ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .gg file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes};
};