import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Nintendo Gamecube"
const EmulatorPath: string = "Nintendo_GameCube_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "Redump RVZ",
        downloads: [
            extendSite(Vimm, "vault/GameCube"),
            extendSite(LolROMs, "Nintendo/GameCube"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Nintendo%20-%20GameCube%20-%20NKit%20RVZ%20[zstd-19-128k]/")]
    },
    {
        title: "Redump ISO USA",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/Unknown/RedumpNintendoGameCubeAmerica/", "Minerva Part 1"),
            extendSite(Minerva, "browse/Internet%20Archive/Unknown/RedumpNintendoGameCubeAmericaPart2/", "Minerva Part 2"),
            extendSite(Minerva, "browse/Internet%20Archive/Unknown/RedumpNintendoGameCubeAmericaPart3/", "Minerva Part 3"),
        ]
    },
    {
        title: "Redump ISO",
        downloads: [
            extendSite(InternetArchive, "download/NCubeJ", "Internet Archive (JPN)"),
            extendSite(InternetArchive, "download/AsiaGamecubeCollectionByGhostware", "Internet Archive (Asia)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/pixelspoil/NCubeJ/", "Minerva (JPN)"),
            extendSite(Minerva, "browse/Internet%20Archive/kodi_amp_spmc_canada/EuropeanGamecubeCollectionByGhostware", "Minerva (EU)"),
            extendSite(Minerva, "browse/Internet%20Archive/kodi_amp_spmc_canada/AustraliaGamecubeCollectionByGhostware/", "Minerva (AUS)"),
            extendSite(Minerva, "browse/Internet%20Archive/kodi_amp_spmc_canada/AsiaGamecubeCollectionByGhostware/", "Minerva (Asia)"),
        ]
    },
    {
        title: "Other RVZ",
        downloads: [
            extendSite(InternetArchive, "details/CentralArquivista-NintendoGameCube-US")
        ],
        torrents: []
    },
];

const fileTypes: FileType[] = [
    {   extension: ".iso", recommended: false,
        notes: "Standard disc image format"
    },
    {   extension: ".rvz", recommended: true,
        notes: "Compressed format for Dolphin Emulator only"
    },
    {   extension: ".ciso", recommended: false,
        notes: "Lossy compression"
    },
    {   extension: ".gcz",  recommended: false, notes: "Compressed" },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};