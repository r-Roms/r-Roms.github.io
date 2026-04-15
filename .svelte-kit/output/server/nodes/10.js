

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/Miscellaneous/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.BP1xo_tZ.js","_app/immutable/chunks/BT67T6ZV.js","_app/immutable/chunks/DvbCUzh1.js","_app/immutable/chunks/upkV7Jlt.js"];
export const stylesheets = [];
export const fonts = [];
