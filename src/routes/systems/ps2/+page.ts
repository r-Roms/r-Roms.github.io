import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs } from "$lib/data/sites.js";

const header: string = "Sony PlayStation 2"
const EmulatorPath: string = "PlayStation_2_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-0", "Archive (#)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-A", "Archive (A)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-B", "Archive (B)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-C", "Archive (C)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-D", "Archive (D)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-E", "Archive (E)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-F", "Archive (F)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-G_202207", "Archive (G)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-H", "Archive (H)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-I", "Archive (I)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-J", "Archive (J)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-K", "Archive (K)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-L", "Archive (L)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-M", "Archive (M)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-N", "Archive (N)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-O", "Archive (O)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-P", "Archive (P)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-Q", "Archive (Q)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-R", "Archive (R)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-S", "Archive (S)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-T", "Archive (T)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-U", "Archive (U)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-V", "Archive (V)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-W", "Archive (W)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-X", "Archive (X)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-Y", "Archive (Y)"),
            extendSite(InternetArchive, "details/ps2-redump-usa-chd-part-Z", "Archive (Z)"),
        ],
        torrents: []
    },
    {
        title: "ISO Format",
        downloads: [
            extendSite(Vimm, "vault/ps2"),
            extendSite(InternetArchive, "download/sony_playstation2_numberssymbols", "Archive (#)"),
            extendSite(InternetArchive, "download/sony_playstation2_a", "Archive (A)"),
            extendSite(InternetArchive, "download/sony_playstation2_b", "Archive (B)"),
            extendSite(InternetArchive, "download/sony_playstation2_c", "Archive (C)"),
            extendSite(InternetArchive, "download/sony_playstation2_d_part1", "Archive (D) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation2_d_part2", "Archive (D) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation2_e", "Archive (E)"),
            extendSite(InternetArchive, "download/sony_playstation2_f", "Archive (F)"),
            extendSite(InternetArchive, "download/sony_playstation2_g", "Archive (G)"),
            extendSite(InternetArchive, "download/sony_playstation2_h", "Archive (H)"),
            extendSite(InternetArchive, "download/sony_playstation2_i", "Archive (I)"),
            extendSite(InternetArchive, "download/sony_playstation2_j", "Archive (J)"),
            extendSite(InternetArchive, "download/sony_playstation2_k", "Archive (K)"),
            extendSite(InternetArchive, "download/sony_playstation2_l", "Archive (L)"),
            extendSite(InternetArchive, "download/sony_playstation2_m_part1", "Archive (M) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation2_m_part2", "Archive (M) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation2_n", "Archive (N)"),
            extendSite(InternetArchive, "download/sony_playstation2_o_part1", "Archive (O) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation2_o_part2", "Archive (O) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation2_p", "Archive (P)"),
            extendSite(InternetArchive, "download/sony_playstation2_q", "Archive (Q)"),
            extendSite(InternetArchive, "download/sony_playstation2_r", "Archive (R)"),
            extendSite(InternetArchive, "download/sony_playstation2_s_part1", "Archive (S) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation2_s_part2", "Archive (S) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation2_s_part3", "Archive (S) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation2_s_part4", "Archive (S) (Part 4)"),
            extendSite(InternetArchive, "download/sony_playstation2_t", "Archive (T)"),
            extendSite(InternetArchive, "download/sony_playstation2_u", "Archive (U)"),
            extendSite(InternetArchive, "download/sony_playstation2_v", "Archive (V)"),
            extendSite(InternetArchive, "download/sony_playstation2_w", "Archive (W)"),
            extendSite(InternetArchive, "download/sony_playstation2_x", "Archive (X)"),
            extendSite(InternetArchive, "download/sony_playstation2_y", "Archive (Y) (Taken Down)"),
            extendSite(InternetArchive, "download/sony_playstation2_z", "Archive (Z)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Sony%20-%20PlayStation%202/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".iso",
        recommended: false,
        notes: "Standard disc image format for DVD."
    },
    {
        extension: ".bin / .cue",
        recommended: false,
        notes: "Standard disc image format for CD."
    },
    {
        extension: ".chd",
        recommended: true,
        notes: "Compressed disc format for both CD & DVD."
    },
    {
        extension: ".cso",
        recommended: false,
        notes: "Compressed DVD format."
    },
    {
        extension: ".zso",
        recommended: false,
        notes: "Compressed DVD format."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};