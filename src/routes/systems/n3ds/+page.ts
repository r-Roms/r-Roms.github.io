import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, hShop, LolROMs, Vimm } from "$lib/data/sites.js";

const header: string = "Nintendo 3DS"
const EmulatorPath: string = "Nintendo_3DS_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CIA Format",
        downloads: [
            extendSite(hShop),
        ],
        torrents: [],
    },
    {
        title: "Nintendo - Nintendo 3DS (Decrypted)",
        downloads: [
            extendSite(Vimm, "vault/3DS"),
            extendSite(LolROMs, "Nintendo/3DS/Decrypted"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%203DS%20(Decrypted)/"),
        ],
    },
    {
        title: "Nintendo - Nintendo 3DS (Encrypted)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%203DS%20(Encrypted)/"),
        ],
    },
    {
        title: "Nintendo - New Nintendo 3DS (Decrypted)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20New%20Nintendo%203DS%20(Decrypted)/"),
        ],
    },
    {
        title: "Nintendo - New Nintendo 3DS (Encrypted)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20New%20Nintendo%203DS%20(Encrypted)/"),
        ],
    },
    {
        title: "Nintendo - Nintendo 3DS (Digital) (Deprecated)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%203DS%20(Digital)%20(Deprecated)/"),
        ],
    },
    {
        title: "Nintendo - New Nintendo 3DS (Digital) (Deprecated)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20New%20Nintendo%203DS%20(Digital)%20(Deprecated)/"),
        ],
    },
    {
        title: "Unofficial - Nintendo 3DS (Digital) (Updates and DLC) (Decrypted)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Unofficial%20-%20Nintendo%20-%20Nintendo%203DS%20(Digital)%20(Updates%20and%20DLC)%20(Decrypted)/"),
        ],
    },
    {
        title: "Unofficial - Nintendo 3DS (Digital) (Updates and DLC) (Encrypted)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Unofficial%20-%20Nintendo%20-%20Nintendo%203DS%20(Digital)%20(Updates%20and%20DLC)%20(Encrypted)/"),
        ],
    },
    {
        title: "Nintendo - Nintendo 3DS (Digital) (CDN)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%203DS%20(Digital)%20(CDN)/"),
        ],
    },
    {
        title: "Nintendo - Nintendo 3DS (Digital) (Dev ROMs)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%203DS%20(Digital)%20(Dev%20ROMs)/"),
        ],
    },
    {
        title: "Nintendo - Nintendo 3DS (Digital) (Pre-Install)",
        downloads: [],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Nintendo%20-%20Nintendo%203DS%20(Digital)%20(Pre-Install)/"),
        ],
    },
    {
        title: "3DS Encrypted",
        downloads: [
            extendSite(InternetArchive, "download/3ds-main-encrypted", "Archive (#-R)"),
            extendSite(InternetArchive, "download/3ds-main-encrypted-p2", "Archive (S-Z)"),
        ],
        torrents: [],
    },
];

const fileTypes: FileType[] = [
    {   extension: ".3ds/.cci", recommended: false,
        notes: "Card format, .cci is the official extension name. May be encrypted for 3DS or emulator with key file."
    },
    {   extension: ".zcci", recommended: true,
        notes: "Compressed format for emulators."
    },
    {   extension: ".3dsx", recommended: false,
        notes: "For homebrew launcher on custom firmware (CFW) 3DS and emulator."
    },
    {   extension: ".z3dsx", recommended: false,
        notes: "Compressed for homebrew launcher on CFW 3DS and emulator."
    },
    {   extension: ".cia", recommended: false,
        notes: "Installable format, encrypted on CFW 3DS menu, or decrypted on CFW 3DS & emulator menu."
    },
    {   extension: ".zcia", recommended: true,
        notes: "Compressed installable format, installable on CFW 3DS and emulator menu."
    },
    {   extension: ".app", recommended: false,
        notes: "Content partition from .cia, encrypted for 3DS or decrypted for emulators/modding."
    },
    {   extension: ".cxi", recommended: false,
        notes: "Executable partition from .cia/.cci, encrypted for 3DS or decrypted for emulators/modding."
    },
    {   extension: ".zcxi", recommended: true,
        notes: "Compressed executable partition for emulators."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads, fileTypes };
};