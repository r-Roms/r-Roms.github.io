import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Sega Master System"
const EmulatorPath: string = "Master_System/Game_Gear_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "SMS Format",
        downloads: [
            extendSite(LolROMs, "SEGA/Master%20System%20-%20Mark%20III"),
            extendSite(Vimm, "vault/SMS"),
            extendSite(InternetArchive, "download/ni-roms/roms/Sega%20-%20Master%20System%20-%20Mark%20III.zip/"),
            extendSite(InternetArchive, "download/nointro.ms-mkiii"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Sega%20-%20Master%20System%20-%20Mark%20III/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".sms",
        recommended: false,
        notes: "Standard Master System ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .sms file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes};
};