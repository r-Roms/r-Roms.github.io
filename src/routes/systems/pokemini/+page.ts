import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Nintendo Pokémon Mini"
const EmulatorPath: string = "Pokémon_Mini_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Games",
        downloads: [
            extendSite(LolROMs, "Nintendo/Pokémon%20Mini"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Pokemon%20Mini/")
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".min",
        recommended: false,
        notes: "Standard ROM file."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — must contain .min file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes};
};