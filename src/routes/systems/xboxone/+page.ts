import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { } from "$lib/data/sites.js";

const header: string = "Xbox One"
const EmulatorPath: string = "Xbox_One_emulators#Emulators_and_compatibility_layers"

export const load: PageLoad = () => {    
    return { header, EmulatorPath };
};