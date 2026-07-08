import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Sega Saturn"
const EmulatorPath: string = "Sega_Saturn_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/chd_saturn/CHD-Saturn/USA/", "Archive (USA)"),
            extendSite(InternetArchive, "download/chd_saturn/CHD-Saturn/Europe/", "Archive (Europe)"),
            extendSite(InternetArchive, "download/chd_saturn/CHD-Saturn/Japan/", "Archive (Japan)"),
            extendSite(InternetArchive, "download/chd_saturn/CHD-Saturn/Other-Regions/", "Archive (Other Regions)"),
            extendSite(InternetArchive, "download/chd_saturn/CHD-Saturn/Translations/", "Archive (Translations)"),
            extendSite(InternetArchive, "download/chd_saturn/CHD-Saturn/Improvements/", "Archive (Improvements)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_saturn/CHD-Saturn/USA/", "Minerva (USA)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_saturn/CHD-Saturn/Europe/", "Minerva (Europe)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_saturn/CHD-Saturn/Japan/", "Minerva (Japan)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_saturn/CHD-Saturn/Other-Regions/", "Minerva (Other Regions)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_saturn/CHD-Saturn/Translations/", "Minerva (Translations)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_saturn/CHD-Saturn/Improvements/", "Minerva (Improvements)"),
        ]
    },
    {
        title: "BIN/CUE Format",
        downloads: [
            extendSite(LolROMs, "SEGA/Saturn/Discs%20%28BIN%29"),
            extendSite(Vimm, "vault/Saturn"),
            extendSite(InternetArchive, "download/sega_saturn"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Sega%20-%20Saturn/"),
        ]
    },
];

const fileTypes: FileType[] = [
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