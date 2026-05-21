import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Super Nintendo Entertainment System / Super Famicom"
const EmulatorPath: string = "Super_Nintendo_Entertainment_System_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Games",
        downloads: [
            extendSite(Vimm, "vault/SNES"),
            extendSite(LolROMs, "Nintendo/Super%20Nintendo%20Entertainment%20System"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/")
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".sfc",
        recommended: false,
        notes: "Canonical headerless SNES / SFC format."
    },
    {
        extension: ".smc",
        recommended: false,
        notes: "Headered SNES / SFC format."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive which must contain rom file. .sfc is recommended."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes};
};