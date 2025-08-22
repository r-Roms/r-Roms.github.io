// Since it's not recommended to use `$app/environment` or `import.meta.‍env.SSR`, expose these instead
// See: https://kit.svelte.dev/docs/packaging
export const browser = typeof window !== 'undefined';
export const ssr = typeof window === 'undefined';
/**
 * Get the operating system of the browser
 */
export function getOS() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Mac')) {
        return 'macOS';
    }
    else if (userAgent.includes('Windows')) {
        return 'Windows';
    }
    else if (userAgent.includes('Linux')) {
        return 'Linux';
    }
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        return 'iOS';
    }
    else if (userAgent.includes('Android')) {
        return 'Android';
    }
    return 'Unknown';
}
export function isMac() {
    return getOS() === 'macOS';
}
export function isWindows() {
    return getOS() === 'Windows';
}
export function isLinux() {
    return getOS() === 'Linux';
}
export function isIOS() {
    return getOS() === 'iOS';
}
export function isAndroid() {
    return getOS() === 'Android';
}
export function getModifierSymbol() {
    return isMac() ? '⌘' : 'Ctrl';
}
export function getModifierKey() {
    return isMac() ? 'metaKey' : 'ctrlKey';
}
