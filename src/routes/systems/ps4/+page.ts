import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Sony Playstation 4"
const EmulatorPath: string = "PlayStation_4_emulators#Emulators_and_compatibility_layers"

const fileTypes: FileType[] = [
    {   extension: ".pkg", recommended: true,
        notes: "Installable format for digital content."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, fileTypes};
};