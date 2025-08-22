export declare function testWithEffect(name: string, fn: () => void | Promise<void>): void;
export declare function effectRootScope(fn: () => void | Promise<void>): void | Promise<void>;
export declare function vitestSetTimeoutWrapper(fn: () => void, timeout: number): void;
