import { setInitialMode } from "../mode.js";
import type { ThemeColors } from "../types.js";
type $$ComponentProps = {
    trueNonce: string;
    initConfig: Parameters<typeof setInitialMode>[0];
    themeColors: ThemeColors;
};
declare const ModeWatcherFull: import("svelte").Component<$$ComponentProps, {}, "">;
type ModeWatcherFull = ReturnType<typeof ModeWatcherFull>;
export default ModeWatcherFull;
