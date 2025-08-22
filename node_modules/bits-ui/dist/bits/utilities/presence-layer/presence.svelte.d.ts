import { type ReadableBox, type ReadableBoxedValues } from "svelte-toolbelt";
import { Previous } from "runed";
import { StateMachine } from "../../../internal/state-machine.js";
export interface PresenceOptions extends ReadableBoxedValues<{
    open: boolean;
    ref: HTMLElement | null;
}> {
}
type PresenceStatus = "unmounted" | "mounted" | "unmountSuspended";
declare const presenceMachine: {
    readonly mounted: {
        readonly UNMOUNT: "unmounted";
        readonly ANIMATION_OUT: "unmountSuspended";
    };
    readonly unmountSuspended: {
        readonly MOUNT: "mounted";
        readonly ANIMATION_END: "unmounted";
    };
    readonly unmounted: {
        readonly MOUNT: "mounted";
    };
};
type PresenceMachine = StateMachine<typeof presenceMachine>;
export declare class Presence {
    readonly opts: PresenceOptions;
    prevAnimationNameState: string;
    styles: CSSStyleDeclaration;
    initialStatus: PresenceStatus;
    previousPresent: Previous<boolean>;
    machine: PresenceMachine;
    present: ReadableBox<boolean>;
    constructor(opts: PresenceOptions);
    /**
     * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
     * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
     * make sure we only trigger ANIMATION_END for the currently active animation.
     */
    handleAnimationEnd(event: AnimationEvent): void;
    handleAnimationStart(event: AnimationEvent): void;
    isPresent: boolean;
}
export {};
