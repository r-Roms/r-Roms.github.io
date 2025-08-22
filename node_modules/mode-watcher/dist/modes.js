/**
 * the modes that are supported, used for validation & type
 * derivation
 */
export const modes = ["dark", "light", "system"];
export function isValidMode(value) {
    if (typeof value !== "string")
        return false;
    return modes.includes(value);
}
