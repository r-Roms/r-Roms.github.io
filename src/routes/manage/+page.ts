import type { PageLoad } from "./$types.js";
import type { Link } from "$lib/types.js";

const local: Link[] = [
    {
        name: "Emulation Station DE", url: "https://www.es-de.org/#Download",
        description: "Windows & Linux Frontend"
    },
    {
        name: "Playnite", url: "https://playnite.link",
        description: "Windows Frontend"
    },
    {
        name: "Daijisho", url: "https://play.google.com/store/apps/details?id=com.magneticchen.daijishou",
        description: "Android Frontend"
    },
    {
        name: "RomVault", url: "https://www.romvault.com",
        description: "Windows Manager"
    },
    {
        name: "Retrom", url: "https://github.com/JMBeresford/retrom",
        description: "Windows & Linux Manager"
    },
];

const server: Link[] = [
    {   name: "Romm", url: "https://docs.romm.app/latest/", },
    {   name: "Gaseous", url: "https://github.com/gaseous-project/gaseous-server", }
];

export const load: PageLoad = () => {    
    return { local, server };
};