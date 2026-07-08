import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Nintendo Wii"
const EmulatorPath: string = "Wii_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Redump RVZ",
        downloads: [
            extendSite(Vimm, "vault/Wii"),
            extendSite(LolROMs, "Nintendo/Wii"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Nintendo%20-%20Wii%20-%20NKit%20RVZ%20[zstd-19-128k]/")]
    },
    {
        title: "WBFS",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/kodi_amp_spmc_canada/WiiRomSetByGhostware/", "Minerva Part 1"),
            extendSite(Minerva, "browse/Internet%20Archive/kodi_amp_spmc_canada/WiiRomSetByGhostwarePart2/", "Minerva Part 2"),
            extendSite(Minerva, "browse/Internet%20Archive/kodi_amp_spmc_canada/WiiRomSetByGhostwarePart3/", "Minerva Part 3"),
        ]
    },
    {
        title: "WiiWare, VC, DLC, Channels & IOS",
        downloads: [
            { name: "MarioCube", url: "https://repo.mariocube.com/WADs/_WiiWare%2C%20VC%2C%20DLC%2C%20Channels%20%26%20IOS/" },
            extendSite(InternetArchive, "download/MarioCubeLite/WADs/_WiiWare%2C%20VC%2C%20DLC%2C%20Channels%20%26%20IOS/"),
        ],
        torrents: []
    },
    {
        title: "NKit Fully Loaded (Recovery)",
        downloads: [
            extendSite(InternetArchive, "download/NKitFullyLoaded2020429")
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/bingbong294/NKitFullyLoaded2020429/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {   extension: ".iso", recommended: false,
        notes: "Standard disc image format"
    },
    {   extension: ".rvz", recommended: true,
        notes: "Compressed format for Dolphin Emulator only"
    },
    {   extension: ".wbfs", recommended: true,
        notes: "Lossy compression, playable on real hardware"
    },
    {   extension: ".ciso", recommended: false,
        notes: "Lossy compression"
    },
    {   extension: ".wia", recommended: false, notes: "Compressed" },
    {   extension: ".wad", recommended: false,
        notes: "Apps installed to NAND"
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};