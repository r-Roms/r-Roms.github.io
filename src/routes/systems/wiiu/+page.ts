import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Nintendo Wii U"
const EmulatorPath: string = "Wii_U_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "WUA Format (USA) (Embedded DLC & Updates)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/teamgt19/nintendo-wii-u-usa-full-set-wua-format-embedded-dlc-updates/", "Minerva (Disc)"),
            extendSite(Minerva, "browse/Internet%20Archive/teamgt19/nintendo-wii-u-eshop-usa-full-set-wua-format-embedded-dlc-updates/", "Minerva (eShop)"),
        ]
    },
    {
        title: "WUX Format",
        downloads: [
            extendSite(LolROMs, "Nintendo/Wii%20U"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Nintendo%20-%20Wii%20U%20-%20WUX/"),
        ]
    },
    {
        title: "Digital CDN",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/"),
        ]
    },
    {
        title: "WUP Format (Emulator)",
        downloads: [
            {name: "Wii U Downloader", url: "https://github.com/Xpl0itU/WiiUDownloader"},
        ],
        torrents: []
    },
    {
        title: "WUP/app Format (Console)",
        downloads: [
            {name: "Wii U Downloader", url: "https://github.com/Xpl0itU/WiiUDownloader"},
            extendSite(InternetArchive, "download/wii-u-retail-nus-usa", "Archive (Retail)"),
            extendSite(InternetArchive, "download/wii-u-retail-game-disc-nus-usa", "Archive (Retail Disc)"),
            extendSite(InternetArchive, "download/wii-u-turbografx16-nus", "Archive (TurboGrafx-16)"),
            extendSite(InternetArchive, "download/wii-u-nes-fc-nus", "Archive (NES & Famicom)"),
            extendSite(InternetArchive, "download/wii-u-super-nintendo-snes-nus", "Archive (SNES)"),
            extendSite(InternetArchive, "download/wii-u-nintendo-64-nus", "Archive (N64)"),
            extendSite(InternetArchive, "download/wii-u-wii-nus", "Archive (Wii)"),
            extendSite(InternetArchive, "download/wii-u-gameboy-advance-nus", "Archive (GBA)"),
            extendSite(InternetArchive, "download/wii-u-nintendo-ds-nds-nus", "Archive (DS)"),

        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-retail-nus-usa/", "Minerva (Retail)"),
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-retail-game-disc-nus-usa/", "Minerva (Retail Disc)"),
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-download-nus-usa/", "Minerva (Download)"),
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-turbografx16-nus/", "Minerva (TurboGrafx-16)"),
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-nes-fc-nus/", "Minerva (NES & Famicom)"),
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-super-nintendo-snes-nus/", "Minerva (SNES)"),
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-nintendo-64-nus/", "Minerva (N64)"),
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-wii-nus/", "Minerva (Wii)"),
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-gameboy-advance-nus/", "Minerva (GBA)"),
            extendSite(Minerva, "browse/Internet%20Archive/archiver_2020/wii-u-nintendo-ds-nds-nus/", "Minerva (DS)"),
        ]
    },
];

const fileTypes: FileType[] = [
    {   extension: ".wud", recommended: false,
        notes: "Identical to ISOs, encrypted for Wii U or emulator with disc key."
    },
    {   extension: ".wux", recommended: false,
        notes: "Compressed WUD file for emulators, encrypted for Wii U or emulator with disc key."
    },
    {   extension: ".wua", recommended: true,
        notes: "Compressed, bundling updates & DLC for emulators."
    },
    {   extension: "WUP", recommended: true,
        notes: "A directory of .app files, encrypted and installable on Wii U."
    },
    {   extension: "WUP", recommended: true,
        notes: "A directory of files installable on emulator"
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};