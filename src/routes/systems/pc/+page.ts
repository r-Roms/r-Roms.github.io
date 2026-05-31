import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, RetroExo, MyAbandonware, VetusWare, GOGgames, FreeGOGPCGames, OVAGames, LolROMs } from "$lib/data/sites.js";

const header: string = "Desktop PC"

const downloads: DownloadRow[] = [
    {
        title: "Common Sites",
        downloads: [
            InternetArchive,
            LolROMs,
            MyAbandonware,
            VetusWare,
            GOGgames,
            OVAGames,
        ],
        torrents: [
            Minerva,
            GOGgames,
            FreeGOGPCGames,
        ]
    },
    {
        title: "Retro eXo",
        downloads: [
            extendSite(RetroExo, "exodos.html", "eXoDOS"),
            extendSite(RetroExo, "win3x.html", "eXoWin3x"),
            extendSite(RetroExo, "win9x.html", "eXoWin9x"),
            extendSite(RetroExo, "if.html", "eXoIF"),
            extendSite(RetroExo, "scummvm.html", "eXoScummVM"),
            extendSite(RetroExo, "dreamm.html", "eXoDREAMM"),
            extendSite(RetroExo, "appleIIGS.html", "eXoAppleIIGS"),
            extendSite(RetroExo, "linux.html", "eXoLinux (Patches)"),
        ],
        torrents: []
    },
    {
        title: "Redump Set",
        downloads: [
            extendSite(InternetArchive, "download/redump_pc_0", "Archive (#)"),
            extendSite(InternetArchive, "download/redump_pc_A", "Archive (A)"),
            extendSite(InternetArchive, "download/redump_pc_B", "Archive (B-1)"),
            extendSite(InternetArchive, "download/redump_pc_B-2", "Archive (B-2)"),
            extendSite(InternetArchive, "download/redump_pc_C", "Archive (C-1)"),
            extendSite(InternetArchive, "download/redump_pc_C-2", "Archive (C-2)"),
            extendSite(InternetArchive, "download/redump_pc_C-3", "Archive (C-3)"),
            extendSite(InternetArchive, "download/redump_pc_C-4", "Archive (C-4)"),
            extendSite(InternetArchive, "download/redump_pc_D", "Archive (D-1)"),
            extendSite(InternetArchive, "download/redump_pc_D-2", "Archive (D-2)"),
            extendSite(InternetArchive, "download/redump_pc_E", "Archive (E)"),
            extendSite(InternetArchive, "download/redump_pc_F", "Archive (F)"),
            extendSite(InternetArchive, "download/redump_pc_G", "Archive (G-1)"),
            extendSite(InternetArchive, "download/redump_pc_G-2", "Archive (G-2)"),
            extendSite(InternetArchive, "download/redump_pc_G-3", "Archive (G-3)"),
            extendSite(InternetArchive, "download/redump_pc_H", "Archive (H)"),
            extendSite(InternetArchive, "download/redump_pc_I", "Archive (I)"),
            extendSite(InternetArchive, "download/redump_pc_J", "Archive (J)"),
            extendSite(InternetArchive, "download/redump_pc_K", "Archive (K)"),
            extendSite(InternetArchive, "download/redump_pc_L", "Archive (L)"),
            extendSite(InternetArchive, "download/redump_pc_M", "Archive (M-1)"),
            extendSite(InternetArchive, "download/redump_pc_M-2", "Archive (M-2)"),
            extendSite(InternetArchive, "download/redump_pc_N", "Archive (N)"),
            extendSite(InternetArchive, "download/redump_pc_O", "Archive (O)"),
            extendSite(InternetArchive, "download/redump_pc_P", "Archive (P-1)"),
            extendSite(InternetArchive, "download/redump_pc_P-2", "Archive (P-2)"),
            extendSite(InternetArchive, "download/redump_pc_P-3", "Archive (P-3)"),
            extendSite(InternetArchive, "download/redump_pc_Q", "Archive (Q)"),
            extendSite(InternetArchive, "download/redump_pc_R", "Archive (R)"),
            extendSite(InternetArchive, "download/redump_pc_S", "Archive (S-1)"),
            extendSite(InternetArchive, "download/redump_pc_S-2", "Archive (S-2)"),
            extendSite(InternetArchive, "download/redump_pc_S-3", "Archive (S-3)"),
            extendSite(InternetArchive, "download/redump_pc_T", "Archive (T-1)"),
            extendSite(InternetArchive, "download/redump_pc_T-2", "Archive (T-2)"),
            extendSite(InternetArchive, "download/redump_pc_U", "Archive (U)"),
            extendSite(InternetArchive, "download/redump_pc_V", "Archive (V)"),
            extendSite(InternetArchive, "download/redump_pc_W", "Archive (W)"),
            extendSite(InternetArchive, "download/redump_pc_X", "Archive (X)"),
            extendSite(InternetArchive, "download/redump_pc_Y", "Archive (Y)"),
            extendSite(InternetArchive, "download/redump_pc_Z", "Archive (Z)"),
        ],
        torrents: []
    },
    {
        title: "Other",
        downloads: [
            extendSite(InternetArchive, "download/Total_DOS_Collection_Release_16_March_2019", "Archive (DOS Collection)"),
            extendSite(InternetArchive, "download/2020_03_22_DOOM/DOOM%20WADs/", "Archive (DOOM WADs)"),
            extendSite(InternetArchive, "download/apple_macintosh", "Archive (Apple Macintosh)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/sketch_the_cow/Total_DOS_Collection_Release_16_March_2019/", "Minerva (DOS Collection)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/2020_03_22_DOOM/DOOM%20WADs/", "Minerva (DOOM WADs)"),
            extendSite(Minerva, "browse/Redump/Apple%20-%20Macintosh/", "Minerva (Apple Macintosh)"),
            extendSite(Minerva, "browse/Redump/IBM%20-%20PC%20compatible/", "Minerva (IBM PC compatible)"),
        ]
    },
];

const fileTypes: FileType[] = [];

export const load: PageLoad = () => {    
    return { header, downloads };
};