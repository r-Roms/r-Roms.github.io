import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs, ROMsTime } from "$lib/data/sites.js";

const header: string = "Nintendo Game Boy"
const EmulatorPath: string = "Game_Boy_(Color)_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Game Boy",
        downloads: [
            extendSite(Vimm, "vault/GB"),
            extendSite(LolROMs, "Nintendo/Game%20Boy"),
            extendSite(ROMsTime, "roms?platform=game-boy"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Game%20Boy")
        ]
    },
    {
        title: "Game Boy Color",
        downloads: [
            extendSite(Vimm, "vault/GBC"),
            extendSite(LolROMs, "Nintendo/Game%20Boy%20Color"),
            extendSite(ROMsTime, "roms?platform=game-boy-color"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Game%20Boy%20Color/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".gb",
        recommended: false,
        notes: "Standard GB ROM file."
    },
    {
        extension: ".gbc",
        recommended: false,
        notes: "Standard GBC ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .gb / .gbc file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes};
};