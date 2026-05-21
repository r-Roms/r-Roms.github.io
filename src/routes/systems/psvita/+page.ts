import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, NoPayStation } from "$lib/data/sites.js";

const header: string = "Sony PlayStation Vita"
const EmulatorPath: string = "PlayStation_Vita_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "PKG Format",
        downloads: [
            NoPayStation,
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Sony%20-%20PlayStation%20Vita%20(PSN)%20(Content)/", "Minerva (Content)"),
            extendSite(Minerva, "browse/No-Intro/Sony%20-%20PlayStation%20Vita%20(PSN)%20(Updates)/", "Minerva (Updates)"),

        ]
    },
    {
        title: "NoNpDrm Format",
        downloads: [
            extendSite(InternetArchive, "download/sony-playstation-vita-usa-full-set-nonpdrm-format", "Archive (Games)"),
            extendSite(InternetArchive, "download/sony-playstation-vita-usa-full-set-nonpdrm-format-dlc-updates", "Archive (DLC & Updates)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Unofficial%20-%20Sony%20-%20PlayStation%20Vita%20(NoNpDrm)/"),
            extendSite(Minerva, "browse/Internet%20Archive/teamgt19/sony-playstation-vita-usa-full-set-nonpdrm-format-dlc-updates/", "Minerva (DLC & Updates)"),
        ]
    },
    {
        title: "VPK Format for Homebrew",
        downloads: [
            extendSite(InternetArchive, "download/PSVITA_VPK"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Unofficial%20-%20Sony%20-%20PlayStation%20Vita%20(VPK)/"),
            extendSite(Minerva, "browse/No-Intro/Unofficial%20-%20Sony%20-%20PlayStation%20Vita%20(PSN)%20(Decrypted)%20(VPK)/", "Minerva (Decrypted) (PSN)"),
        ]
    },
    {
        title: "MaiDump Format (superseded by NoNpDrm)",
        downloads: [
            extendSite(InternetArchive, "download/PSVITA_MAIDUMP"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PSVITA_MAIDUMP/"),
        ]
    },
    {
        title: "PSV Format (Obsolete)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Unofficial%20-%20Sony%20-%20PlayStation%20Vita%20(PSVgameSD)/", "Minerva (PSVgameSD)"),
            extendSite(Minerva, "browse/No-Intro/Unofficial%20-%20Sony%20-%20PlayStation%20Vita%20(BlackFinPSV)/", "Minerva (BlackFinPSV)"),

        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".pkg",
        recommended: true,
        notes: "Official digital distribution format for games, updates, DLC " +
        "requiring a work.bin license file."
    },
    {
        extension: "NoNpDrm",
        recommended: false,
        notes: "A directory structure format producing a PKG with " +
        "fake work.bin license."
    },
    {
        extension: ".vpk",
        recommended: false,
        notes: "PSVita package for homebrew applications."
    },
    {
        extension: "MaiDump",
        recommended: false,
        notes: "Directory format superseded by NoNpDrm."
    },   
    {
        extension: ".psv",
        recommended: false,
        notes: "Cartridge dump format, likely not to be used."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};