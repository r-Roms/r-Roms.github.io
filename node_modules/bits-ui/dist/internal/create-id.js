export function createId(prefixOrUid, uid) {
    if (uid === undefined)
        return `bits-${prefixOrUid}`;
    return `bits-${prefixOrUid}-${uid}`;
}
