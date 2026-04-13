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
	() => import('./nodes/37')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/General/ddl": [3],
		"/General/other": [4],
		"/General/preservation": [5],
		"/General/torrents": [6],
		"/Microsoft": [7],
		"/Microsoft/microsoft-xbox360": [9],
		"/Microsoft/microsoft-xbox": [8],
		"/Miscellaneous": [10],
		"/Miscellaneous/bios-sets": [11],
		"/Miscellaneous/other": [12],
		"/Miscellaneous/rom-sets": [13],
		"/Nintendo": [14],
		"/Nintendo/nintendo-3ds": [15],
		"/Nintendo/nintendo-ds": [16],
		"/Nintendo/nintendo-gamecube": [17],
		"/Nintendo/nintendo-games": [18],
		"/Nintendo/nintendo-wii-u": [20],
		"/Nintendo/nintendo-wii": [19],
		"/PC": [21],
		"/PC/pc-games": [22],
		"/Retro & Arcade": [23],
		"/Retro & Arcade/arcade": [24],
		"/Retro & Arcade/retro-games": [25],
		"/Sega": [26],
		"/Sega/sega-cd": [27],
		"/Sega/sega-dreamcast": [28],
		"/Sega/sega-games": [29],
		"/Sega/sega-saturn": [30],
		"/Sony": [31],
		"/Sony/nopaystation": [32],
		"/Sony/sony-playstation-2": [34],
		"/Sony/sony-playstation-3": [35],
		"/Sony/sony-playstation-portable": [36],
		"/Sony/sony-playstation-vita": [37],
		"/Sony/sony-playstation": [33]
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