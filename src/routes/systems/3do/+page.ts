import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Panasonic 3DO Interactive Multiplayer"
const EmulatorPath: string = "3DO_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/3do-chd-zstd-redump/3do-chd-zstd/"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/3do-chd-zstd-redump/3do-chd-zstd/"),
        ]
    },
    {
        title: "BIN / CUE Format",
        downloads: [
            extendSite(LolROMs, "Panasonic%20-%203DO/Discs%20%28BIN%29"),
            extendSite(InternetArchive, "download/panasonic_3do_interactive_multiplayer"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Panasonic%20-%203DO%20Interactive%20Multiplayer/"),
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
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};