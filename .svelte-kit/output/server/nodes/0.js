import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.BeT0eqIA.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/EcSZM9gp.js","_app/immutable/chunks/CPEHrLlw.js","_app/immutable/chunks/mcOpTrgH.js","_app/immutable/chunks/DJZrlNGB.js","_app/immutable/chunks/zR6d1c4U.js","_app/immutable/chunks/DchlhQoD.js","_app/immutable/chunks/VBTYuNyv.js","_app/immutable/chunks/_Z2JNJkV.js","_app/immutable/chunks/DWHoCW4y.js","_app/immutable/chunks/DxE8tmsI.js"];
export const stylesheets = ["_app/immutable/assets/0.BBWh_HIz.css"];
export const fonts = [];
