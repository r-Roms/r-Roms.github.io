import { kbd } from "../../internal/kbd.js";
export const SELECTION_KEYS = [kbd.ENTER, kbd.SPACE];
export const FIRST_KEYS = [kbd.ARROW_DOWN, kbd.PAGE_UP, kbd.HOME];
export const LAST_KEYS = [kbd.ARROW_UP, kbd.PAGE_DOWN, kbd.END];
export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
export const SUB_OPEN_KEYS = {
    ltr: [...SELECTION_KEYS, kbd.ARROW_RIGHT],
    rtl: [...SELECTION_KEYS, kbd.ARROW_LEFT],
};
export const SUB_CLOSE_KEYS = {
    ltr: [kbd.ARROW_LEFT],
    rtl: [kbd.ARROW_RIGHT],
};
export function isIndeterminate(checked) {
    return checked === "indeterminate";
}
export function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
export function isMouseEvent(event) {
    return event.pointerType === "mouse";
}
