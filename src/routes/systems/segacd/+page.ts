import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Sega CD"
const EmulatorPath: string = "Sega_Genesis_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "details/scd-chd-zstd-redump"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_segacd/CHD-SegaCD-NTSC/", "Minerva (NTSC)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_segacd/CHD-MegaCD-PAL/", "Minerva (PAL)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_segacd/CHD-MegaCD-NTSCJ/", "Minerva (NTSC-J)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_segacd/CHD-SegaCD-Bonus/", "Minerva (Bonus)"),
        ]
    },
    {
        title: "BIN/CUE Format",
        downloads: [
            extendSite(Vimm, "vault/SegaCD"),
            extendSite(LolROMs, "SEGA/Sega%20CD%20-%20Mega-CD/Discs%20%28BIN%29"),
            
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Sega%20-%20Mega%20CD%20%26%20Sega%20CD/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".iso",
        recommended: false,
        notes: "Standard disc image format."
    },
    {
        extension: ".chd",
        recommended: true,
        notes: "Compressed disc format."
    },
    {
        extension: ".bin / .cue",
        recommended: false,
        notes: "Standard disc image format."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};