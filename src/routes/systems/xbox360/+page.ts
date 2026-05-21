import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Microsoft Xbox 360"
const EmulatorPath: string = "Xbox_360_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "ISO Format",
        downloads: [
            extendSite(Vimm, "vault/Xbox360"),
            extendSite(InternetArchive, "download/microsoft_xbox360_numberssymbols", "Archive (#)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_a_part1", "Archive (A) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_a_part2", "Archive (A) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_b_part1", "Archive (B) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_b_part2", "Archive (B) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_c_part1", "Archive (C) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_c_part2", "Archive (C) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_d_part1", "Archive (D) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_d_part2", "Archive (D) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_d_part3", "Archive (D) (Part 3)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_e", "Archive (E)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_f_part1", "Archive (F) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_f_part2", "Archive (F) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_g", "Archive (G)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_h", "Archive (H)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_i", "Archive (I)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_j", "Archive (J)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_k", "Archive (K)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_l", "Archive (L)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_m_part1", "Archive (M) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_m_part2", "Archive (M) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_n_part1", "Archive (N) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_n_part2", "Archive (N) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_o", "Archive (O)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_p", "Archive (P)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_q", "Archive (Q)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_r", "Archive (R)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_s_part1", "Archive (S) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_s_part2", "Archive (S) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_t_part1", "Archive (T) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_t_part2", "Archive (T) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_u", "Archive (U)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_v", "Archive (V)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_w", "Archive (W)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_x_part1", "Archive (X) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_x_part2", "Archive (X) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_y", "Archive (Y)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_z", "Archive (Z)"),
            extendSite(InternetArchive, "download/XBOX_360_1", "Archive (Part 1) (#-D)"),
            extendSite(InternetArchive, "download/XBOX_360_1_OTHER", "Archive (Part 1+) (#-D)"),
            extendSite(InternetArchive, "download/XBOX_360_2", "Archive (Part 2) (D-H)"),
            extendSite(InternetArchive, "download/XBOX_360_3", "Archive (Part 3) (H-M)"),
            extendSite(InternetArchive, "download/XBOX_360_4", "Archive (Part 4) (M-P)"),
            extendSite(InternetArchive, "download/XBOX_360_5", "Archive (Part 5) (P-T)"),
            extendSite(InternetArchive, "download/XBOX_360_6", "Archive (Part 6) (T-Z)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Microsoft%20-%20Xbox%20360/"),
        ]
    },
    {
        title: "STFS Format - Digital",
        downloads: [
            extendSite(Vimm, "vault/Xbox360-D"),
            extendSite(InternetArchive, "download/microsoft_xbox360_digital_part1", "Archive (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_digital_part2", "Archive (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_digital_part3", "Archive (Part 3)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_digital_part4", "Archive (Part 4)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_digital_part5", "Archive (Part 5)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_digital_part6", "Archive (Part 6)"),
            extendSite(InternetArchive, "download/microsoft_xbox360_digital_part7", "Archive (Part 7)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Microsoft%20-%20Xbox%20360%20(Digital)/", "Minerva"),
        ]
    },
    {
        title: "STFS Format - Title Updates",
        downloads: [
            extendSite(Vimm, "vault/Xbox360-D"),
            extendSite(InternetArchive, "download/microsoft_xbox360_title-updates"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Unofficial%20-%20Microsoft%20-%20Xbox%20360%20(Title%20Updates)/"),
        ]
    },
    {
        title: "STFS Format - DLC",
        downloads: [
            extendSite(Vimm, "vault/Xbox360-D"),
            extendSite(InternetArchive, "download/XBOX_360_DLC_1", "Archive (Part 1)"),
            extendSite(InternetArchive, "download/XBOX_360_DLC_2", "Archive (Part 2)"),
            extendSite(InternetArchive, "download/XBOX_360_DLC_3", "Archive (Part 3)"),
            extendSite(InternetArchive, "download/XBOX_360_DLC_4", "Archive (Part 4)"),
            extendSite(InternetArchive, "download/XBOX_360_DLC_5", "Archive (Part 5)"),
            extendSite(InternetArchive, "download/XBOX_360_DLC_6", "Archive (Part 6)"),
            extendSite(InternetArchive, "download/rock-band-dlc-complete-collection-xbox-360-by-americo", "Archive (Rock Band)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/mdashk/rock-band-dlc-complete-collection-xbox-360-by-americo/", "Minerva (Rock Band)"),
        ]
    },
    {
        title: "STFS Format - XBLA",
        downloads: [
            extendSite(Vimm, "vault/Xbox360-D"),
            extendSite(InternetArchive, "download/XBOX_360_XBLA"),
            extendSite(InternetArchive, "download/XBOX_360_XBLA_DLC", "Archive (DLC)"),
        ],
        torrents: []
    },
    {
        title: "STFS Format - XBLIG",
        downloads: [
            extendSite(Vimm, "vault/Xbox360-D"),
            extendSite(InternetArchive, "download/XBOX_360_XBLIG_1", "Archive (Part 1)"),
            extendSite(InternetArchive, "download/XBOX_360_XBLIG_2", "Archive (Part 2)"),
            extendSite(InternetArchive, "download/XBOX_360_XBLIG_3", "Archive (Part 3)"),
            extendSite(InternetArchive, "download/XBOX_360_XBLIG_4", "Archive (Part 4)"),
        ],
        torrents: []
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".iso",
        recommended: true,
        notes: "Standard disc image format. Can be a raw dump or trimmed. " +
        "Trimmed is recommended."
    },
    {
        extension: "STFS",
        recommended: true,
        notes: "Secure Transacted File System (STFS) container file format. " +
        "Digital games are stored as directories of files. " +
        "Xbox Live Arcade (XBLA), Xbox Live Indie Games (XBLIG), " +
        "updates, DLC, saves are stored as singular files."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};