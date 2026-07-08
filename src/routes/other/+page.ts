import type { PageLoad } from "./$types.js";
import type { Link } from "$lib/types.js";

const browsers: Link[] = [
    { name: "Vivaldi", url: "https://vivaldi.com" },
    { name: "Brave", url: "https://brave.com" },
    { name: "Helium", url: "https://helium.computer" },
]

const extensions: Link[] = [
    { name: "uBlock Origin - Firefox", url: "https://addons.mozilla.org/en-US/android/addon/ublock-origin/" },
    { name: "uBlock Origin - Chrome", url: "https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en" },
    { name: "uBlock Origin - Opera", url: "https://addons.opera.com/en/extensions/details/ublock/" },
]

export const load: PageLoad = () => {    
    return { browsers, extensions };
};