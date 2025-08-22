import type { Action } from 'svelte/action';
import { type OffsetOptions, type Placement } from '@floating-ui/dom';
export type PopoverOptions = {
    anchorEl?: Element | HTMLElement;
    placement?: Placement;
    offset?: OffsetOptions;
    padding?: number;
    autoPlacement?: boolean;
    matchWidth?: boolean;
    resize?: boolean | 'width' | 'height';
};
export declare const popover: Action<Element | HTMLElement, PopoverOptions>;
export declare function getOppositePlacement<T extends string>(placement: T): T;
//# sourceMappingURL=popover.d.ts.map