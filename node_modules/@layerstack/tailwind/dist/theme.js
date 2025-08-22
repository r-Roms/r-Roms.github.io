import { range } from 'd3-array';
export const semanticColors = ['primary', 'secondary', 'accent', 'neutral'];
export const stateColors = ['info', 'success', 'warning', 'danger'];
export const colors = [...semanticColors, ...stateColors];
export const shades = [50, ...range(100, 1000, 100)];
/**
 * Get themes names from css file (`[data-theme="..."]`) split into `light` and `dark` collections determined by `color-scheme` property
 */
export function getThemeNames(cssContent) {
    const themeBlocks = cssContent.split(/\[data-theme=/);
    const light = [];
    const dark = [];
    // Skip first element as it's content before first theme
    for (let i = 1; i < themeBlocks.length; i++) {
        const block = themeBlocks[i];
        // Extract theme name
        const nameMatch = block.match(/^"([^"]+)"/);
        if (!nameMatch)
            continue;
        const themeName = nameMatch[1];
        if (block.includes('color-scheme: dark')) {
            dark.push(themeName);
        }
        else {
            light.push(themeName);
        }
    }
    return { light, dark };
}
/** Return a script tag that will set the initial theme from localStorage. This allows setting
 * the theme before anything starts rendering, even when SSR is in use.
 *
 * This feels a bit weird compared to just placing the function directly in svelte:head,
 * but it's the only way to inject the `darkThemes` array into the function.
 **/
export function createHeadSnippet(darkThemes) {
    const applyInitialStyle = `
  function applyInitialStyle(darkThemes) {
    let theme = localStorage.getItem('theme');
    // Ignore if no dark things registered (default 'dark' removed)
    if (darkThemes.length > 0) {
      if (theme) {
        document.documentElement.dataset.theme = theme;
        if (darkThemes.includes(theme)) {
          document.documentElement.classList.add('dark');
        }
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    }
  }
  `;
    let darkThemeList = darkThemes.map((theme) => `'${theme}'`).join(', ');
    return `<script>${applyInitialStyle}([${darkThemeList}])</script>`;
}
