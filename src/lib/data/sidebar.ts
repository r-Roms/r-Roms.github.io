import { resolve } from "$app/paths";

type SidebarItem = {
    title: string;
    url: string;
};

type SidebarSection = {
    title: string;
    defaultOpen?: boolean;
    items: SidebarItem[];
};

export const sidebarSections: SidebarSection[] = [
    {
        title: "General", defaultOpen: true,
        items: [
            { title: "Systems", url: resolve("/systems") },
            { title: "Downloads", url: resolve("/downloads") },
            { title: "Torrents", url: resolve("/torrents") },
            { title: "Patching & Hacks", url: resolve("/patching") },
            { title: "File Sets", url: resolve("/filesets") },
            { title: "File Types", url: resolve("/filetypes") },
            { title: "Preservation", url: resolve("/preservation") },
            { title: "Other", url: resolve("/other") },
        ]
    },
    {
        title: "Retro & Arcade", defaultOpen: false,
        items: [
            { title: "Retro Games", url: resolve("/Retro & Arcade/retro-games") },
            { title: "Arcade", url: resolve("/Retro & Arcade/arcade") },
        ]
    },
    {
        title: "PC", defaultOpen: false,
        items: [
            { title: "PC Games", url: resolve("/PC/pc-games") },
        ]
    },
];