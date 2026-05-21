import type { PageLoad } from "./$types.js";
import type { LinkSystem } from "$lib/types.js";
import { resolve } from "$app/paths";
import { LINKSYSTEMS } from "$lib/data/siteparts.js";

export const load: PageLoad = () => {    
    return { LINKSYSTEMS };
};