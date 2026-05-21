import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Nintendo Game Boy Advance"
const EmulatorPath: string = "Game_Boy_Advance_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Games",
        downloads: [
            extendSite(Vimm, "vault/GBA"),
            extendSite(LolROMs, "Nintendo/Game%20Boy%20Advance"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Game%20Boy%20Advance")
        ]
    },
    {
        title: "Multiboot",
        downloads: [
            extendSite(LolROMs, "Nintendo/Game%20Boy%20Advance%20%28Multiboot%29"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Game%20Boy%20Advance%20(Multiboot)/")
        ]
    },
    {
        title: "Video",
        downloads: [
            extendSite(LolROMs, "Nintendo/Game%20Boy%20Advance%20%28Video%29"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Game%20Boy%20Advance%20(Video)/"),
        ]
    },
    {
        title: "e-Reader",
        downloads: [
            extendSite(LolROMs, "Nintendo/e-Reader"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Game%20Boy%20Advance%20(e-Reader)/")
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".gba",
        recommended: false,
        notes: "Standard GBA ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .gba file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes};
};