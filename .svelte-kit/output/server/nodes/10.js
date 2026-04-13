

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/Miscellaneous/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.CsP8jzyX.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/tD9sc2xJ.js","_app/immutable/chunks/Dzp75J2T.js"];
export const stylesheets = [];
export const fonts = [];
