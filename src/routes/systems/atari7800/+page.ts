import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Atari 7800"
const EmulatorPath: string = "Atari_7800_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Games",
        downloads: [
            extendSite(Vimm, "vault/Atari7800"),
            extendSite(LolROMs, "Atari/7800"),
            extendSite(InternetArchive, "download/ni-roms/roms/Atari%20-%207800.zip/"),
            extendSite(InternetArchive, "download/nointro.atari-7800"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Atari%20-%207800/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".a78",
        recommended: false,
        notes: "Standard Atari 7800 ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .a78 file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};