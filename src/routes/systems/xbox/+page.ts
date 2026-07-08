import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Microsoft Xbox"
const EmulatorPath: string = "Xbox_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "XISO Format",
        downloads: [
            extendSite(InternetArchive, "details/metal-gear-solid-2-substance-usa", "Archive (Part 1) (XISO labelled as ISO)"),
            extendSite(InternetArchive, "details/microsoft-xbox-xemu.xisoready-software-collection-part-2", "Archive (Part 2) (XISO labelled as ISO)"),
            extendSite(InternetArchive, "details/microsoft-xbox-xemu.xisoready-software-collection-part-3", "Archive (Part 3) (XISO labelled as ISO)"),
        ],
        torrents: []
    },
    {
        title: "ISO Format",
        downloads: [
            extendSite(LolROMs, "Microsoft/Xbox/Discs%20%28ISO%29"),
            extendSite(Vimm, "vault/Xbox"),
            extendSite(InternetArchive, "download/microsoft_xbox_numberssymbols", "Archive (#)"),
            extendSite(InternetArchive, "download/microsoft_xbox_a", "Archive (A)"),
            extendSite(InternetArchive, "download/microsoft_xbox_b", "Archive (B)"),
            extendSite(InternetArchive, "download/microsoft_xbox_c_part1", "Archive (C) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox_c_part2", "Archive (C) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox_d_part1", "Archive (D) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox_d_part2", "Archive (D) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox_e", "Archive (E)"),
            extendSite(InternetArchive, "download/microsoft_xbox_f", "Archive (F)"),
            extendSite(InternetArchive, "download/microsoft_xbox_g", "Archive (G)"),
            extendSite(InternetArchive, "download/microsoft_xbox_h", "Archive (H)"),
            extendSite(InternetArchive, "download/microsoft_xbox_i", "Archive (I)"),
            extendSite(InternetArchive, "download/microsoft_xbox_j", "Archive (J)"),
            extendSite(InternetArchive, "download/microsoft_xbox_k", "Archive (K)"),
            extendSite(InternetArchive, "download/microsoft_xbox_l", "Archive (L)"),
            extendSite(InternetArchive, "download/microsoft_xbox_m_part1", "Archive (M) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox_m_part2", "Archive (M) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox_n_part1", "Archive (N) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox_n_part2", "Archive (N) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox_o_part1", "Archive (O) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox_o_part2", "Archive (O) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox_p", "Archive (P)"),
            extendSite(InternetArchive, "download/microsoft_xbox_q", "Archive (Q)"),
            extendSite(InternetArchive, "download/microsoft_xbox_r", "Archive (R)"),
            extendSite(InternetArchive, "download/microsoft_xbox_s_part1", "Archive (S) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox_s_part2", "Archive (S) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox_t_part1", "Archive (T) (Part 1)"),
            extendSite(InternetArchive, "download/microsoft_xbox_t_part2", "Archive (T) (Part 2)"),
            extendSite(InternetArchive, "download/microsoft_xbox_u", "Archive (U)"),
            extendSite(InternetArchive, "download/microsoft_xbox_v", "Archive (V)"),
            extendSite(InternetArchive, "download/microsoft_xbox_w", "Archive (W)"),
            extendSite(InternetArchive, "download/microsoft_xbox_x", "Archive (X)"),
            extendSite(InternetArchive, "download/microsoft_xbox_y", "Archive (Y)"),
            extendSite(InternetArchive, "download/microsoft_xbox_z", "Archive (Z)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Microsoft%20-%20Xbox/"),
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
        extension: ".xiso",
        recommended: true,
        notes: "Xbox trimmed disc format."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};