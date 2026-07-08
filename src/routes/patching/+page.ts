import type { PageLoad } from "./$types.js";
import type { Link, BaseRomsForPatch } from "$lib/types.js";

const sites: Link[] = [
    {
        name: "Hackdex",
        url: "https://hackdex.app",
        description: "A community hub hosting many Pokémon ROM Hacks " +
        "Uploaded ROMs should be uncompressed i.e. " +
        "<code class=\"inline-code\">*.gba</code> " +
        "not a compressed archive i.e. " +
        "<code class=\"inline-code\">*.zip</code>"
    },
    {
        name: "RomPatcherJS",
        url: "https://www.marcrobledo.com/RomPatcher.js/",
        description: "A Popular web-tool to patch ROM files. Does not provide " +
        "the files itself."
    },
    {
        name: "RomHacking.net",
        url: "https://www.romhacking.net",
    },
    {
        name: "r/PokemonROMhacks",
        url: "https://www.reddit.com/r/PokemonROMhacks/",
    },
    {
        name: "r/ROMhacking",
        url: "https://www.reddit.com/r/romhacking/",
    },
    {
        name: "PokeCommunity",
        url: "https://pokecommunity.com",
    },
    {
        name: "GitHub",
        url: "https://github.com",
        description: "A common online software version control platform " +
        "sometimes used for development & distribution of ROM hacks."
    },
]

const baseRoms: BaseRomsForPatch[] = [
    {
        name: "Pokemon - Emerald Version (USA, Europe)",
        altnames: [
            "1986 - Pokemon Emerald (U)(TrashMan)",
        ],
        notes: [],
        hashes: {
            crc32: "1f1c08fb",
            md5: "605b89b67018abcea91e693a4dd25be3",
            sha1: "f3ae088181bf583e55daf962a92bb46f4f1d07b7",
        }
    },
    {
        name: "Pokemon - FireRed Version (USA, Europe)",
        altnames: [
            "1636 - Pokemon FireRed (U)(Squirrels)",
        ],
        notes: [],
        hashes: {
            crc32: "dd88761c",
            md5: "e26ee0d44e809351c8ce2d73c7400cdd",
            sha1: "41cb23d8dccc8ebd7c649cd8fbb58eeace6e2fdc",
        }
    },
]

export const load: PageLoad = () => {    
    return { sites, baseRoms };
};