import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Atari 2600"
const EmulatorPath: string = "Atari_2600_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Games",
        downloads: [
            { name: "Lexeloffle BBS", url: "https://www.lexaloffle.com/bbs/?cat=7&carts_tab=1#mode=carts&sub=2" }
        ],
        torrents: []
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".p8.png",
        recommended: true,
        notes: "Standard Pico-8 ROM file. ROMs are .png files with an image of the game's cartridge"
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};