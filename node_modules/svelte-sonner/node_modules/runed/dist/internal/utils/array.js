/**
 * Get nth item of Array. Negative for backward
 */
export function at(array, index) {
    const len = array.length;
    if (!len)
        return undefined;
    if (index < 0)
        index += len;
    return array[index];
}
export function last(array) {
    return array[array.length - 1];
}
