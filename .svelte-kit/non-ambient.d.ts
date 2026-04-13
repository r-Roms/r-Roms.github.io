
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/General" | "/General/ddl" | "/General/other" | "/General/preservation" | "/General/torrents" | "/Microsoft" | "/Microsoft/microsoft-xbox360" | "/Microsoft/microsoft-xbox" | "/Miscellaneous" | "/Miscellaneous/bios-sets" | "/Miscellaneous/other" | "/Miscellaneous/rom-sets" | "/Nintendo" | "/Nintendo/nintendo-3ds" | "/Nintendo/nintendo-ds" | "/Nintendo/nintendo-gamecube" | "/Nintendo/nintendo-games" | "/Nintendo/nintendo-wii-u" | "/Nintendo/nintendo-wii" | "/PC" | "/PC/pc-games" | "/Populars" | "/Populars/about-rvz-files" | "/Populars/fire-emblem" | "/Populars/mario" | "/Populars/metroid" | "/Populars/persona" | "/Populars/pokemon" | "/Populars/super-smash-bros" | "/Populars/xenoblade" | "/Populars/zelda" | "/Retro & Arcade" | "/Retro & Arcade/arcade" | "/Retro & Arcade/retro-games" | "/Sega" | "/Sega/sega-cd" | "/Sega/sega-dreamcast" | "/Sega/sega-games" | "/Sega/sega-saturn" | "/Sony" | "/Sony/nopaystation" | "/Sony/sony-playstation-2" | "/Sony/sony-playstation-3" | "/Sony/sony-playstation-portable" | "/Sony/sony-playstation-vita" | "/Sony/sony-playstation";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/General": Record<string, never>;
			"/General/ddl": Record<string, never>;
			"/General/other": Record<string, never>;
			"/General/preservation": Record<string, never>;
			"/General/torrents": Record<string, never>;
			"/Microsoft": Record<string, never>;
			"/Microsoft/microsoft-xbox360": Record<string, never>;
			"/Microsoft/microsoft-xbox": Record<string, never>;
			"/Miscellaneous": Record<string, never>;
			"/Miscellaneous/bios-sets": Record<string, never>;
			"/Miscellaneous/other": Record<string, never>;
			"/Miscellaneous/rom-sets": Record<string, never>;
			"/Nintendo": Record<string, never>;
			"/Nintendo/nintendo-3ds": Record<string, never>;
			"/Nintendo/nintendo-ds": Record<string, never>;
			"/Nintendo/nintendo-gamecube": Record<string, never>;
			"/Nintendo/nintendo-games": Record<string, never>;
			"/Nintendo/nintendo-wii-u": Record<string, never>;
			"/Nintendo/nintendo-wii": Record<string, never>;
			"/PC": Record<string, never>;
			"/PC/pc-games": Record<string, never>;
			"/Populars": Record<string, never>;
			"/Populars/about-rvz-files": Record<string, never>;
			"/Populars/fire-emblem": Record<string, never>;
			"/Populars/mario": Record<string, never>;
			"/Populars/metroid": Record<string, never>;
			"/Populars/persona": Record<string, never>;
			"/Populars/pokemon": Record<string, never>;
			"/Populars/super-smash-bros": Record<string, never>;
			"/Populars/xenoblade": Record<string, never>;
			"/Populars/zelda": Record<string, never>;
			"/Retro & Arcade": Record<string, never>;
			"/Retro & Arcade/arcade": Record<string, never>;
			"/Retro & Arcade/retro-games": Record<string, never>;
			"/Sega": Record<string, never>;
			"/Sega/sega-cd": Record<string, never>;
			"/Sega/sega-dreamcast": Record<string, never>;
			"/Sega/sega-games": Record<string, never>;
			"/Sega/sega-saturn": Record<string, never>;
			"/Sony": Record<string, never>;
			"/Sony/nopaystation": Record<string, never>;
			"/Sony/sony-playstation-2": Record<string, never>;
			"/Sony/sony-playstation-3": Record<string, never>;
			"/Sony/sony-playstation-portable": Record<string, never>;
			"/Sony/sony-playstation-vita": Record<string, never>;
			"/Sony/sony-playstation": Record<string, never>
		};
		Pathname(): "/" | "/General/ddl" | "/General/other" | "/General/preservation" | "/General/torrents" | "/Microsoft" | "/Microsoft/microsoft-xbox360" | "/Microsoft/microsoft-xbox" | "/Miscellaneous" | "/Miscellaneous/bios-sets" | "/Miscellaneous/other" | "/Miscellaneous/rom-sets" | "/Nintendo" | "/Nintendo/nintendo-3ds" | "/Nintendo/nintendo-ds" | "/Nintendo/nintendo-gamecube" | "/Nintendo/nintendo-games" | "/Nintendo/nintendo-wii-u" | "/Nintendo/nintendo-wii" | "/PC" | "/PC/pc-games" | "/Populars" | "/Populars/about-rvz-files" | "/Populars/fire-emblem" | "/Populars/mario" | "/Populars/metroid" | "/Populars/persona" | "/Populars/pokemon" | "/Populars/super-smash-bros" | "/Populars/xenoblade" | "/Populars/zelda" | "/Retro & Arcade" | "/Retro & Arcade/arcade" | "/Retro & Arcade/retro-games" | "/Sega" | "/Sega/sega-cd" | "/Sega/sega-dreamcast" | "/Sega/sega-games" | "/Sega/sega-saturn" | "/Sony" | "/Sony/nopaystation" | "/Sony/sony-playstation-2" | "/Sony/sony-playstation-3" | "/Sony/sony-playstation-portable" | "/Sony/sony-playstation-vita" | "/Sony/sony-playstation";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | "/favicon.svg" | string & {};
	}
}