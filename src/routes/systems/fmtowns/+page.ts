import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, LolROMs } from "$lib/data/sites.js";

const header: string = "Fujitsu FM-Towns"
const EmulatorPath: string = "FM_Towns_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/FMTCDCHD-Arquivista"),
        ],
        torrents: []
    },
    {
        title: "BIN / CUE Format",
        downloads: [
            extendSite(LolROMs, "Fujitsu/FM%20Towns/Discs%20%28BIN%29"),
            extendSite(InternetArchive, "download/fujitsu_fm_towns_series"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Fujitsu%20-%20FM-Towns/"),
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
        extension: ".d88",
        recommended: true,
        notes: "Floppy disc format."
    },
    {
        extension: ".d77",
        recommended: false,
        notes: "Floppy disc format."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};