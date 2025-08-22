import { Context } from 'runed';
const _LegendPayloadContext = new Context('LegendContext');
export function setLegendPayloadContext(payload) {
    return _LegendPayloadContext.set(payload);
}
export function getLegendPayloadContext() {
    return _LegendPayloadContext.getOr([]);
}
