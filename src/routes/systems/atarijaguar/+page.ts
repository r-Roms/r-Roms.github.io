import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Atari Jaguar"
const EmulatorPath: string = "Atari_Jaguar_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Jaguar - J64 Format",
        downloads: [
            extendSite(Vimm, "vault/Jaguar"),
            extendSite(LolROMs, "Atari/Jaguar/J64"),
        ],
        torrents: []
    },
    {
        title: "Jaguar CD - CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/jagcd-chd-zstd/jagcd-chd-zstd/"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/jagcd-chd-zstd/jagcd-chd-zstd/"),
        ]
    },
    {
        title: "Jaguar CD - BIN / CUE Format",
        downloads: [
            extendSite(Vimm, "vault/JaguarCD"),
            extendSite(LolROMs, "Atari/Jaguar%20CD/Discs%20%28BIN%29"),
            extendSite(InternetArchive, "download/atari_jaguar-cd"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Atari%20-%20Jaguar%20CD%20Interactive%20Multimedia%20System/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".j64",
        recommended: false,
        notes: "Standard Jaguar ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .j64 file."
    },
    {
        extension: ".bin / .cue",
        recommended: false,
        notes: "Standard disc image format for Jaguar CD."
    },
    {
        extension: ".cdi",
        recommended: false,
        notes: "Disc image format for Jaguar CD."
    },
    {
        extension: ".chd",
        recommended: true,
        notes: "Compressed disc format for Jaguar CD."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};