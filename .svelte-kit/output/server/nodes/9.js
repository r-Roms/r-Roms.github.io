

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/Nintendo/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.ikkTcJRq.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DWHoCW4y.js","_app/immutable/chunks/EcSZM9gp.js"];
export const stylesheets = [];
export const fonts = [];
