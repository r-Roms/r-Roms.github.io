import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive } from "$lib/data/sites.js";

const header: string = "SNK Neo Geo & Neo Geo CD"
const EmulatorPath: string = "Neo_Geo_and_variants#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "NeoGeo CD - CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/ngcd-chd-zstd-redump/ngcd-chd-zstd/"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/ngcd-chd-zstd-redump/ngcd-chd-zstd/"),
        ]
    },
    {
        title: "NeoGeo CD - BIN / CUE Format",
        downloads: [
            extendSite(InternetArchive, "download/snk_neo_geo"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/SNK%20-%20Neo%20Geo%20CD/"),
        ]
    },
    {
        title: "NeoGeo - MAME ZIP Format",
        downloads: [
            extendSite(InternetArchive, "download/NeoGeoRomCollectionByGhostware"),
        ],
        torrents: []
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".bin / .cue",
        recommended: false,
        notes: "Disc format for NeoGeo CD"
    },
    {
        extension: ".chd",
        recommended: true,
        notes: "Compressed disc format for NeoGeo CD"
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive used for MAME emulation"
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};