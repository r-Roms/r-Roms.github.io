import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs, ROMsTime } from "$lib/data/sites.js";

const header: string = "Nintendo DS"
const EmulatorPath: string = "Nintendo_DS_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Nintendo DS (Decrypted)",
        downloads: [
            extendSite(Vimm, "vault/DS"),
            extendSite(LolROMs, "Nintendo/DS"),
            extendSite(ROMsTime, "roms?platform=nintendo-ds"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%20DS%20(Decrypted)/")
        ]
    },
    {
        title: "Nintendo DS (Encrypted)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%20DS%20(Encrypted)/")
        ]
    },
    {
        title: "Nintendo DSi (Decrypted)",
        downloads: [
            extendSite(LolROMs, "Nintendo/DS/DSi"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%20DSi%20(Decrypted)/"),
        ]
    },
    {
        title: "Nintendo DSi (Encrypted)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%20DSi%20(Encrypted)/")
        ]
    },
    {
        title: "DSiWare",
        downloads: [
            extendSite(InternetArchive, "download/MarioCubeLite/DSiWare/"),
            {name: "MarioCube",url: "https://repo.mariocube.com/DSiWare/"},
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%20DSi%20(Digital)/")
        ]
    },
    {
        title: "Anti-Piracy Fixed ROMs",
        downloads: [
            extendSite(InternetArchive, "download/nds_apfix/apfix/"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/nds_apfix/apfix/")
        ]
    },
    {
        title: "Download Play",
        downloads: [
            extendSite(InternetArchive, "download/No-Intro-nintendo-nintendo-ds-download-play_202207"),
            extendSite(LolROMs, "Nintendo/DS/Download%20Play"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%20DS%20(Download%20Play)/")
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".nds",
        recommended: false,
        notes: "Standard DS ROM file"
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive — .zip must contain .nds file, may not be supported on all emulators"
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};