import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.H_0vYHC2.js","_app/immutable/chunks/BT67T6ZV.js","_app/immutable/chunks/DvbCUzh1.js","_app/immutable/chunks/Xlr4DbZf.js","_app/immutable/chunks/BRGNEY6a.js","_app/immutable/chunks/D8DN96_N.js","_app/immutable/chunks/D1PIupWv.js","_app/immutable/chunks/CEF-uAPk.js","_app/immutable/chunks/DU3rpZct.js","_app/immutable/chunks/CvcEM1tI.js","_app/immutable/chunks/upkV7Jlt.js","_app/immutable/chunks/CZ1IAyVt.js"];
export const stylesheets = ["_app/immutable/assets/0.C_2ie7h_.css"];
export const fonts = [];
