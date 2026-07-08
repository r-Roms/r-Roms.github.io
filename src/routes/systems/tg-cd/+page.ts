import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "NEC PC Engine CD / TurboGrafx CD"
const EmulatorPath: string = "TurboGrafx_CD_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/pcecd-chd-zstd-redump", "Archive"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/pcecd-chd-zstd-redump/pcecd-chd-zstd/", "Minerva"),
        ]
    }, 
    {
        title: "BIN / CUE Format",
        downloads: [
            extendSite(Vimm, "vault/TGCD"),
            extendSite(LolROMs, "NEC/PC-Engine%20CD/Discs%20%28BIN%29"),
            extendSite(InternetArchive, "download/nec_pc-engine-cd_turbografx-cd"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/NEC%20-%20PC%20Engine%20CD%20&%20TurboGrafx%20CD/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {   extension: ".bin / .cue", recommended: false,
        notes: "Standard disk image format."
    },
    {   extension: ".chd",
        recommended: true,
        notes: "Compressed disk image format."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};