export type Announcer = ReturnType<typeof getAnnouncer>;
/**
 * Creates an announcer object that can be used to make `aria-live` announcements to screen readers.
 */
export declare function getAnnouncer(doc: Document | null): {
    announce: (value: string | null | number, kind?: "assertive" | "polite", timeout?: number) => NodeJS.Timeout | undefined;
};
