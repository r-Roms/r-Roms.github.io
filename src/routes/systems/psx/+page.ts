import type { PageLoad } from "./$types.js";
import { type DownloadRow, type FileType, extendSite } from "$lib/types.js";
import { Minerva, InternetArchive, Vimm, LolROMs, ROMsTime } from "$lib/data/sites.js";

const header: string = "Sony PlayStation"
const EmulatorPath: string = "PlayStation_emulators#Emulators"

const downloads: DownloadRow[] = [
    {
        title: "CHD Format",
        downloads: [
            extendSite(InternetArchive, "download/chd_psx/CHD-PSX-USA/", "Archive (USA)"),
            extendSite(InternetArchive, "download/chd_psx_eur/CHD-PSX-EUR/", "Archive (EUR)"),
            extendSite(InternetArchive, "download/chd_psx_jap/CHD-PSX-JAP/", "Archive (JAP) (Part 1)"),
            extendSite(InternetArchive, "download/chd_psx_jap_p2/CHD-PSX-JAP/", "Archive (JAP) (Part 2)"),
            extendSite(InternetArchive, "download/chd_psx_misc/CHD-PSX-Misc/", "Archive (MISC)"),
            extendSite(ROMsTime, "roms?platform=playstation"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_psx/CHD-PSX-USA/", "Minerva (USA)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_psx_eur/CHD-PSX-EUR/", "Minerva (EUR)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_psx_jap/CHD-PSX-JAP/", "Minerva (JAP) (Part 1)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_psx_jap_p2/CHD-PSX-JAP/", "Minerva (JAP) (Part 2)"),
            extendSite(Minerva, "browse/Internet%20Archive/chadmaster/chd_psx_misc/CHD-PSX-Misc/", "Minerva (MISC)"),
        ]
    },
    {
        title: "BIN/CUE Format",
        downloads: [
            extendSite(LolROMs, "SONY/PlayStation/Discs%20%28BIN%29"),
            extendSite(ROMsTime, "roms?platform=playstation"),
            extendSite(Vimm, "vault/PS1"),
            extendSite(InternetArchive, "download/sony_playstation_part1", "Archive (Part 1) (#-D)"),
            extendSite(InternetArchive, "download/sony_playstation_part2", "Archive (Part 2) (E-I)"),
            extendSite(InternetArchive, "download/sony_playstation_part3", "Archive (Part 3) (J-N)"),
            extendSite(InternetArchive, "download/sony_playstation_part4", "Archive (Part 4) (O-S)"),
            extendSite(InternetArchive, "download/sony_playstation_part5", "Archive (Part 5) (T-Z)"),
        ],
        torrents: [
            extendSite(Minerva, "browse/Redump/Sony%20-%20PlayStation/"),
        ]
    },
];

const fileTypes: FileType[] = [
    {
        extension: ".bin / .cue",
        recommended: false,
        notes: "Standard disc image format. .bin contains the disc data " +
        "and .cue describes the structure of the data."
    },
    {
        extension: ".chd",
        recommended: true,
        notes: "Compressed disc format combining the bin/cue in a single " +
        "file."
    },
];

export const load: PageLoad = () => {    
    return { header, EmulatorPath, downloads , fileTypes};
};