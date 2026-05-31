import { resolve } from "$app/paths";

type SidebarItem = {
    title: string;
    url: string;
};

export const sidebarItems: SidebarItem[] = [
    { title: "Systems", url: resolve("/systems") },
    { title: "Downloads", url: resolve("/downloads") },
    { title: "Torrents", url: resolve("/torrents") },
    { title: "Patching & Hacks", url: resolve("/patching") },
    { title: "File Sets", url: resolve("/filesets") },
    { title: "File Types", url: resolve("/filetypes") },
    { title: "Preservation", url: resolve("/preservation") },
    { title: "Sites to Avoid", url: resolve("/sitestoavoid") },
    { title: "Other", url: resolve("/other") },
];