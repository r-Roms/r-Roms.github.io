import type { PageLoad } from "./$types.js";
import type { Link } from "$lib/types.js";

const software: Link[] = [
    { name: "PeaZip", url: "https://peazip.github.io", description: "Windows, MacOS, Linux" },
    { name: "7-Zip", url: "https://www.7-zip.org", description: "Windows" },
    { name: "Files (iOS / iPadOS)", url: "https://support.apple.com/en-us/102532", description: "Supports .zip and .7z if renamed to .zip" },
    { name: "Files (Android)", url: "https://support.google.com/files/answer/9048509?hl=en", description: "Supports .zip" },
    { name: "Windows Explorer", url: "https://support.microsoft.com/en-us/windows/zip-and-unzip-files-8d28fa72-f2f9-712f-67df-f80cf89fd4e5", description: "Supports .zip" }
];

export const load: PageLoad = () => {    
    return { software };
};