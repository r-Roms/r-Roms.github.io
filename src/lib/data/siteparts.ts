import type { Link, LinkSystem } from "$lib/types.js";
import { resolve } from "$app/paths";
import * as img from "$lib/img/systems";

export const HOME: Link = { name: "Home", url: resolve("/") }
export const DOWNLOADS: Link = { name: "Downloads", url: resolve("/downloads") }
export const TORRENTS: Link = { name: "Torrents", url: resolve("/torrents") }
export const SYSTEMS: Link = { name: "Systems", url: resolve("/systems") }
export const SETS: Link = { name: "File Sets", url: resolve("/filesets") }
export const PATCHING: Link = { name: "Patching & ROM Hacks", url: resolve("/patching") }
export const TYPES: Link = { name: "File Types", url: resolve("/filetypes") }
export const PRESERVE: Link = { name: "Preservation", url: resolve("/preservation") }
export const OTHER: Link = { name: "Other", url: resolve("/other") }

export const LINKSITES: Link[] = [DOWNLOADS, TORRENTS, SYSTEMS, SETS, PATCHING, TYPES, PRESERVE, OTHER]

export const VIRTUALBOY: LinkSystem = { name: "Nintendo Virtual Boy", url: resolve("/systems/virtualboy"), image: img.VIRTUALBOY };
export const POKEMINI: LinkSystem = { name: "Nintendo Pokémon Mini", url: resolve("/systems/pokemini"), image: img.POKEMINI };
export const GB: LinkSystem = { name: "Nintendo Game Boy", url: resolve("/systems/gb"), image: img.GB };
export const GBA: LinkSystem = { name: "Nintendo Game Boy Advance", url: resolve("/systems/gba"), image: img.GBA };
export const NDS: LinkSystem = { name: "Nintendo DS", url: resolve("/systems/nds"), image: img.NDS };
export const N3DS: LinkSystem = { name: "Nintendo 3DS", url: resolve("/systems/n3ds"), image: img.N3DS };
export const NES: LinkSystem = { name: "Nintendo Entertainment System", url: resolve("/systems/nes"), image: img.NES };
export const SNES: LinkSystem = { name: "Super Nintendo Entertainment System", url: resolve("/systems/snes"), image: img.SNES };
export const N64: LinkSystem = { name: "Nintendo 64", url: resolve("/systems/n64"), image: img.N64 };
export const GC: LinkSystem = { name: "Nintendo GameCube", url: resolve("/systems/gc"), image: img.GC };
export const WII: LinkSystem = { name: "Nintendo Wii", url: resolve("/systems/wii"), image: img.WII };
export const WIIU: LinkSystem = { name: "Nintendo Wii U", url: resolve("/systems/wiiu"), image: img.WIIU };
export const SWITCH: LinkSystem = { name: "Nintendo Switch", url: resolve("/systems/switch"), image: img.SWITCH };
export const SWITCH2: LinkSystem = { name: "Nintendo Switch 2", url: resolve("/systems/switch2"), image: img.SWITCH2 };
export const PSP: LinkSystem = { name: "Sony PlayStation Portable", url: resolve("/systems/psp"), image: img.PSP };
export const PSVITA: LinkSystem = { name: "Sony PlayStation Vita", url: resolve("/systems/psvita"), image: img.PSVITA };
export const PSX: LinkSystem = { name: "Sony PlayStation", url: resolve("/systems/psx"), image: img.PSX };
export const PS2: LinkSystem = { name: "Sony PlayStation 2", url: resolve("/systems/ps2"), image: img.PS2 };
export const PS3: LinkSystem = { name: "Sony PlayStation 3", url: resolve("/systems/ps3"), image: img.PS3 };
export const PS4: LinkSystem = { name: "Sony PlayStation 4", url: resolve("/systems/ps4"), image: img.PS4 };
export const PS5: LinkSystem = { name: "Sony PlayStation 5", url: resolve("/systems/ps5"), image: img.PS5 };
export const XBOX: LinkSystem = { name: "Microsoft Xbox", url: resolve("/systems/xbox"), image: img.XBOX };
export const XBOX360: LinkSystem = { name: "Microsoft Xbox 360", url: resolve("/systems/xbox360"), image: img.XBOX360 };
export const XBOXONE: LinkSystem = { name: "Microsoft Xbox One", url: resolve("/systems/xboxone"), image: img.XBOXONE };
export const XBOXSERIES: LinkSystem = { name: "Microsoft Xbox Series X/S", url: resolve("/systems/xboxseries"), image: img.XBOXSERIES };
export const MASTERSYSTEM: LinkSystem = { name: "Sega Master System", url: resolve("/systems/mastersystem"), image: img.MASTERSYSTEM };
export const GENESIS: LinkSystem = { name: "Sega Genesis", url: resolve("/systems/genesis"), image: img.GENESIS };
export const GAMEGEAR: LinkSystem = { name: "Sega Game Gear", url: resolve("/systems/gamegear"), image: img.GAMEGEAR };
export const SEGACD: LinkSystem = { name: "Sega CD", url: resolve("/systems/segacd"), image: img.SEGACD };
export const SEGA32X: LinkSystem = { name: "Sega 32X", url: resolve("/systems/sega32x"), image: img.SEGA32X };
export const SATURN: LinkSystem = { name: "Sega Saturn", url: resolve("/systems/saturn"), image: img.SATURN };
export const DREAMCAST: LinkSystem = { name: "Sega Dreamcast", url: resolve("/systems/dreamcast"), image: img.DREAMCAST };


export const LINKSYSTEMS: LinkSystem[] = [
    VIRTUALBOY, POKEMINI, GB, GBA, NDS,
    NES, SNES, N3DS, N64, GC, WII, WIIU, SWITCH, SWITCH2,
    PSP, PSVITA, PSX, PS2, PS3, PS4, PS5,
    XBOX, XBOX360, XBOXONE, XBOXSERIES,
    MASTERSYSTEM, GENESIS, GAMEGEAR, SEGACD, SEGA32X, SATURN, DREAMCAST]