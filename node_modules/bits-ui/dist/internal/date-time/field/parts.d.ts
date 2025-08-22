export declare const DATE_SEGMENT_PARTS: readonly ["day", "month", "year"];
export declare const EDITABLE_TIME_SEGMENT_PARTS: readonly ["hour", "minute", "second", "dayPeriod"];
export declare const NON_EDITABLE_SEGMENT_PARTS: readonly ["literal", "timeZoneName"];
export declare const EDITABLE_SEGMENT_PARTS: readonly ["day", "month", "year", "hour", "minute", "second", "dayPeriod"];
export declare const ALL_SEGMENT_PARTS: readonly ["day", "month", "year", "hour", "minute", "second", "dayPeriod", "literal", "timeZoneName"];
export declare const ALL_TIME_SEGMENT_PARTS: readonly ["hour", "minute", "second", "dayPeriod", "literal", "timeZoneName"];
export declare const ALL_EXCEPT_LITERAL_PARTS: ("day" | "month" | "year" | "hour" | "minute" | "second" | "dayPeriod" | "timeZoneName")[];
export declare const ALL_TIME_EXCEPT_LITERAL_PARTS: ("hour" | "minute" | "second" | "dayPeriod" | "timeZoneName")[];
