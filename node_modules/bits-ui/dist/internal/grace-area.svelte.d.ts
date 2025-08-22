import { type Getter } from "svelte-toolbelt";
interface GraceAreaOptions {
    enabled: Getter<boolean>;
    triggerNode: Getter<HTMLElement | null>;
    contentNode: Getter<HTMLElement | null>;
    onPointerExit: () => void;
    setIsPointerInTransit?: (value: boolean) => void;
    transitTimeout?: number;
}
export declare class GraceArea {
    #private;
    constructor(opts: GraceAreaOptions);
}
export {};
