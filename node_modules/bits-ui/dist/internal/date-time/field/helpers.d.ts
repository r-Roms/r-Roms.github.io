import type { DateValue } from "@internationalized/date";
import type { Formatter } from "../formatter.js";
import type { DateAndTimeSegmentObj, DateSegmentPart, EditableSegmentPart, SegmentContentObj, SegmentPart, SegmentStateMap, SegmentValueObj } from "./types.js";
import type { Granularity, HourCycle } from "../../../shared/date/types.js";
export declare function initializeSegmentValues(granularity: Granularity): SegmentValueObj;
type SharedContentProps = {
    granularity: Granularity;
    dateRef: DateValue;
    formatter: Formatter;
    hideTimeZone: boolean;
    hourCycle: HourCycle | undefined;
};
type CreateContentObjProps = SharedContentProps & {
    segmentValues: SegmentValueObj;
    locale: string;
};
type CreateContentProps = CreateContentObjProps;
export declare function createContent(props: CreateContentProps): {
    obj: SegmentContentObj;
    arr: {
        part: SegmentPart;
        value: string;
    }[];
};
export declare function initSegmentStates(): SegmentStateMap;
export declare function initSegmentIds(): any;
export declare function isDateSegmentPart(part: unknown): part is DateSegmentPart;
export declare function isSegmentPart(part: string): part is EditableSegmentPart;
export declare function isAnySegmentPart(part: unknown): part is SegmentPart;
type GetValueFromSegments = {
    segmentObj: SegmentValueObj;
    fieldNode: HTMLElement | null;
    dateRef: DateValue;
};
export declare function getValueFromSegments(props: GetValueFromSegments): DateValue;
/**
 * Check if all the segments being used have been filled.
 * We use this to determine when we should set the value
 * store of the date field(s).
 *
 * @param segmentValues - The current `SegmentValueObj`
 * @param fieldNode  - The id of the date field
 */
export declare function areAllSegmentsFilled(segmentValues: SegmentValueObj, fieldNode: HTMLElement | null): boolean;
/**
 * Determines if the provided object is a valid `DateAndTimeSegmentObj`
 * by checking if it has the correct keys and values for each key.
 */
export declare function isDateAndTimeSegmentObj(obj: unknown): obj is DateAndTimeSegmentObj;
/**
 * Infer the granularity to use based on the
 * value and granularity props.
 */
export declare function inferGranularity(value: DateValue, granularity: Granularity | undefined): Granularity;
export declare function isAcceptableSegmentKey(key: string): boolean;
/**
 * Determines if the element with the provided id is the first focusable
 * segment in the date field with the provided fieldId.
 *
 * @param id - The id of the element to check if it's the first segment
 * @param fieldNode - The id of the date field associated with the segment
 */
export declare function isFirstSegment(id: string, fieldNode: HTMLElement | null): boolean;
type SetDescriptionProps = {
    id: string;
    formatter: Formatter;
    value: DateValue;
    doc: Document;
};
/**
 * Creates or updates a description element for a date field
 * which enables screen readers to read the date field's value.
 *
 * This element is hidden from view, and is portalled to the body
 * so it can be associated via `aria-describedby` and read by
 * screen readers as the user interacts with the date field.
 */
export declare function setDescription(props: SetDescriptionProps): void;
/**
 * Removes the description element for the date field with
 * the provided ID. This function should be called when the
 * date field is unmounted.
 */
export declare function removeDescriptionElement(id: string, doc: Document): void;
export declare function getDefaultHourCycle(locale: string): 12 | 24;
export {};
