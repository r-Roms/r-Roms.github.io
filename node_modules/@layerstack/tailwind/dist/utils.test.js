import { describe, it, expect } from 'vitest';
import { cls, clsMerge } from './utils.js';
describe('cls', () => {
    it('override class', () => {
        expect(cls('p-1 m-1', 'p-2')).equal('m-1 p-2');
    });
});
describe('clsMerge', () => {
    it('merge objects', () => {
        expect(clsMerge({ root: 'p-1', field: 'p-2' }, { root: 'm-1', field: 'm-2' })).eql({
            root: 'p-1 m-1',
            field: 'p-2 m-2',
        });
    });
});
