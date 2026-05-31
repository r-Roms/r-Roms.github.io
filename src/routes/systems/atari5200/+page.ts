import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Atari 5200"
const EmulatorPath: string = "Atari_5200_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Games",
        downloads: [
            extendSite(Vimm, "vault/Atari5200"),
            extendSite(LolROMs, "Atari/5200"),
            extendSite(InternetArchive, "download/ni-roms/roms/Atari%20-%205200.zip/"),
            extendSite(InternetArchive, "download/nointro.atari-5200"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Atari%20-%205200/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".a52",
        recommended: false,
        notes: "Standard Atari 5200 ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .a52 file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};