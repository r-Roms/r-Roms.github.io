import type { PageLoad } from "./$types.js";
import type { Link } from "$lib/types.js";

const sites: Link[] = [
    {   name: "ROM Heaven", url: "https://romheaven.com/roms",
        description: "Excessive advertisements." },
];

export const load: PageLoad = () => {    
    return { sites };
};