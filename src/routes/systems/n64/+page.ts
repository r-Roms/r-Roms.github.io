import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Nintendo 64"
const EmulatorPath: string = "Nintendo_64_emulators#Comparison"

const downloads: DownloadRow[] = [
    {
        title: "Z64 Big Endian",
        downloads: [
            extendSite(Vimm, "vault/N64"),
            extendSite(LolROMs, "Nintendo/Nintendo%2064"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%2064%20(BigEndian)/")
        ]
    },
    {
        title: "V64 Byte Swapped",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%2064%20(ByteSwapped)/"),
        ]
    },
    {
        title: "64DD",
        downloads: [
            extendSite(LolROMs, "intendo/Nintendo%2064DD"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%2064DD/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".z64",
        recommended: false,
        notes: "Canonical Big Endian format."
    },
    {
        extension: ".v64",
        recommended: false,
        notes: "Byte Swapped format."
    },
        {
        extension: ".n64",
        recommended: false,
        notes: "Little Endian format."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .n64/v64/z64 file - .z64 is recommended."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes};
};