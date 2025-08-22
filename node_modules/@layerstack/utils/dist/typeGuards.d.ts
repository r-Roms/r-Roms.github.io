type EventType = MouseEvent | TouchEvent;
export declare function hasKeyOf<T>(object: any, key: string): object is T;
export declare function hasProperty<T extends Object>(o: T, name: string | number | symbol): name is keyof T;
export declare function nameof<T>(key: keyof T, instance?: T): keyof T;
export declare function isNumber(val: unknown): val is number;
/**
 * Check if value is present (not `null`/`undefined`).  Useful with `arr.filter(notNull)`
 */
export declare function notNull<T>(value: T | null | undefined): value is T;
export declare function isElement(elem?: Element | EventType): elem is Element;
export declare function isSVGElement(elem?: Element): elem is SVGElement;
export declare function isSVGSVGElement(elem?: Element | null): elem is SVGSVGElement;
export declare function isSVGGraphicsElement(elem?: Element | null): elem is SVGGraphicsElement;
export declare function isTouchEvent(event?: EventType): event is TouchEvent;
export declare function isEvent(event?: EventType | Element): event is EventType;
export {};
//# sourceMappingURL=typeGuards.d.ts.map