export declare function debounce<T extends (...args: any[]) => any>(fn: T, wait?: number): {
    (...args: Parameters<T>): void;
    destroy(): void;
};
