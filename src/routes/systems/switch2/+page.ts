import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { } from "$lib/data/sites.js";

const header: string = "Nintendo Switch 2"
const EmulatorPath: string = "Nintendo_Switch_2_emulators#Emulators"

export const load: PageLoad = () => {    
    return { header, EmulatorPath };
};