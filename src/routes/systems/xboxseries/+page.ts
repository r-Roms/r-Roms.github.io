import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { } from "$lib/data/sites.js";

const header: string = "Xbox Series X/S"
const EmulatorPath: string = "Xbox_Series_X_and_Series_S#Emulators_and_compatibility_layers"

//const downloads: DownloadRow = [];

//const fileTypes: FileType[] = [];

export const load: PageLoad = () => {    
    return { header, EmulatorPath };
};