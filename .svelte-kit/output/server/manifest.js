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
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/Microsoft","/Microsoft/microsoft-xbox360","/Microsoft/microsoft-xbox","/Miscellaneous","/Miscellaneous/bios-files","/Miscellaneous/rom-sets","/Nintendo","/Nintendo/nintendo-3ds","/Nintendo/nintendo-ds","/Nintendo/nintendo-gamecube","/Nintendo/nintendo-games","/Nintendo/nintendo-wii-u","/Nintendo/nintendo-wii","/PC","/PC/pc-games","/Populars","/Populars/about-rvz-files","/Populars/fire-emblem","/Populars/mario","/Populars/metroid","/Populars/persona","/Populars/pokemon","/Populars/super-smash-bros","/Populars/xenoblade","/Populars/zelda","/Retro & Arcade","/Retro & Arcade/arcade","/Retro & Arcade/retro-games","/Sega","/Sega/sega-cd","/Sega/sega-dreamcast","/Sega/sega-games","/Sega/sega-saturn","/Sony","/Sony/nopaystation","/Sony/sony-playstation-2","/Sony/sony-playstation-3","/Sony/sony-playstation-portable","/Sony/sony-playstation-vita","/Sony/sony-playstation"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
