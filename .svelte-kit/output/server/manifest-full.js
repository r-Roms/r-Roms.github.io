export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.ChX1JHdY.js",app:"_app/immutable/entry/app.UNooJP5o.js",imports:["_app/immutable/entry/start.ChX1JHdY.js","_app/immutable/chunks/6JPwpJgz.js","_app/immutable/chunks/815yvf7T.js","_app/immutable/chunks/B9ZEekOX.js","_app/immutable/chunks/LH67jeQE.js","_app/immutable/chunks/CKiK-OH1.js","_app/immutable/chunks/b0NlU_wp.js","_app/immutable/entry/app.UNooJP5o.js","_app/immutable/chunks/B9ZEekOX.js","_app/immutable/chunks/815yvf7T.js","_app/immutable/chunks/LH67jeQE.js","_app/immutable/chunks/CKiK-OH1.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/pNOFPr_q.js","_app/immutable/chunks/DWDLdo9L.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/25.js')),
			__memo(() => import('./nodes/26.js')),
			__memo(() => import('./nodes/27.js')),
			__memo(() => import('./nodes/28.js')),
			__memo(() => import('./nodes/29.js')),
			__memo(() => import('./nodes/30.js')),
			__memo(() => import('./nodes/31.js')),
			__memo(() => import('./nodes/32.js')),
			__memo(() => import('./nodes/33.js')),
			__memo(() => import('./nodes/34.js')),
			__memo(() => import('./nodes/35.js')),
			__memo(() => import('./nodes/36.js')),
			__memo(() => import('./nodes/37.js')),
			__memo(() => import('./nodes/38.js')),
			__memo(() => import('./nodes/39.js')),
			__memo(() => import('./nodes/40.js')),
			__memo(() => import('./nodes/41.js')),
			__memo(() => import('./nodes/42.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/Microsoft",
				pattern: /^\/Microsoft\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/Microsoft/microsoft-xbox360",
				pattern: /^\/Microsoft\/microsoft-xbox360\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/Microsoft/microsoft-xbox",
				pattern: /^\/Microsoft\/microsoft-xbox\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/Miscellaneous",
				pattern: /^\/Miscellaneous\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/Miscellaneous/bios-files",
				pattern: /^\/Miscellaneous\/bios-files\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/Miscellaneous/rom-sets",
				pattern: /^\/Miscellaneous\/rom-sets\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/Nintendo",
				pattern: /^\/Nintendo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/Nintendo/nintendo-3ds",
				pattern: /^\/Nintendo\/nintendo-3ds\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/Nintendo/nintendo-ds",
				pattern: /^\/Nintendo\/nintendo-ds\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/Nintendo/nintendo-gamecube",
				pattern: /^\/Nintendo\/nintendo-gamecube\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/Nintendo/nintendo-games",
				pattern: /^\/Nintendo\/nintendo-games\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/Nintendo/nintendo-wii-u",
				pattern: /^\/Nintendo\/nintendo-wii-u\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/Nintendo/nintendo-wii",
				pattern: /^\/Nintendo\/nintendo-wii\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/PC",
				pattern: /^\/PC\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/PC/pc-games",
				pattern: /^\/PC\/pc-games\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/Populars",
				pattern: /^\/Populars\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/Populars/about-rvz-files",
				pattern: /^\/Populars\/about-rvz-files\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/Populars/fire-emblem",
				pattern: /^\/Populars\/fire-emblem\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/Populars/mario",
				pattern: /^\/Populars\/mario\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/Populars/metroid",
				pattern: /^\/Populars\/metroid\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/Populars/persona",
				pattern: /^\/Populars\/persona\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/Populars/pokemon",
				pattern: /^\/Populars\/pokemon\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/Populars/super-smash-bros",
				pattern: /^\/Populars\/super-smash-bros\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/Populars/xenoblade",
				pattern: /^\/Populars\/xenoblade\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/Populars/zelda",
				pattern: /^\/Populars\/zelda\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/Retro & Arcade",
				pattern: /^\/Retro & Arcade\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/Retro & Arcade/arcade",
				pattern: /^\/Retro & Arcade\/arcade\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/Retro & Arcade/retro-games",
				pattern: /^\/Retro & Arcade\/retro-games\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/Sega",
				pattern: /^\/Sega\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/Sega/sega-cd",
				pattern: /^\/Sega\/sega-cd\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/Sega/sega-dreamcast",
				pattern: /^\/Sega\/sega-dreamcast\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/Sega/sega-games",
				pattern: /^\/Sega\/sega-games\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/Sega/sega-saturn",
				pattern: /^\/Sega\/sega-saturn\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/Sony",
				pattern: /^\/Sony\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/Sony/nopaystation",
				pattern: /^\/Sony\/nopaystation\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/Sony/sony-playstation-2",
				pattern: /^\/Sony\/sony-playstation-2\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/Sony/sony-playstation-3",
				pattern: /^\/Sony\/sony-playstation-3\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/Sony/sony-playstation-portable",
				pattern: /^\/Sony\/sony-playstation-portable\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/Sony/sony-playstation-vita",
				pattern: /^\/Sony\/sony-playstation-vita\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 42 },
				endpoint: null
			},
			{
				id: "/Sony/sony-playstation",
				pattern: /^\/Sony\/sony-playstation\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 38 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
