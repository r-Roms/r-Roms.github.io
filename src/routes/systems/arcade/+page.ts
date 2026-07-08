import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Pleasuredome } from "$lib/data/sites.js";

const header: string = "Arcade"
const EmulatorPath: string = "MAME#Downloads"

const downloads: DownloadRow[] = [
    {
        title: "MAME",
        downloads: [
            extendSite(Pleasuredome, "mame/"),
            extendSite(InternetArchive, "download/MAME_0.225_CHDs_merged", "Archive (0.275 CHDs merged)"),
            extendSite(InternetArchive, "download/mame-merged/mame-merged/", "Archive (0.268 ROMs merged)"),
            extendSite(InternetArchive, "download/mame-merged/BIOS/", "Archive (0.268 BIOS)"),
            extendSite(InternetArchive, "download/mame-sl/mame-sl/", "Archive (0.266 Software List ROMs merged)"),
            extendSite(InternetArchive, "download/mame-chds-roms-extras-complete", "Archive (0.258 - CHD + ROM + EXTRA)"),
            extendSite(InternetArchive, "download/mame-support/Support/", "Archive (Support Files)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/lollo_220/MAME_0.225_CHDs_merged/", "Minerva (0.275 CHDs merged)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/mame-merged/mame-merged/", "Minerva (0.268 ROMs merged)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/mame-merged/BIOS/", "Minerva (0.268 BIOS)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/mame-sl/mame-sl/", "Minerva (0.266 Software List ROMs merged)"),
            extendSite(Minerva, "browse/Internet%20Archive/rompacker/mame-chds-roms-extras-complete/", "Minerva (0.258 - CHD + ROM + EXTRA)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/mame-support/Support/", "Minerva (Support Files)"),
        ]
    },
    {
        title: "FinalBurn Neo",
        downloads: [
            extendSite(Pleasuredome, "nonmame/fbneo/index.html"),
            extendSite(InternetArchive, "download/2020_01_06_fbn/roms/", "Archive (Monthly ROMs)"),
            extendSite(InternetArchive, "download/2020_01_06_fbn/support/", "Archive (Monthly Support)"),
            extendSite(InternetArchive, "download/fbneo/", "Archive (Stable ROMs & Support Files)"),
            extendSite(InternetArchive, "download/fbnarcade-fullnonmerged/arcade/", "Archive (ROMs Non-Merged)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/2020_01_06_fbn/roms/", "Minerva (ROMs)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/2020_01_06_fbn/support/", "Minerva (Support)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/fbneo/", "Minerva (ROMs & Support Files)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/fbnarcade-fullnonmerged/arcade/", "Minerva (ROMs Non-Merged)"),
        ]
    },
    {
        title: "HBMAME",
        downloads: [
            extendSite(Pleasuredome, "nonmame/hbmame/index.html"),
            extendSite(InternetArchive, "download/hbmame_0244_roms", "Archive (0.244 ROMs merged)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/aberusugi/hbmame_0244_roms/", "Minerva (0.244 ROMs merged)"),
        ]
    },
    {
        title: "Arcade",
        downloads: [
            extendSite(InternetArchive, "download/konami_e-amusement", "Archive (Konami e-Amusement)"),
            extendSite(InternetArchive, "download/konami_firebeat", "Archive (Konami Firebeat)"),
            extendSite(InternetArchive, "download/konami_m2", "Archive (Konami M2)"),
            extendSite(InternetArchive, "download/konami_system_573", "Archive (Konami System 573)"),
            extendSite(InternetArchive, "download/konami_system_gv", "Archive (Konami System GV)"),
            extendSite(InternetArchive, "download/namco_system_246", "Archive (Namco System 246)"),
            extendSite(InternetArchive, "download/namco_sega_nintendo_triforce", "Archive (Namco/Sega/Nintendo Triforce)"),
            extendSite(InternetArchive, "download/sega_chihiro", "Archive (SEGA Chihiro)"),
            extendSite(InternetArchive, "download/sega_lindbergh", "Archive (SEGA Lindbergh)"),
            extendSite(InternetArchive, "download/sega_naomi", "Archive (SEGA Naomi)"),
            extendSite(InternetArchive, "download/sega_naomi_2", "Archive (SEGA Naomi 2)"),
            extendSite(InternetArchive, "download/sega_ringedge", "Archive (SEGA RingEdge)"),
            extendSite(InternetArchive, "download/sega_ringedge_2", "Archive (SEGA RingEdge 2)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Konami%20-%20e-Amusement/", "Minerva (Konami e-Amusement)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Konami%20-%20FireBeat/", "Minerva (Konami Firebeat)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Konami%20-%20M2/", "Minerva (Konami M2)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Konami%20-%20System%20573/", "Minerva (Konami System 573)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Konami%20-%20System%20GV/", "Minerva (Konami System GV)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Namco%20-%20System%20246/", "Minerva (Namco System 246)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Namco%20-%20Sega%20-%20Nintendo%20-%20Triforce/", "Minerva (Namco/Sega/Nintendo Triforce)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Sega%20-%20Chihiro/", "Minerva (SEGA Chihiro)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Sega%20-%20Lindbergh/", "Minerva (SEGA Lindbergh)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Sega%20-%20Naomi/", "Minerva (SEGA Naomi)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Sega%20-%20Naomi%202/", "Minerva (SEGA Naomi 2)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Sega%20-%20RingEdge/", "Minerva (SEGA RingEdge)"),
            extendSite(Minerva, "browse/Redump/Arcade%20-%20Sega%20-%20RingEdge%202/", "Minerva (SEGA RingEdge 2)"),
        ]
    },
    {
        title: "PinMAME",
        downloads: [
            extendSite(Pleasuredome, "nonmame/pinmame/index.html"),
        ],
        torrents: []
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".zip",
        recommended: true,
        notes: "Standard MAME format containing binary dumps of each " +
        "ROM chip on an arcade PCB."
    },
    {
        extension: ".chd",
        recommended: true,
        notes: "Standard format for disc-based arcade games.."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};