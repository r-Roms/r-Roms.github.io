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
		client: {start:"_app/immutable/entry/start.CwlpHB_M.js",app:"_app/immutable/entry/app.D1westEf.js",imports:["_app/immutable/entry/start.CwlpHB_M.js","_app/immutable/chunks/tIULfQc-.js","_app/immutable/chunks/BhSJA8DS.js","_app/immutable/chunks/biVwMuWW.js","_app/immutable/chunks/B4K3m5S7.js","_app/immutable/entry/app.D1westEf.js","_app/immutable/chunks/DB7cS0_K.js","_app/immutable/chunks/BhSJA8DS.js","_app/immutable/chunks/D10uRadN.js","_app/immutable/chunks/DkqFD6jp.js","_app/immutable/chunks/DxyZH2Cy.js","_app/immutable/chunks/Bc9IkHl1.js","_app/immutable/chunks/B4K3m5S7.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
