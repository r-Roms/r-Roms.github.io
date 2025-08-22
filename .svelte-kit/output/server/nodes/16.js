

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/PC/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.BELh_w-w.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DWHoCW4y.js","_app/immutable/chunks/EcSZM9gp.js"];
export const stylesheets = [];
export const fonts = [];
