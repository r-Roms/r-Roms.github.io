import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.XbuP_xdb.js","_app/immutable/chunks/BT67T6ZV.js","_app/immutable/chunks/DvbCUzh1.js","_app/immutable/chunks/Xlr4DbZf.js","_app/immutable/chunks/BRGNEY6a.js","_app/immutable/chunks/D8DN96_N.js","_app/immutable/chunks/D1PIupWv.js","_app/immutable/chunks/CEF-uAPk.js","_app/immutable/chunks/DU3rpZct.js","_app/immutable/chunks/CvcEM1tI.js","_app/immutable/chunks/upkV7Jlt.js","_app/immutable/chunks/BBJoz-b7.js"];
export const stylesheets = ["_app/immutable/assets/0.DT4rFi4F.css"];
export const fonts = ["_app/immutable/assets/geist-mono-cyrillic-wght-normal.BZdD_g9V.woff2","_app/immutable/assets/geist-mono-latin-ext-wght-normal.b6lpi8_2.woff2","_app/immutable/assets/geist-mono-latin-wght-normal.Cjtb1TV-.woff2","_app/immutable/assets/geist-cyrillic-wght-normal.CHSlOQsW.woff2","_app/immutable/assets/geist-latin-ext-wght-normal.DMtmJ5ZE.woff2","_app/immutable/assets/geist-latin-wght-normal.Dm3htQBi.woff2"];
