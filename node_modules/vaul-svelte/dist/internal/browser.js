export const isBrowser = typeof document !== "undefined";
export function isMobileFirefox() {
    const userAgent = navigator.userAgent;
    return (typeof window !== "undefined" &&
        ((/Firefox/.test(userAgent) && /Mobile/.test(userAgent)) || // Android Firefox
            /FxiOS/.test(userAgent)) // iOS Firefox
    );
}
export function isMac() {
    return testPlatform(/^Mac/);
}
export function isIPhone() {
    return testPlatform(/^iPhone/);
}
export function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
export function isIPad() {
    return (testPlatform(/^iPad/) ||
        // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
        (isMac() && navigator.maxTouchPoints > 1));
}
export function isIOS() {
    return isIPhone() || isIPad();
}
export function testPlatform(re) {
    return typeof window !== "undefined" && window.navigator != null
        ? re.test(window.navigator.platform)
        : undefined;
}
