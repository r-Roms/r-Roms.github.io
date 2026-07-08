import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs, ROMsTime } from "$lib/data/sites.js";

const header: string = "Sony PlayStation Portable"
const EmulatorPath: string = "PlayStation_Portable_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/psp-chd-zstd-redump-part1/psp-chd-zstd/", "Archive (Part 1)"),
            extendSite(InternetArchive, "download/psp-chd-zstd-redump-part2/psp-chd-zstd/", "Archive (Part 2)"),
            extendSite(ROMsTime, "roms?platform=playstation"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/psp-chd-zstd-redump-part1/psp-chd-zstd/", "Minerva (Part 1)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/psp-chd-zstd-redump-part2/psp-chd-zstd/", "Minerva (Part 2)"),
        ]
    },
    {
        title: "ISO Format",
        downloads: [
            extendSite(Vimm, "vault/PSP"),
            extendSite(LolROMs, "SONY/PlayStation%20Portable/Discs%20%28ISO%29"),
            extendSite(ROMsTime, "roms?platform=playstation"),
            extendSite(InternetArchive, "download/sony_playstation_portable_part1", "Archive (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation_portable_part2", "Archive (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation_portable_part3", "Archive (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation_portable_part4", "Archive (Part 4)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Sony%20-%20PlayStation%20Portable/"),
        ]
    },
    {
        title: "PBP Format",
        downloads: [
            extendSite(InternetArchive, "download/PSP_DLC", "Archive (DLC)"),
            extendSite(ROMsTime, "roms?platform=playstation"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/storage_manager/PSP-DLC/PSP%20DLC/", "Minerva (DLC)"),
            extendSite(Minerva, "browse/Internet%20Archive/storage_manager/PSP-DLC/%5BNo-Intro%5D%20PSP%20DLC/", "Minerva (DLC)"),
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
        extension: ".cso",
        recommended: false,
        notes: "Compressed disc image format."
    },
    {
        extension: ".zso",
        recommended: false,
        notes: "Improved compressed disc image format."
    },
    {
        extension: ".pbp",
        recommended: true,
        notes: "Official distribution format for digital games, updates, DLC."
    },
    {
        extension: ".chd",
        recommended: true,
        notes: "Compressed disc format."
    },
    
    
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};