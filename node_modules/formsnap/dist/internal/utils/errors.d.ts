import type { ValidationErrors } from "sveltekit-superforms";
/**
 * Extracts the error array from a `ValidationErrors` object.
 */
export declare function extractErrorArray<T extends Record<string, unknown>>(errors: ValidationErrors<T> | undefined): string[];
