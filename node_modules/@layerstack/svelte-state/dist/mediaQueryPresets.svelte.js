import { MediaQuery } from 'svelte/reactivity';
export class MediaQueryPresets {
    width(width) {
        return new MediaQuery(`(min-width: ${width}px)`);
    }
    height(height) {
        return new MediaQuery(`(min-height: ${height}px)`);
    }
    // Matches tailwind defaults (https://tailwindcss.com/docs/responsive-design)
    smScreen = this.width(640);
    mdScreen = this.width(768);
    lgScreen = this.width(1024);
    xlScreen = this.width(1280);
    xxlScreen = this.width(1536);
    screen = new MediaQuery('screen and (min-width: 0)'); // workaround for https://github.com/sveltejs/svelte/issues/15930
    print = new MediaQuery('print and (min-width: 0)'); // workaround for https://github.com/sveltejs/svelte/issues/15930
    dark = new MediaQuery('(prefers-color-scheme: dark)');
    light = new MediaQuery('(prefers-color-scheme: light)');
    motion = new MediaQuery('(prefers-reduced-motion: no-preference)');
    motionReduce = new MediaQuery('(prefers-reduced-motion: reduce)');
    landscape = new MediaQuery('(orientation: landscape)');
    portrait = new MediaQuery('(orientation: portrait)');
}
