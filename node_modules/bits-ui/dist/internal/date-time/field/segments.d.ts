/**
 * Handles segment navigation based on the provided keyboard event and field ID.
 *
 * @param e - The keyboard event
 * @param fieldNode - The ID of the field we're navigating within
 */
export declare function handleSegmentNavigation(e: KeyboardEvent, fieldNode: HTMLElement | null): void;
export declare function handleTimeSegmentNavigation(e: KeyboardEvent, fieldNode: HTMLElement | null): void;
/**
 * Retrieves the next segment in the list of segments relative to the provided node.
 *
 * @param node - The node we're starting from
 * @param segments - The list of candidate segments to navigate through
 */
export declare function getNextSegment(node: HTMLElement, segments: HTMLElement[]): HTMLElement | null | undefined;
/**
 * Retrieves the previous segment in the list of segments relative to the provided node.
 *
 * @param node - The node we're starting from
 * @param segments - The list of candidate segments to navigate through
 */
export declare function getPrevSegment(node: HTMLElement, segments: HTMLElement[]): HTMLElement | null | undefined;
/**
 * Retrieves an object containing the next and previous segments relative to the current node.
 *
 * @param startingNode - The node we're starting from
 * @param fieldNode - The ID of the field we're navigating within
 */
export declare function getPrevNextSegments(startingNode: HTMLElement, fieldNode: HTMLElement | null): {
    next: HTMLElement | null | undefined;
    prev: HTMLElement | null | undefined;
};
export declare function getPrevNextTimeSegments(startingNode: HTMLElement, fieldNode: HTMLElement | null): {
    next: HTMLElement | null | undefined;
    prev: HTMLElement | null | undefined;
};
/**
 * Shifts the focus to the next segment in the list of segments
 * within the field identified by the provided ID.
 */
export declare function moveToNextSegment(e: KeyboardEvent, fieldNode: HTMLElement | null): void;
export declare function moveToNextTimeSegment(e: KeyboardEvent, fieldNode: HTMLElement | null): void;
export declare function moveToPrevTimeSegment(e: KeyboardEvent, fieldNode: HTMLElement | null): void;
/**
 * Shifts the focus to the previous segment in the list of segments
 * within the field identified by the provided ID. If this is the first
 * segment, focus will not be shifted.
 */
export declare function moveToPrevSegment(e: KeyboardEvent, fieldNode: HTMLElement | null): void;
export declare function isSegmentNavigationKey(key: string): boolean;
/**
 * Retrieves all the interactive segments within the field identified by the provided ID.
 */
export declare function getSegments(fieldNode: HTMLElement | null): HTMLElement[];
export declare function getTimeSegments(fieldNode: HTMLElement | null): HTMLElement[];
export declare function getFirstTimeSegment(fieldNode: HTMLElement | null): HTMLElement | undefined;
/**
 * Get the first interactive segment within the field identified by the provided ID.
 */
export declare function getFirstSegment(fieldNode: HTMLElement | null): HTMLElement | undefined;
