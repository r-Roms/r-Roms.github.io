type Getter<T> = () => T;
export type SidebarStateProps = {
    /**
     * A getter function that returns the current open state of the sidebar.
     * We use a getter function here to support `bind:open` on the `Sidebar.Provider`
     * component.
     */
    open: Getter<boolean>;
    /**
     * A function that sets the open state of the sidebar. To support `bind:open`, we need
     * a source of truth for changing the open state to ensure it will be synced throughout
     * the sub-components and any `bind:` references.
     */
    setOpen: (open: boolean) => void;
};
declare class SidebarState {
    #private;
    readonly props: SidebarStateProps;
    open: boolean;
    openMobile: boolean;
    setOpen: SidebarStateProps["setOpen"];
    state: string;
    constructor(props: SidebarStateProps);
    get isMobile(): boolean;
    handleShortcutKeydown: (e: KeyboardEvent) => void;
    setOpenMobile: (value: boolean) => void;
    toggle: () => boolean | void;
}
/**
 * Instantiates a new `SidebarState` instance and sets it in the context.
 *
 * @param props The constructor props for the `SidebarState` class.
 * @returns  The `SidebarState` instance.
 */
export declare function setSidebar(props: SidebarStateProps): SidebarState;
/**
 * Retrieves the `SidebarState` instance from the context. This is a class instance,
 * so you cannot destructure it.
 * @returns The `SidebarState` instance.
 */
export declare function useSidebar(): SidebarState;
export {};
