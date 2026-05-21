import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Nintendo Virtual Boy"
const EmulatorPath: string = "Virtual_Boy_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Games",
        downloads: [
            extendSite(Vimm, "vault/VB"),
            extendSite(LolROMs, "Nintendo/Virtual%20Boy"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Virtual%20Boy/")
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".vb",
        recommended: false,
        notes: "Standard ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — must contain .vb file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes};
};