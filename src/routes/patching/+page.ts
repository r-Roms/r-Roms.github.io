import type { PageLoad } from "./$types.js";
import type { Link } from "$lib/types.js";

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
        name: "r/ROMhacks",
        url: "https://www.reddit.com/r/RomHacks/",
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

export const load: PageLoad = () => {    
    return { sites };
};