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
		client: {start:"_app/immutable/entry/start.DCIPN9BD.js",app:"_app/immutable/entry/app.B1uoJfcj.js",imports:["_app/immutable/entry/start.DCIPN9BD.js","_app/immutable/chunks/DLzREKI4.js","_app/immutable/chunks/DvbCUzh1.js","_app/immutable/chunks/CZ1IAyVt.js","_app/immutable/chunks/CvcEM1tI.js","_app/immutable/entry/app.B1uoJfcj.js","_app/immutable/chunks/DvbCUzh1.js","_app/immutable/chunks/DU3rpZct.js","_app/immutable/chunks/D1PIupWv.js","_app/immutable/chunks/BT67T6ZV.js","_app/immutable/chunks/CvcEM1tI.js","_app/immutable/chunks/CEF-uAPk.js","_app/immutable/chunks/BRGNEY6a.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/General/ddl","/General/other","/General/preservation","/General/torrents","/Microsoft","/Microsoft/microsoft-xbox360","/Microsoft/microsoft-xbox","/Miscellaneous","/Miscellaneous/bios-sets","/Miscellaneous/other","/Miscellaneous/rom-sets","/Nintendo","/Nintendo/nintendo-3ds","/Nintendo/nintendo-ds","/Nintendo/nintendo-gamecube","/Nintendo/nintendo-games","/Nintendo/nintendo-wii-u","/Nintendo/nintendo-wii","/PC","/PC/pc-games","/Populars","/Populars/about-rvz-files","/Populars/fire-emblem","/Populars/mario","/Populars/metroid","/Populars/persona","/Populars/pokemon","/Populars/super-smash-bros","/Populars/xenoblade","/Populars/zelda","/Retro & Arcade","/Retro & Arcade/arcade","/Retro & Arcade/retro-games","/Sega","/Sega/sega-cd","/Sega/sega-dreamcast","/Sega/sega-games","/Sega/sega-saturn","/Sony","/Sony/nopaystation","/Sony/sony-playstation-2","/Sony/sony-playstation-3","/Sony/sony-playstation-portable","/Sony/sony-playstation-vita","/Sony/sony-playstation"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
