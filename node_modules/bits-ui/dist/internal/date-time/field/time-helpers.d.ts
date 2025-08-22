import type { EditableTimeSegmentPart, HourCycle, TimeGranularity, TimeSegmentContentObj, TimeSegmentStateMap, TimeSegmentValueObj, TimeValue } from "../../../shared/date/types.js";
import { CalendarDateTime, Time, ZonedDateTime } from "@internationalized/date";
import type { TimeFormatter } from "../formatter.js";
import type { TimeSegmentPart } from "./types.js";
export declare function initializeSegmentValues(): TimeSegmentValueObj;
type SharedTimeContentProps = {
    granularity: TimeGranularity;
    timeRef: TimeValue;
    formatter: TimeFormatter;
    hideTimeZone: boolean;
    hourCycle: HourCycle | undefined;
};
type CreateTimeContentObjProps = SharedTimeContentProps & {
    segmentValues: TimeSegmentValueObj;
    locale: string;
};
type CreateTimeContentProps = CreateTimeContentObjProps;
export declare function createTimeContent(props: CreateTimeContentProps): {
    obj: TimeSegmentContentObj;
    arr: {
        part: TimeSegmentPart;
        value: string;
    }[];
};
export declare function initTimeSegmentStates(): TimeSegmentStateMap;
export declare function initTimeSegmentIds(): any;
export declare function isEditableTimeSegmentPart(part: unknown): part is EditableTimeSegmentPart;
export declare function isAnyTimeSegmentPart(part: unknown): part is TimeSegmentPart;
type GetTimeValueFromSegments<T extends TimeValue = Time> = {
    segmentObj: TimeSegmentValueObj;
    fieldNode: HTMLElement | null;
    timeRef: T;
};
export declare function getTimeValueFromSegments<T extends TimeValue = Time>(props: GetTimeValueFromSegments<T>): T;
/**
 * Check if all the segments being used have been filled.
 * We use this to determine when we should set the value
 * store of the date field(s).
 *
 * @param segmentValues - The current `SegmentValueObj`
 * @param fieldNode  - The id of the date field
 */
export declare function areAllTimeSegmentsFilled(segmentValues: TimeSegmentValueObj, fieldNode: HTMLElement | null): boolean;
/**
 * Infer the granularity to use based on the
 * value and granularity props.
 */
export declare function inferTimeGranularity(granularity: TimeGranularity | undefined): TimeGranularity;
/**
 * Determines if the element with the provided id is the first focusable
 * segment in the date field with the provided fieldId.
 *
 * @param id - The id of the element to check if it's the first segment
 * @param fieldNode - The id of the date field associated with the segment
 */
export declare function isFirstTimeSegment(id: string, fieldNode: HTMLElement | null): boolean;
type SetTimeDescriptionProps = {
    id: string;
    formatter: TimeFormatter;
    value: TimeValue;
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
export declare function setTimeDescription(props: SetTimeDescriptionProps): void;
/**
 * Removes the description element for the date field with
 * the provided ID. This function should be called when the
 * date field is unmounted.
 */
export declare function removeTimeDescriptionElement(id: string, doc: Document): void;
export declare function convertTimeValueToDateValue(time: TimeValue): CalendarDateTime | ZonedDateTime;
export declare function convertTimeValueToTime(time: TimeValue): Time;
export declare function isTimeBefore(timeToCompare: Time, referenceTime: Time): boolean;
export declare function isTimeAfter(timeToCompare: Time, referenceTime: Time): boolean;
export declare function getISOTimeValue(time: TimeValue): string;
export {};
