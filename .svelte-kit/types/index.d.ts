type DynamicRoutes = {
	
};

type Layouts = {
	"/": undefined;
	"/Microsoft": undefined;
	"/Microsoft/microsoft-xbox360": undefined;
	"/Microsoft/microsoft-xbox": undefined;
	"/Miscellaneous": undefined;
	"/Miscellaneous/bios-files": undefined;
	"/Miscellaneous/rom-sets": undefined;
	"/Nintendo": undefined;
	"/Nintendo/nintendo-3ds": undefined;
	"/Nintendo/nintendo-ds": undefined;
	"/Nintendo/nintendo-gamecube": undefined;
	"/Nintendo/nintendo-games": undefined;
	"/Nintendo/nintendo-wii-u": undefined;
	"/Nintendo/nintendo-wii": undefined;
	"/PC": undefined;
	"/PC/pc-games": undefined;
	"/Populars": undefined;
	"/Populars/about-rvz-files": undefined;
	"/Populars/fire-emblem": undefined;
	"/Populars/mario": undefined;
	"/Populars/metroid": undefined;
	"/Populars/persona": undefined;
	"/Populars/pokemon": undefined;
	"/Populars/super-smash-bros": undefined;
	"/Populars/xenoblade": undefined;
	"/Populars/zelda": undefined;
	"/Retro & Arcade": undefined;
	"/Retro & Arcade/arcade": undefined;
	"/Retro & Arcade/retro-games": undefined;
	"/Sega": undefined;
	"/Sega/sega-cd": undefined;
	"/Sega/sega-dreamcast": undefined;
	"/Sega/sega-games": undefined;
	"/Sega/sega-saturn": undefined;
	"/Sony": undefined;
	"/Sony/nopaystation": undefined;
	"/Sony/sony-playstation-2": undefined;
	"/Sony/sony-playstation-3": undefined;
	"/Sony/sony-playstation-portable": undefined;
	"/Sony/sony-playstation-vita": undefined;
	"/Sony/sony-playstation": undefined
};

export type RouteId = "/" | "/Microsoft" | "/Microsoft/microsoft-xbox360" | "/Microsoft/microsoft-xbox" | "/Miscellaneous" | "/Miscellaneous/bios-files" | "/Miscellaneous/rom-sets" | "/Nintendo" | "/Nintendo/nintendo-3ds" | "/Nintendo/nintendo-ds" | "/Nintendo/nintendo-gamecube" | "/Nintendo/nintendo-games" | "/Nintendo/nintendo-wii-u" | "/Nintendo/nintendo-wii" | "/PC" | "/PC/pc-games" | "/Populars" | "/Populars/about-rvz-files" | "/Populars/fire-emblem" | "/Populars/mario" | "/Populars/metroid" | "/Populars/persona" | "/Populars/pokemon" | "/Populars/super-smash-bros" | "/Populars/xenoblade" | "/Populars/zelda" | "/Retro & Arcade" | "/Retro & Arcade/arcade" | "/Retro & Arcade/retro-games" | "/Sega" | "/Sega/sega-cd" | "/Sega/sega-dreamcast" | "/Sega/sega-games" | "/Sega/sega-saturn" | "/Sony" | "/Sony/nopaystation" | "/Sony/sony-playstation-2" | "/Sony/sony-playstation-3" | "/Sony/sony-playstation-portable" | "/Sony/sony-playstation-vita" | "/Sony/sony-playstation";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/Microsoft" | "/Microsoft/microsoft-xbox360" | "/Microsoft/microsoft-xbox" | "/Miscellaneous" | "/Miscellaneous/bios-files" | "/Miscellaneous/rom-sets" | "/Nintendo" | "/Nintendo/nintendo-3ds" | "/Nintendo/nintendo-ds" | "/Nintendo/nintendo-gamecube" | "/Nintendo/nintendo-games" | "/Nintendo/nintendo-wii-u" | "/Nintendo/nintendo-wii" | "/PC" | "/PC/pc-games" | "/Populars" | "/Populars/about-rvz-files" | "/Populars/fire-emblem" | "/Populars/mario" | "/Populars/metroid" | "/Populars/persona" | "/Populars/pokemon" | "/Populars/super-smash-bros" | "/Populars/xenoblade" | "/Populars/zelda" | "/Retro & Arcade" | "/Retro & Arcade/arcade" | "/Retro & Arcade/retro-games" | "/Sega" | "/Sega/sega-cd" | "/Sega/sega-dreamcast" | "/Sega/sega-games" | "/Sega/sega-saturn" | "/Sony" | "/Sony/nopaystation" | "/Sony/sony-playstation-2" | "/Sony/sony-playstation-3" | "/Sony/sony-playstation-portable" | "/Sony/sony-playstation-vita" | "/Sony/sony-playstation";

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/favicon.ico" | "/favicon.svg";