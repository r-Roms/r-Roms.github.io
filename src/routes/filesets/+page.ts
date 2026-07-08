import type { PageLoad } from "./$types.js";
import type { Link } from "$lib/types.js";

const romsets: Link[] = [
    { name: "Tiny Best Set Go!", url: "https://archive.org/details/tiny-best-set-go" },
    { name: "PropeR No-Intro 1G1R", url: "https://archive.org/details/proper1g1r-collection" },
    { name: "Unofficial No-Intro Set (ChadMaster)", url: "https://archive.org/details/ni-romsets" },
    { name: "The Unofficial Redump Hoard", url: "https://archive.org/details/redump" },
    { name: "CVLT OF MIRRORS", url: "https://archive.org/details/@cvlt_of_mirrors" },
    { name: "TOSEC", url: "https://archive.org/download/tosec-main" },
    { name: "[TOSEC-ISO] 3DO", url: "https://archive.org/download/tosec-iso-3do" },
    { name: "[TOSEC-ISO] Acorn", url: "https://archive.org/download/tosec-iso-acorn" },
    { name: "[TOSEC-ISO] American Laser Games", url: "https://archive.org/download/tosec-iso-american-laser-games" },
    { name: "[TOSEC-ISO] Apple", url: "https://archive.org/download/tosec-iso-apple" },
    { name: "[TOSEC-ISO] Atari", url: "https://archive.org/download/tosec-iso-atari" },
    { name: "[TOSEC-ISO] Bandai", url: "https://archive.org/download/tosec-iso-bandai" },
    { name: "[TOSEC-ISO] Capcom", url: "https://archive.org/download/tosec-iso-capcom" },
    { name: "[TOSEC-ISO] Commodore", url: "https://archive.org/download/tosec-iso-commodore" },
    { name: "[TOSEC-ISO] Fujitsu", url: "https://archive.org/download/tosec-iso-fujitsu" },
    { name: "[TOSEC-ISO] IBM", url: "https://archive.org/download/tosec-iso-ibm" },
    { name: "[TOSEC-ISO] Incredible Technologies", url: "https://archive.org/download/tosec-iso-incredible-technologies" },
    { name: "[TOSEC-ISO] Konami", url: "https://archive.org/download/tosec-iso-konami" },
    { name: "[TOSEC-ISO] Mattel", url: "https://archive.org/download/tosec-iso-mattel" },
    { name: "[TOSEC-ISO] Memorex", url: "https://archive.org/download/tosec-iso-memorex" },
    { name: "[TOSEC-ISO] Microsoft", url: "https://archive.org/download/tosec-iso-microsoft" },
    { name: "[TOSEC-ISO] Multi-format", url: "https://archive.org/download/tosec-iso-multi-format" },
    { name: "[TOSEC-ISO] Namco-Sega-Nintendo", url: "https://archive.org/download/tosec-iso-namco-sega-nintendo" },
    { name: "[TOSEC-ISO] NEC", url: "https://archive.org/download/tosec-iso-nec" },
    { name: "[TOSEC-ISO] Nintendo (Broken)", url: "" },
    { name: "[TOSEC-ISO] Philips", url: "https://archive.org/download/tosec-iso-philips" },
    { name: "[TOSEC-ISO] Sega Part 1", url: "https://archive.org/download/tosec-iso-sega" },
    { name: "[TOSEC-ISO] Sega Part 2", url: "https://archive.org/download/tosec-iso-sega-part2" },
    { name: "[TOSEC-ISO] Sinclair", url: "https://archive.org/download/tosec-iso-sinclair" },
    { name: "[TOSEC-ISO] SNK", url: "https://archive.org/download/tosec-iso-snk" },
    { name: "[TOSEC-ISO] Sony", url: "https://archive.org/download/tosec-iso-sony" },
    { name: "[TOSEC-ISO] Tomy", url: "https://archive.org/download/tosec-iso-tomy" },
    { name: "[TOSEC-ISO] VM Labs", url: "https://archive.org/download/tosec-iso-vm-labs" },
    { name: "[TOSEC-ISO] VTech", url: "https://archive.org/download/tosec-iso-vtech" },
    { name: "[TOSEC-ISO] ZAPiT Games", url: "https://archive.org/download/tosec-iso-zapit-games" },
    { name: "Hardware Target Game Database (HTGDB) Gamepacks", url: "https://archive.org/download/htgdb-gamepacks" },
    { name: "English Translation ROMs Collection", url: "https://archive.org/download/En-ROMs/En-ROMs/" },
    { name: "Super Mario World Hacks (Broken)", url: "" },
    { name: "Super Famicom - Enhanced Colors", url: "https://archive.org/download/super-famicom-enhanced-colors/ROMs/" },
    { name: "Nintendo - Super Famicom - Speed Hacks", url: "https://archive.org/download/sfc-speedhacks/ROMs/" },
    { name: "Complete Sega MD+ Collection (MegaSD, Mega Everdrive Pro & Genesis Plus GX Compatible)", url: "https://archive.org/download/mdplus_collection_22_04_16" },
    { name: "Sega Model 3 ROMs", url: "https://archive.org/download/segamodel3/ROMs/" },
];

const biossets: Link[] = [
    { name: "RetroBIOS", url: "https://abdess.github.io/retrobios/" },
    { name: "RetroBIOS (GitHub)", url: "https://github.com/Abdess/retrobios" },
    { name: "EmulationWiki", url: "https://emulation.gametechwiki.com/index.php/Emulator_files" },
    { name: "Redump BIOS sets", url: "https://archive.org/download/2019_11_25_redump_bios" },
    { name: "TOSEC Firmware and Operating Systems Collection", url: "https://archive.org/download/tosec_fw_os" },
    { name: "Retroarch System Files (BIOS/Firmwares/OS)", url: "https://archive.org/download/RetroarchSystemFiles/Retroarch-System/" },
    { name: "Firmwares", url: "https://mega.nz/folder/9ZdQwaaY#u63KaI0MsKcIqWE2GQmUuA" },
]

const othersets: Link[] = [
    { name: "No-Intro - Source Code Sets", url: "https://archive.org/download/ni-sc/ni-sc/" },
    { name: "[TOSEC-PIX] Part 1", url: "https://archive.org/download/tosec-pix" },
    { name: "[TOSEC-PIX] Part 2", url: "https://archive.org/download/tosec-pix-part2" },
];

export const load: PageLoad = () => {    
    return { romsets, biossets, othersets };
};