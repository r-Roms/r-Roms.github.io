import { describe, it, expect } from 'vitest';
import { UniqueState } from './uniqueState.svelte.js';
describe('UniqueState', () => {
    it('should be empty set by default', () => {
        const uniqueState = new UniqueState();
        expect(uniqueState.current).instanceOf(Set);
        expect(uniqueState.current.size).toEqual(0);
    });
    it('should contain initial values', () => {
        const uniqueState = new UniqueState(['a', 'b', 'c']);
        expect(uniqueState.current.size).toEqual(3);
        expect(uniqueState.current.has('a')).toBe(true);
        expect(uniqueState.current.has('b')).toBe(true);
        expect(uniqueState.current.has('c')).toBe(true);
    });
    it('should toggle value', () => {
        const uniqueState = new UniqueState();
        expect(uniqueState.current.size).toEqual(0);
        uniqueState.toggle('a');
        expect(uniqueState.current.size).toEqual(1);
        expect(uniqueState.current.has('a')).toBe(true);
        uniqueState.toggle('a');
        expect(uniqueState.current.size).toEqual(0);
        expect(uniqueState.current.has('a')).toBe(false);
    });
    it('should add multiple values', () => {
        const uniqueState = new UniqueState();
        uniqueState.addEach(['a', 'b', 'c']);
        expect(uniqueState.current.size).toEqual(3);
        expect(uniqueState.current.has('a')).toBe(true);
        expect(uniqueState.current.has('b')).toBe(true);
        expect(uniqueState.current.has('c')).toBe(true);
    });
    it('should clear', () => {
        const uniqueState = new UniqueState(['a', 'b', 'c']);
        expect(uniqueState.current.size).toEqual(3);
        uniqueState.clear();
        expect(uniqueState.current.size).toEqual(0);
    });
    it('should reset to initial values', () => {
        const uniqueState = new UniqueState(['a', 'b', 'c']);
        expect(uniqueState.current.size).toEqual(3);
        uniqueState.add('d');
        expect(uniqueState.current.size).toEqual(4);
        uniqueState.reset();
        expect(uniqueState.current.size).toEqual(3);
        expect(Array.from(uniqueState.current)).toEqual(['a', 'b', 'c']);
        uniqueState.clear();
        expect(uniqueState.current.size).toEqual(0);
        uniqueState.reset();
        expect(uniqueState.current.size).toEqual(3);
        expect(Array.from(uniqueState.current)).toEqual(['a', 'b', 'c']);
    });
});
