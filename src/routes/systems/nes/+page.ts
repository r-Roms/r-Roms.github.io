import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Nintendo Entertainment System / Famicom"
const EmulatorPath: string = "Nintendo_Entertainment_System_emulators#Comparisons"

const downloads: DownloadRow[] = [
    {
        title: "Famicom/NES Headered",
        downloads: [
            extendSite(Vimm, "vault/NES"),
            extendSite(LolROMs, "Nintendo/Nintendo%20Entertainment%20System/Headered%20%28NES2.0%29"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%20Entertainment%20System%20(Headered)/")
        ]
    },
    {
        title: "Famicom/NES Headerless",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%20Entertainment%20System%20(Headerless)/")
        ]
    },
    {
        title: "Famicom Disk System (FDS)",
        downloads: [
            extendSite(LolROMs, "Nintendo/Famicom%20Disk%20System"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Family%20Computer%20Disk%20System%20(FDS)/")
        ]
    },
    {
        title: "Famicom Disk System (QD)",
        downloads: [
            extendSite(LolROMs, "Nintendo/Famicom%20DIsk%20System%20%28QD%29"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Family%20Computer%20Disk%20System%20(QD)/")
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".nes",
        recommended: false,
        notes: "Headered NES / FC format required for emulators. Header " +
        "contains necessary metadata regarding the extra chips in the " +
        "cartridge the emulator needs to run correctly."
    },
    {
        extension: ".unh",
        recommended: false,
        notes: "Canonical headerless NES / FC format. Usable on console only."
    },
    {
        extension: ".fds",
        recommended: false,
        notes: "Famicom Disk System (FDS) format for emulators which omits " +
        "some checksum data."
    },
    {
        extension: ".qd",
        recommended: false,
        notes: "Canonical Famicom Disk System (FDS) used in official " +
        "re-releases with full checksum data. Limited emulator support."
    },
    {
        extension: ".zip",
        recommended: true,
        notes: "Compressed archive which must contain a rom file. " +
        ".nes / .fds is recommended."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes};
};