export const DATE_SEGMENT_PARTS = ["day", "month", "year"];
export const EDITABLE_TIME_SEGMENT_PARTS = ["hour", "minute", "second", "dayPeriod"];
export const NON_EDITABLE_SEGMENT_PARTS = ["literal", "timeZoneName"];
export const EDITABLE_SEGMENT_PARTS = [
    ...DATE_SEGMENT_PARTS,
    ...EDITABLE_TIME_SEGMENT_PARTS,
];
export const ALL_SEGMENT_PARTS = [
    ...EDITABLE_SEGMENT_PARTS,
    ...NON_EDITABLE_SEGMENT_PARTS,
];
export const ALL_TIME_SEGMENT_PARTS = [
    ...EDITABLE_TIME_SEGMENT_PARTS,
    ...NON_EDITABLE_SEGMENT_PARTS,
];
export const ALL_EXCEPT_LITERAL_PARTS = ALL_SEGMENT_PARTS.filter((part) => part !== "literal");
export const ALL_TIME_EXCEPT_LITERAL_PARTS = ALL_TIME_SEGMENT_PARTS.filter((part) => part !== "literal");
