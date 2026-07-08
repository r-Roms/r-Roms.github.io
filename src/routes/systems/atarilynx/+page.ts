import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Atari Lynx"
const EmulatorPath: string = "Atari_Lynx_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "LNX Format",
        downloads: [
            extendSite(LolROMs, "Atari/Lynx/LNX"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Atari%20-%20Atari%20Lynx%20(LNX)/"),
        ]
    },
    {
        title: "LYX Format",
        downloads: [
            extendSite(Vimm, "vault/Lynx"),
            extendSite(LolROMs, "Atari/Lynx/LYX"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Atari%20-%20Atari%20Lynx%20(LYX)/"),
        ]
    }
];

const fileTypes: FileType[] = [
    {
        extension: ".lnx",
        recommended: false,
        notes: "Headered Lynx ROM file for emulation."
    },
    {
        extension: ".lyx",
        recommended: false,
        notes: "Canonical headerless Lynx ROM file. Official games in this" + 
        "format should be able to be emulated."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .lnx/.lyx file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};