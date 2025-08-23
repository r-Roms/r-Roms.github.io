

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/PC/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.Fc0kk2wE.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DYqqDfhR.js","_app/immutable/chunks/B9ZEekOX.js"];
export const stylesheets = [];
export const fonts = [];
