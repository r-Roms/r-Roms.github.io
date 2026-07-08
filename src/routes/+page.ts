import type { PageLoad } from "./$types.js";
import { type Link } from "$lib/types.js";
import { resolve } from "$app/paths";
import { LINKSITES } from "$lib/data/siteparts.js";

let pagetitle = "/r/ROMs Megathread Site"

export const load: PageLoad = () => {    
    return { LINKSITES, pagetitle };
};