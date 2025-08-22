import { describe, it, expect } from 'vitest';
import { greatestAbs, sumObjects } from './array.js';
import { testDateStr } from './date.test.js';
describe('sumObjects', () => {
    it('Sum array of objects ', () => {
        const values = [
            { one: 1, two: 2, three: '3', extra: 'Hello' },
            { one: 2, two: '4', three: 6 },
            { one: null, two: null, three: null, four: null },
            { one: NaN, two: NaN, three: NaN, four: NaN },
            { one: 'NaN', two: 'NaN', three: 'NaN', four: 'NaN' },
            { one: '3', two: 6, four: '4', startDate: new Date(testDateStr) },
        ];
        const actual = sumObjects(values);
        const expected = {
            one: 6,
            two: 12,
            three: 9,
            four: 4,
            extra: 0,
            startDate: +new Date(testDateStr),
        };
        expect(actual).toEqual(expected);
    });
});
describe('greatestAbs', () => {
    it('should return negative number when greatest abs value', () => {
        const actual = greatestAbs([10, -13, 0]);
        const expected = -13;
        expect(actual).toEqual(expected);
    });
    it('should return positive number when greatest abs value', () => {
        const actual = greatestAbs([20, -13, 0]);
        const expected = 20;
        expect(actual).toEqual(expected);
    });
});
