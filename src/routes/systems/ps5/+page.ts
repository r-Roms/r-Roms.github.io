import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { } from "$lib/data/sites.js";

const header: string = "Sony Playstation 5"
const EmulatorPath: string = "PlayStation_5_emulators#Emulators_and_Compatibility_layers"

const fileTypes: FileType[] = [
    {   extension: ".pkg", recommended: true,
        notes: "Installable format for digital content."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, fileTypes};
};