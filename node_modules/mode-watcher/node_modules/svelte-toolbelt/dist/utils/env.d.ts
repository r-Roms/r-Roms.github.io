type NodeType = Element | Window | Node | Document | null | undefined;
export declare function getDocument(node: NodeType): Document;
export declare function getDocumentElement(node: NodeType): HTMLElement;
export declare function getWindow(node: Node | ShadowRoot | Document | null | undefined): Window & typeof globalThis;
export declare function getActiveElement(rootNode: Document | ShadowRoot): HTMLElement | null;
export type EnvironmentStateProps = {
    getRootNode?: () => Document | ShadowRoot | Node;
};
export declare class EnvironmentState {
    readonly props: EnvironmentStateProps;
    constructor(props?: EnvironmentStateProps);
    getRootNode(): Document | ShadowRoot;
    getDoc(): Document;
    getWin(): Window & typeof globalThis;
    getActiveElement(): HTMLElement | null;
    isActiveElement(node: HTMLElement | null | undefined): boolean;
    getById<T extends Element = HTMLElement>(id: string): T | null;
}
export {};
