import { BROWSER } from "esm-env";
export const defaultWindow = BROWSER && typeof window !== "undefined" ? window : undefined;
export const defaultDocument = BROWSER && typeof window !== "undefined" ? window.document : undefined;
export const defaultNavigator = BROWSER && typeof window !== "undefined" ? window.navigator : undefined;
export const defaultLocation = BROWSER && typeof window !== "undefined" ? window.location : undefined;
