import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.BKvTYQpx.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/B9ZEekOX.js","_app/immutable/chunks/815yvf7T.js","_app/immutable/chunks/LH67jeQE.js","_app/immutable/chunks/CKiK-OH1.js","_app/immutable/chunks/pNOFPr_q.js","_app/immutable/chunks/Ce2I-S6o.js","_app/immutable/chunks/DWDLdo9L.js","_app/immutable/chunks/CosbbSs6.js","_app/immutable/chunks/DYqqDfhR.js","_app/immutable/chunks/b0NlU_wp.js"];
export const stylesheets = ["_app/immutable/assets/0.Cc4RPY_M.css"];
export const fonts = [];
