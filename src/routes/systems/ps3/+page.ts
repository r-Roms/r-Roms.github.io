import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, NoPayStation, Vimm } from "$lib/data/sites.js";

const header: string = "Sony PlayStation 3"
const EmulatorPath: string = "PlayStation_3_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "PKG Format",
        downloads: [
            NoPayStation,
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA_1", "Archive (USA) (Part 1)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA_2", "Archive (USA) (Part 2)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA_3", "Archive (USA) (Part 3)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA_4", "Archive (USA) (Part 4)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA__5", "Archive (USA) (Part 5)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA_6", "Archive (USA) (Part 6)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA_7", "Archive (USA) (Part 7)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA_8", "Archive (USA) (Part 8)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA_9", "Archive (USA) (Part 9)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_USA_10", "Archive (USA) (Part 10)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_EUR_1", "Archive (EUR) (Part 1)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_EUR_2", "Archive (EUR) (Part 2)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_EUR_3", "Archive (EUR) (Part 3)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_EUR_4", "Archive (EUR) (Part 4)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_EUR_5", "Archive (EUR) (Part 5)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_EUR_6", "Archive (EUR) (Part 6)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_EUR_7", "Archive (EUR) (Part 7)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_JAP_1", "Archive (JAP) (Part 1)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_JAP_2", "Archive (JAP) (Part 2)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_JAP_3", "Archive (JAP) (Part 3)"),
            extendSite(InternetArchive, "download/PS3_NOINTRO_JAP_4", "Archive (JAP) (Part 4)"),
            extendSite(InternetArchive, "download/PS3_PSN_1", "Archive (PSN) (Part 1)"),
            extendSite(InternetArchive, "download/PS3_PSN_2", "Archive (PSN) (Part 2)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/No-Intro/Sony%20-%20PlayStation%203%20(PSN)%20(Content)/", "Minerva (PSN) (Content)"),
            extendSite(Minerva, "browse/No-Intro/Sony%20-%20PlayStation%203%20(PSN)%20(Updates)/", "Minerva (PSN) (Updates)"),
            extendSite(Minerva, "browse/No-Intro/Sony%20-%20PlayStation%203%20(PSN)%20(DLC)/", "Minerva (PSN) (DLC)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_PSN_1/", "Minerva (PSN) (Part 1)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_PSN_2/", "Minerva (PSN) (Part 2)"),
        ]
    },
    {
        title: "ISO Format",
        downloads: [
            extendSite(Vimm, "vault/PS3"),
            extendSite(InternetArchive, "download/sony_playstation3_numberssymbols", "Archive (#)"),
            extendSite(InternetArchive, "download/sony_playstation3_a_part1", "Archive (A) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_a_part2", "Archive (A) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_a_part3", "Archive (A) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_b_part1", "Archive (B) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_b_part2", "Archive (B) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_b_part3", "Archive (B) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_c_part1", "Archive (C) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_c_part2", "Archive (C) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_c_part3", "Archive (C) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_d_part1", "Archive (D) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_d_part2", "Archive (D) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_d_part3", "Archive (D) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_d_part4", "Archive (D) (Part 4)"),
            extendSite(InternetArchive, "download/sony_playstation3_d_part5", "Archive (D) (Part 5)"),
            extendSite(InternetArchive, "download/sony_playstation3_e", "Archive (E)"),
            extendSite(InternetArchive, "download/sony_playstation3_f_part1", "Archive (F) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_f_part2", "Archive (F) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_f_part3", "Archive (F) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_g_part1", "Archive (G) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_g_part2", "Archive (G) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_g_part3", "Archive (G) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_h_part1", "Archive (H) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_h_part2", "Archive (H) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_i", "Archive (I)"),
            extendSite(InternetArchive, "download/sony_playstation3_j", "Archive (J)"),
            extendSite(InternetArchive, "download/sony_playstation3_k", "Archive (K)"),
            extendSite(InternetArchive, "download/sony_playstation3_l_part1", "Archive (L) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_l_part2", "Archive (L) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_l_part3", "Archive (L) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_m_part1", "Archive (M) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_m_part2", "Archive (M) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_m_part3", "Archive (M) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_m_part4", "Archive (M) (Part 4)"),
            extendSite(InternetArchive, "download/sony_playstation3_m_part5", "Archive (M) (Part 5)"),
            extendSite(InternetArchive, "download/sony_playstation3_n_part1", "Archive (N) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_n_part2", "Archive (N) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_n_part3", "Archive (N) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_o_part1", "Archive (O) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_o_part2", "Archive (O) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_o_part3", "Archive (O) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_p_part1", "Archive (P) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_p_part2", "Archive (P) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_q", "Archive (Q)"),
            extendSite(InternetArchive, "download/sony_playstation3_r_part1", "Archive (R) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_r_part2", "Archive (R) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_r_part3", "Archive (R) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_r_part4", "Archive (R) (Part 4)"),
            extendSite(InternetArchive, "download/sony_playstation3_s_part1", "Archive (S) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_s_part2", "Archive (S) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_s_part3", "Archive (S) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_s_part4", "Archive (S) (Part 4)"),
            extendSite(InternetArchive, "download/sony_playstation3_s_part5", "Archive (S) (Part 5)"),
            extendSite(InternetArchive, "download/sony_playstation3_s_part6", "Archive (S) (Part 6)"),
            extendSite(InternetArchive, "download/sony_playstation3_t_part1", "Archive (T) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_t_part2", "Archive (T) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_t_part3", "Archive (T) (Part 3)"),
            extendSite(InternetArchive, "download/sony_playstation3_t_part4", "Archive (T) (Part 4)"),
            extendSite(InternetArchive, "download/sony_playstation3_u_part1", "Archive (U) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_u_part2", "Archive (U) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_v", "Archive (V)"),
            extendSite(InternetArchive, "download/sony_playstation3_w_part1", "Archive (W) (Part 1)"),
            extendSite(InternetArchive, "download/sony_playstation3_w_part2", "Archive (W) (Part 2)"),
            extendSite(InternetArchive, "download/sony_playstation3_x", "Archive (X)"),
            extendSite(InternetArchive, "download/sony_playstation3_y", "Archive (Y)"),
            extendSite(InternetArchive, "download/sony_playstation3_z", "Archive (Z)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Sony%20-%20PlayStation%203/")
        ]
    },
    {
        title: "JB Format",
        downloads: [
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_1", "Archive (Part 1) (#-C)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_2", "Archive (Part 2) (C-D)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_3", "Archive (Part 3) (D-G)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_3_OTHER", "Archive (Part 3) (D-G additional)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_4", "Archive (Part 4) (G-J)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART__5", "Archive (Part 5) (J-M)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_6", "Archive (Part 6) (M-N)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_7/", "Archive (Part 7) (N-R)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_8", "Archive (Part 8) (R-S)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_9", "Archive (Part 9) (S-T)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_10", "Archive (Part 10) (T)"),
            extendSite(InternetArchive, "download/PS3_ALVRO_PART_11", "Archive (Part 11) (T-Z)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_1/", "Minerva (Part 1) (#-C)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_2/", "Minerva (Part 2) (C-D)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_3/", "Minerva (Part 3) (D-G)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_3_OTHER/", "Minerva (Part 3) (D-G additional)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_4/", "Minerva (Part 4) (G-J)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART__5/", "Minerva (Part 5) (J-M)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_6/", "Minerva (Part 6) (M-N)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_7/", "Minerva (Part 7) (N-R)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_8/", "Minerva (Part 8) (R-S)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_9/", "Minerva (Part 9) (S-T)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_10/", "Minerva (Part 10) (T)"),
            extendSite(Minerva, "browse/Internet%20Archive/aitus95/PS3_ALVRO_PART_11/", "Minerva (Part 11) (T-Z)"),
        ]
    }
];

const fileTypes: FileType[] = [
    {
        extension: ".iso",
        recommended: false,
        notes: "Standard encrypted disc image, .rap required."
    },
    {
        extension: "JB",
        recommended: true,
        notes: "Decrypted and extracted disc data into a directory structure."
    },
    {
        extension: ".pkg",
        recommended: false,
        notes: "Installable format for digital content, .rap required."
    },
    {
        extension: ".rap",
        recommended: false,
        notes: "Encryption keys used for encrypted ROMs."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};