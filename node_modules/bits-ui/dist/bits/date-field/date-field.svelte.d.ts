import type { Updater } from "svelte/store";
import type { DateValue } from "@internationalized/date";
import { type WritableBox, DOMContext, type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import type { DateRangeFieldRootState } from "../date-range-field/date-range-field.svelte.js";
import type { BitsFocusEvent, BitsKeyboardEvent, BitsMouseEvent, WithRefOpts, RefAttachment } from "../../internal/types.js";
import type { DateAndTimeSegmentObj, DateOnInvalid, DateSegmentObj, DateSegmentPart, DateValidator, Granularity, HourCycle, SegmentPart, SegmentValueObj, TimeSegmentObj, EditableTimeSegmentPart } from "../../shared/date/types.js";
import { type Formatter } from "../../internal/date-time/formatter.js";
import { type Announcer } from "../../internal/date-time/announcer.js";
export declare const dateFieldAttrs: import("../../internal/attrs.js").CreateBitsAttrsReturn<readonly ["input", "label", "segment"]>;
interface SegmentConfig {
    min: number | ((root: DateFieldRootState) => number);
    max: number | ((root: DateFieldRootState) => number);
    cycle: number;
    canBeZero?: boolean;
    padZero?: boolean;
    getAnnouncement?: (value: number, root: DateFieldRootState) => string | number;
    updateLogic?: (props: {
        root: DateFieldRootState;
        prev: string | null;
        num: number;
        moveToNext: {
            value: boolean;
        };
    }) => string | null;
}
interface DateFieldRootStateOpts extends WritableBoxedValues<{
    value: DateValue | undefined;
    placeholder: DateValue;
}>, ReadableBoxedValues<{
    readonlySegments: SegmentPart[];
    validate: DateValidator | undefined;
    onInvalid: DateOnInvalid | undefined;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
    disabled: boolean;
    readonly: boolean;
    granularity: Granularity | undefined;
    hourCycle: HourCycle | undefined;
    locale: string;
    hideTimeZone: boolean;
    required: boolean;
    errorMessageId: string | undefined;
    isInvalidProp: boolean | undefined;
}> {
}
export declare class DateFieldRootState {
    #private;
    static create(opts: DateFieldRootStateOpts, rangeRoot?: DateRangeFieldRootState): DateFieldRootState;
    value: DateFieldRootStateOpts["value"];
    placeholder: WritableBox<DateValue>;
    validate: DateFieldRootStateOpts["validate"];
    minValue: DateFieldRootStateOpts["minValue"];
    maxValue: DateFieldRootStateOpts["maxValue"];
    disabled: DateFieldRootStateOpts["disabled"];
    readonly: DateFieldRootStateOpts["readonly"];
    granularity: DateFieldRootStateOpts["granularity"];
    readonlySegments: DateFieldRootStateOpts["readonlySegments"];
    hourCycle: DateFieldRootStateOpts["hourCycle"];
    locale: DateFieldRootStateOpts["locale"];
    hideTimeZone: DateFieldRootStateOpts["hideTimeZone"];
    required: DateFieldRootStateOpts["required"];
    onInvalid: DateFieldRootStateOpts["onInvalid"];
    errorMessageId: DateFieldRootStateOpts["errorMessageId"];
    isInvalidProp: DateFieldRootStateOpts["isInvalidProp"];
    descriptionId: string;
    formatter: Formatter;
    initialSegments: SegmentValueObj;
    segmentValues: SegmentValueObj;
    announcer: Announcer;
    readonly readonlySegmentsSet: Set<SegmentPart>;
    segmentStates: import("../../internal/date-time/field/types.js").SegmentStateMap;
    descriptionNode: HTMLElement | null;
    validationNode: HTMLElement | null;
    states: import("../../internal/date-time/field/types.js").SegmentStateMap;
    dayPeriodNode: HTMLElement | null;
    rangeRoot: DateRangeFieldRootState | undefined;
    name: string;
    domContext: DOMContext;
    constructor(props: DateFieldRootStateOpts, rangeRoot?: DateRangeFieldRootState);
    setName(name: string): void;
    /**
     * Sets the field node for the `DateFieldRootState` instance. We use this method so we can
     * keep `#fieldNode` private to prevent accidental usage of the incorrect field node.
     */
    setFieldNode(node: HTMLElement | null): void;
    /**
     * Gets the correct field node for the date field regardless of whether it's being
     * used in a standalone context or within a `DateRangeField` component.
     */
    getFieldNode(): HTMLElement | null;
    /**
     * Sets the label node for the `DateFieldRootState` instance. We use this method so we can
     * keep `#labelNode` private to prevent accidental usage of the incorrect label node.
     */
    setLabelNode(node: HTMLElement | null): void;
    /**
     * Gets the correct label node for the date field regardless of whether it's being used in
     * a standalone context or within a `DateRangeField` component.
     */
    getLabelNode(): HTMLElement | null;
    setValue(value: DateValue | undefined): void;
    syncSegmentValues(value: DateValue): void;
    readonly validationStatus: false | {
        readonly reason: "custom";
        readonly message: string | string[];
    } | {
        readonly reason: "min";
        readonly message?: undefined;
    } | {
        readonly reason: "max";
        readonly message?: undefined;
    };
    readonly isInvalid: boolean;
    readonly inferredGranularity: Granularity;
    readonly dateRef: DateValue;
    readonly allSegmentContent: {
        obj: import("../../internal/date-time/field/types.js").SegmentContentObj;
        arr: {
            part: import("../../internal/date-time/field/types.js").SegmentPart;
            value: string;
        }[];
    };
    readonly segmentContents: {
        part: import("../../internal/date-time/field/types.js").SegmentPart;
        value: string;
    }[];
    readonly sharedSegmentAttrs: {
        role: string;
        contenteditable: string;
        tabindex: number;
        spellcheck: boolean;
        inputmode: string;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    };
    updateSegment<T extends keyof DateAndTimeSegmentObj>(part: T, cb: T extends DateSegmentPart ? Updater<DateSegmentObj[T]> : T extends EditableTimeSegmentPart ? Updater<TimeSegmentObj[T]> : Updater<DateAndTimeSegmentObj[T]>): void;
    handleSegmentClick(e: BitsMouseEvent): void;
    getBaseSegmentAttrs(part: SegmentPart, segmentId: string): {
        [dateFieldAttrs.segment]: string;
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
    } | {
        "aria-labelledby": string;
        contenteditable: string | undefined;
        "aria-describedby": string | undefined;
        tabindex: number | undefined;
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
    };
}
interface DateFieldInputStateOpts extends WithRefOpts, ReadableBoxedValues<{
    name: string;
}> {
}
export declare class DateFieldInputState {
    #private;
    static create(opts: DateFieldInputStateOpts): DateFieldInputState;
    readonly opts: DateFieldInputStateOpts;
    readonly root: DateFieldRootState;
    readonly domContext: DOMContext;
    readonly attachment: RefAttachment;
    constructor(opts: DateFieldInputStateOpts, root: DateFieldRootState);
    readonly props: {
        readonly id: string;
        readonly role: "group";
        readonly "aria-labelledby": string | undefined;
        readonly "aria-describedby": string | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
    };
}
export declare class DateFieldHiddenInputState {
    static create(): DateFieldHiddenInputState;
    readonly root: DateFieldRootState;
    readonly shouldRender: boolean;
    readonly isoValue: string;
    constructor(root: DateFieldRootState);
    readonly props: {
        name: string;
        value: string;
        required: boolean;
    };
}
interface DateFieldLabelStateOpts extends WithRefOpts {
}
export declare class DateFieldLabelState {
    static create(opts: DateFieldLabelStateOpts): DateFieldLabelState;
    readonly opts: DateFieldLabelStateOpts;
    readonly root: DateFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: DateFieldLabelStateOpts, root: DateFieldRootState);
    onclick(_: BitsMouseEvent): void;
    readonly props: {
        readonly id: string;
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
declare abstract class BaseNumericSegmentState {
    #private;
    readonly opts: WithRefOpts;
    readonly root: DateFieldRootState;
    readonly announcer: Announcer;
    readonly part: string;
    readonly config: SegmentConfig;
    readonly attachment: RefAttachment;
    constructor(opts: WithRefOpts, root: DateFieldRootState, part: string, config: SegmentConfig);
    onkeydown(e: BitsKeyboardEvent): void;
    onfocusout(_: BitsFocusEvent): void;
    getSegmentProps(): {
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": string;
    };
    readonly props: {
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
        onkeydown: (e: BitsKeyboardEvent) => void;
        onfocusout: (_: BitsFocusEvent) => void;
        onclick: (e: BitsMouseEvent) => void;
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": string;
        id: string;
        role: string;
        contenteditable: string;
        tabindex: number;
        spellcheck: boolean;
        inputmode: string;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    } | {
        "aria-labelledby": string;
        contenteditable: string | undefined;
        "aria-describedby": string | undefined;
        tabindex: number | undefined;
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
        onkeydown: (e: BitsKeyboardEvent) => void;
        onfocusout: (_: BitsFocusEvent) => void;
        onclick: (e: BitsMouseEvent) => void;
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": string;
        id: string;
        role: string;
        spellcheck: boolean;
        inputmode: string;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    };
}
declare class DateFieldYearSegmentState extends BaseNumericSegmentState {
    #private;
    constructor(opts: WithRefOpts, root: DateFieldRootState);
    onkeydown(e: BitsKeyboardEvent): void;
    onfocusout(_: BitsFocusEvent): void;
}
declare class DateFieldDaySegmentState extends BaseNumericSegmentState {
    constructor(opts: WithRefOpts, root: DateFieldRootState);
}
declare class DateFieldMonthSegmentState extends BaseNumericSegmentState {
    constructor(opts: WithRefOpts, root: DateFieldRootState);
}
declare class DateFieldHourSegmentState extends BaseNumericSegmentState {
    constructor(opts: WithRefOpts, root: DateFieldRootState);
    onkeydown(e: BitsKeyboardEvent): void;
}
declare class DateFieldMinuteSegmentState extends BaseNumericSegmentState {
    constructor(opts: WithRefOpts, root: DateFieldRootState);
}
declare class DateFieldSecondSegmentState extends BaseNumericSegmentState {
    constructor(opts: WithRefOpts, root: DateFieldRootState);
}
interface DateFieldDayPeriodSegmentStateOpts extends WithRefOpts {
}
export declare class DateFieldDayPeriodSegmentState {
    #private;
    static create(opts: DateFieldDayPeriodSegmentStateOpts): DateFieldDayPeriodSegmentState;
    readonly opts: DateFieldDayPeriodSegmentStateOpts;
    readonly root: DateFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: DateFieldDayPeriodSegmentStateOpts, root: DateFieldRootState);
    onkeydown(e: BitsKeyboardEvent): void;
    readonly props: {
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
        id: string;
        inputmode: string;
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": "AM" | "PM";
        onkeydown: (e: BitsKeyboardEvent) => void;
        onclick: (e: BitsMouseEvent) => void;
        role: string;
        contenteditable: string;
        tabindex: number;
        spellcheck: boolean;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    } | {
        "aria-labelledby": string;
        contenteditable: string | undefined;
        "aria-describedby": string | undefined;
        tabindex: number | undefined;
        "aria-invalid": "true" | undefined;
        "aria-disabled": "true" | "false";
        "aria-readonly": "true" | "false";
        "data-invalid": "" | undefined;
        "data-disabled": "" | undefined;
        "data-readonly": "" | undefined;
        "data-segment": string;
        id: string;
        inputmode: string;
        "aria-label": string;
        "aria-valuemin": number;
        "aria-valuemax": number;
        "aria-valuenow": number;
        "aria-valuetext": "AM" | "PM";
        onkeydown: (e: BitsKeyboardEvent) => void;
        onclick: (e: BitsMouseEvent) => void;
        role: string;
        spellcheck: boolean;
        autocorrect: string;
        enterkeyhint: string;
        style: {
            caretColor: string;
        };
    } | undefined;
}
interface DateFieldLiteralSegmentStateOpts extends WithRefOpts {
}
export declare class DateFieldLiteralSegmentState {
    static create(opts: DateFieldLiteralSegmentStateOpts): DateFieldLiteralSegmentState;
    readonly opts: DateFieldLiteralSegmentStateOpts;
    readonly root: DateFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: DateFieldLiteralSegmentStateOpts, root: DateFieldRootState);
    readonly props: {
        readonly "aria-invalid": "true" | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-readonly": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
        readonly "data-segment": string;
        readonly id: string;
        readonly "aria-hidden": "true" | undefined;
    } | {
        readonly "aria-labelledby": string;
        readonly contenteditable: string | undefined;
        readonly "aria-describedby": string | undefined;
        readonly tabindex: number | undefined;
        readonly "aria-invalid": "true" | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-readonly": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
        readonly "data-segment": string;
        readonly id: string;
        readonly "aria-hidden": "true" | undefined;
    };
}
interface DateFieldTimeZoneSegmentStateOpts extends WithRefOpts {
}
export declare class DateFieldTimeZoneSegmentState {
    static create(opts: DateFieldTimeZoneSegmentStateOpts): DateFieldTimeZoneSegmentState;
    readonly opts: DateFieldTimeZoneSegmentStateOpts;
    readonly root: DateFieldRootState;
    readonly attachment: RefAttachment;
    constructor(opts: DateFieldTimeZoneSegmentStateOpts, root: DateFieldRootState);
    onkeydown(e: BitsKeyboardEvent): void;
    readonly props: {
        readonly "data-readonly": "" | undefined;
        readonly "aria-invalid": "true" | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-readonly": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-segment": string;
        readonly role: "textbox";
        readonly id: string;
        readonly "aria-label": "timezone, ";
        readonly style: {
            readonly caretColor: "transparent";
        };
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    } | {
        readonly "data-readonly": "" | undefined;
        readonly "aria-labelledby": string;
        readonly contenteditable: string | undefined;
        readonly "aria-describedby": string | undefined;
        readonly tabindex: number | undefined;
        readonly "aria-invalid": "true" | undefined;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-readonly": "true" | "false";
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-segment": string;
        readonly role: "textbox";
        readonly id: string;
        readonly "aria-label": "timezone, ";
        readonly style: {
            readonly caretColor: "transparent";
        };
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
export declare class DateFieldSegmentState {
    static create(part: SegmentPart, opts: WithRefOpts): DateFieldYearSegmentState | DateFieldDaySegmentState | DateFieldMonthSegmentState | DateFieldHourSegmentState | DateFieldMinuteSegmentState | DateFieldSecondSegmentState | DateFieldDayPeriodSegmentState | DateFieldLiteralSegmentState | DateFieldTimeZoneSegmentState;
}
export {};
