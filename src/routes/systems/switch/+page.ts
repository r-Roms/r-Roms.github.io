import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Nintendo Switch"
const EmulatorPath: string = "Nintendo_Switch_emulators#Emulators"

const fileTypes: FileType[] = [
    {   extension: ".nsp", recommended: true,
        notes: "Installable eShop format that may bundle DLC & updates."
    },
    {   extension: ".xci", recommended: false,
        notes: "Cartridge dump format."
    },
    {   extension: ".nca", recommended: false,
        notes: "An individual piece of content, multiple bundled together " +
        "form an .nsp or .xci file."
    }
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, fileTypes};
};