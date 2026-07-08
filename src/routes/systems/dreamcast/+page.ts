import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs, ROMsTime } from "$lib/data/sites.js";

const header: string = "Sega Dreamcast"
const EmulatorPath: string = "Dreamcast_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/dc-chd-zstd-redump/dc-chd-zstd/"),
            extendSite(ROMsTime, "roms?platform=sega-dreamcast"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/dc-chd-zstd-redump/dc-chd-zstd/"),
        ]
    },
    {
        title: "GDI Format",
        downloads: [
            extendSite(InternetArchive, "download/tosecdcus20190822", "Archive (USA)"),
            extendSite(InternetArchive, "download/18wheeleramericanprotruckerv1.7002001segapalm4", "Archive (EUR)"),
            extendSite(InternetArchive, "download/interludev1.0032003necinterchanneljp", "Archive (JAP)"),
            extendSite(InternetArchive, "download/almstcmpltdrmcst"),
            extendSite(InternetArchive, "download/DreamcastCollectionByGhostwareMulti-region"),
            extendSite(ROMsTime, "roms?platform=sega-dreamcast"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/cmpltromsets/almstcmpltdrmcst/"),
            extendSite(Minerva, "browse/Internet%20Archive/kodi_amp_spmc_canada/DreamcastCollectionByGhostwareMulti-region/"),
        ]
    },
    {
        title: "BIN/CUE Format",
        downloads: [
            extendSite(Vimm, "vault/Dreamcast"),
            extendSite(LolROMs, "SEGA/Dreamcast/Discs%20%28BIN%29"),
            extendSite(InternetArchive, "download/sega_dreamcast"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Sega%20-%20Dreamcast/"),
        ]
    },
    {
        title: "CDI Format",
        downloads: [
            extendSite(LolROMs, "SEGA/Dreamcast"),
        ],
        torrents: []
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".gdi",
        recommended: true,
        notes: "Standard Dreamcast disc image format."
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
    {
        extension: ".cdi",
        recommended: false,
        notes: "Compressed Dreamcast disc image format."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};