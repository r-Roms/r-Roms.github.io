import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, LolROMs } from "$lib/data/sites.js";

const header: string = "Apple / Bandai Pippin"
const EmulatorPath: string = "Apple_Pippin#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "BIN / CUE Format",
        downloads: [
            extendSite(LolROMs, "Apple/PiPP!N/Discs%20%28BIN%29"),
            extendSite(InternetArchive, "download/bandai_pippin"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Bandai%20-%20Pippin/"),
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