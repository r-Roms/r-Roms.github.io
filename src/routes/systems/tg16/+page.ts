import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "NEC PC Engine / TurboGrafx-16"
const EmulatorPath: string = "TurboGrafx-16_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "PCE Format",
        downloads: [
            extendSite(Vimm, "vault/TG16"),
            extendSite(LolROMs, "NEC/PC-Engine/TurboGrafx-16"),
            extendSite(InternetArchive, "download/ni-roms/roms/NEC%20-%20PC%20Engine%20-%20TurboGrafx-16.zip/", "Archive (ZIP)"),
            extendSite(InternetArchive, "download/nointro.tg-16", "Archive (7ZIP)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/NEC%20-%20PC%20Engine%20-%20TurboGrafx-16/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {   extension: ".pce", recommended: false,
        notes: "Standard disc image format."
    },
    {   extension: ".zip", recommended: true,
        notes: "Compressed archive which must contain .pce file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};