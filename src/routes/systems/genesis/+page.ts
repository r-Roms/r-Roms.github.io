import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs, ROMsTime } from "$lib/data/sites.js";

const header: string = "Sega Genesis"
const EmulatorPath: string = "Sega_Genesis_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "MD Format",
        downloads: [
            extendSite(Vimm, "vault/Genesis"),
            extendSite(LolROMs, "SEGA/Mega%20Drive%20-%20Genesis"),
            extendSite(ROMsTime, "roms?platform=sega-genesis"),
            extendSite(InternetArchive, "download/nointro.md"),
            extendSite(InternetArchive, "download/ni-roms/roms/Sega%20-%20Mega%20Drive%20-%20Genesis.zip/"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Sega%20-%20Mega%20Drive%20-%20Genesis/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".md",
        recommended: false,
        notes: "Base Genesis cartridge file, may also use .gen or " +
        "generic .bin extension."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Archive file - must contain .md file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};