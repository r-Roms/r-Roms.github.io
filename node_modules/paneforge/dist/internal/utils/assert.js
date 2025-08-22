export function assert(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
expectedCondition, message = "Assertion failed!") {
    if (!expectedCondition) {
        console.error(message);
        throw new Error(message);
    }
}
