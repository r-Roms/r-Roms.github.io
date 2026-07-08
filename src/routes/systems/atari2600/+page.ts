import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs, ROMsTime } from "$lib/data/sites.js";

const header: string = "Atari 2600"
const EmulatorPath: string = "Atari_2600_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Games",
        downloads: [
            extendSite(Vimm, "vault/Atari2600"),
            extendSite(LolROMs, "Atari/2600"),
            extendSite(ROMsTime, "roms?platform=atari-2600"),
            extendSite(InternetArchive, "download/ni-roms/roms/Atari%20-%202600.zip/"),
            extendSite(InternetArchive, "download/nointro.atari-2600"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Atari%20-%202600/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".a26",
        recommended: false,
        notes: "Standard Atari 2600 ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .a26 file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};