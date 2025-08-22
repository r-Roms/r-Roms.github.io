import { type WritableBox } from "svelte-toolbelt";
interface Machine<S> {
    [k: string]: {
        [k: string]: S;
    };
}
type MachineState<T> = keyof T;
type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>;
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
export declare class StateMachine<M> {
    #private;
    readonly state: WritableBox<MachineState<M>>;
    constructor(initialState: MachineState<M>, machine: M & Machine<MachineState<M>>);
    dispatch(event: MachineEvent<M>): void;
}
export {};
