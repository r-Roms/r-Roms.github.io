import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, LolROMs } from "$lib/data/sites.js";

const header: string = "NEC PC-98 Series"
const EmulatorPath: string = "PC-98_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "BIN / CUE Format",
        downloads: [
            extendSite(LolROMs, "NEC/PC98/Discs%20%28BIN%29"),
            extendSite(InternetArchive, "download/nec_pc-98_series"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/NEC%20-%20PC-98%20series/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".bin / .cue",
        recommended: false,
        notes: "Standard disc image format."
    },
    {
        extension: ".chd",
        recommended: true,
        notes: "Compressed disc format."
    },
    {
        extension: ".d98",
        recommended: true,
        notes: "Floppy disc format."
    },
    {
        extension: ".d88",
        recommended: false,
        notes: "Floppy disc format."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};