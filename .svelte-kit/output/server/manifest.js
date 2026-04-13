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
		client: {start:"_app/immutable/entry/start.DKufkwwB.js",app:"_app/immutable/entry/app.DF4rl1U7.js",imports:["_app/immutable/entry/start.DKufkwwB.js","_app/immutable/chunks/BbHWw4KR.js","_app/immutable/chunks/DwhgW4sl.js","_app/immutable/chunks/Dzp75J2T.js","_app/immutable/chunks/XmN0OgFk.js","_app/immutable/chunks/CeX8PlzG.js","_app/immutable/entry/app.DF4rl1U7.js","_app/immutable/chunks/Dzp75J2T.js","_app/immutable/chunks/DwhgW4sl.js","_app/immutable/chunks/XmN0OgFk.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BJEGr7ib.js","_app/immutable/chunks/hkqgSeLz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/General/ddl","/General/other","/General/preservation","/General/torrents","/Microsoft","/Microsoft/microsoft-xbox360","/Microsoft/microsoft-xbox","/Miscellaneous","/Miscellaneous/bios-sets","/Miscellaneous/other","/Miscellaneous/rom-sets","/Nintendo","/Nintendo/nintendo-3ds","/Nintendo/nintendo-ds","/Nintendo/nintendo-gamecube","/Nintendo/nintendo-games","/Nintendo/nintendo-wii-u","/Nintendo/nintendo-wii","/PC","/PC/pc-games","/Retro & Arcade","/Retro & Arcade/arcade","/Retro & Arcade/retro-games","/Sega","/Sega/sega-cd","/Sega/sega-dreamcast","/Sega/sega-games","/Sega/sega-saturn","/Sony","/Sony/nopaystation","/Sony/sony-playstation-2","/Sony/sony-playstation-3","/Sony/sony-playstation-portable","/Sony/sony-playstation-vita","/Sony/sony-playstation"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
