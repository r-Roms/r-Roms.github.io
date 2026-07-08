import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive } from "$lib/data/sites.js";

const header: string = "NEC PC-FX & PC-FXGA"
const EmulatorPath: string = "PC-FX_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/chip-chan-kick-jp"),
        ],
        torrents: []
    },
    {
        title: "BIN / CUE Format",
        downloads: [
            extendSite(InternetArchive, "download/nec_pc-fxpc_fxga"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/NEC%20-%20PC-FX%20&%20PC-FXGA/"),
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
]

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};