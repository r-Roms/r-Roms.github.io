import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm } from "$lib/data/sites.js";

const header: string = "Philips CD-i"
const EmulatorPath: string = "CD-i_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/philips-cd-i-1g1r-chd-perfect-collection", "Archive (1G1R)"),
        ],
        torrents: []
    },
    {
        title: "BIN / CUE Format",
        downloads: [
            extendSite(Vimm, "vault/CDi"),
            extendSite(InternetArchive, "download/philips_cd-i"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Philips%20-%20CD-i/"),
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
        extension: ".cdi",
        recommended: false,
        notes: "Disc image format."
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