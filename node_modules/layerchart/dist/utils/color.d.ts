/** Generator to create a new color on each call */
export declare function rgbColorGenerator(step?: number): Generator<{
    r: number;
    g: number;
    b: number;
    a: number;
}, {
    r: number;
    g: number;
    b: number;
    a: number;
}, unknown>;
type RGBColor = {
    r: number;
    g: number;
    b: number;
    a?: number;
};
export declare function getColorStr(color: RGBColor): string;
export declare function getColorIfDefined(data: any): string | undefined;
export {};
