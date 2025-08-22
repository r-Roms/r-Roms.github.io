/**
 * Sanitizes an array of classnames by removing any empty strings.
 */
export declare function sanitizeClassNames(classNames: string[]): string[];
export declare const noopStorage: {
    getItem: (_key: string) => null;
    setItem: (_key: string, _value: string) => void;
};
export declare const isBrowser: boolean;
