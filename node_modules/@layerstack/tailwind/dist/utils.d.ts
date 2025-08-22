import { type ClassValue } from 'clsx';
type ClassFalsyValues = undefined | null | false;
type AnyClassValue = ClassValue | ClassFalsyValues;
type AnyClassCollection = Record<string | number | symbol, AnyClassValue> | ClassFalsyValues;
export declare const cls: (...inputs: AnyClassValue[]) => string;
export declare const clsMerge: <T extends AnyClassCollection>(...inputs: T[]) => Exclude<T, false | undefined>;
export declare const normalizeClasses: <T extends object>(classes: string | ClassFalsyValues | T) => T;
export {};
//# sourceMappingURL=utils.d.ts.map