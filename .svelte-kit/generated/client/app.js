export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36'),
	() => import('./nodes/37'),
	() => import('./nodes/38'),
	() => import('./nodes/39'),
	() => import('./nodes/40'),
	() => import('./nodes/41'),
	() => import('./nodes/42')
];

export const server_loads = [0];

export const dictionary = {
		"/": [2],
		"/Microsoft": [3],
		"/Microsoft/microsoft-xbox360": [5],
		"/Microsoft/microsoft-xbox": [4],
		"/Miscellaneous": [6],
		"/Miscellaneous/bios-files": [7],
		"/Miscellaneous/rom-sets": [8],
		"/Nintendo": [9],
		"/Nintendo/nintendo-3ds": [10],
		"/Nintendo/nintendo-ds": [11],
		"/Nintendo/nintendo-gamecube": [12],
		"/Nintendo/nintendo-games": [13],
		"/Nintendo/nintendo-wii-u": [15],
		"/Nintendo/nintendo-wii": [14],
		"/PC": [16],
		"/PC/pc-games": [17],
		"/Populars": [18],
		"/Populars/about-rvz-files": [19],
		"/Populars/fire-emblem": [20],
		"/Populars/mario": [21],
		"/Populars/metroid": [22],
		"/Populars/persona": [23],
		"/Populars/pokemon": [24],
		"/Populars/super-smash-bros": [25],
		"/Populars/xenoblade": [26],
		"/Populars/zelda": [27],
		"/Retro & Arcade": [28],
		"/Retro & Arcade/arcade": [29],
		"/Retro & Arcade/retro-games": [30],
		"/Sega": [31],
		"/Sega/sega-cd": [32],
		"/Sega/sega-dreamcast": [33],
		"/Sega/sega-games": [34],
		"/Sega/sega-saturn": [35],
		"/Sony": [36],
		"/Sony/nopaystation": [37],
		"/Sony/sony-playstation-2": [39],
		"/Sony/sony-playstation-3": [40],
		"/Sony/sony-playstation-portable": [41],
		"/Sony/sony-playstation-vita": [42],
		"/Sony/sony-playstation": [38]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';