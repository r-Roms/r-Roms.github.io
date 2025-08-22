import { describe, it, expect } from 'vitest';
import { SelectionState } from './selectionState.svelte.js';
describe('SelectionState', () => {
    it('should be empty array by default', () => {
        const selectionState = new SelectionState();
        expect(selectionState.current).instanceOf(Array);
        expect(selectionState.current.length).toEqual(0);
    });
    it('should contain initial values', () => {
        const selectionState = new SelectionState({ initial: ['a', 'b', 'c'] });
        expect(selectionState.current.length).toEqual(3);
        expect(selectionState.current.includes('a')).toBe(true);
        expect(selectionState.current.includes('b')).toBe(true);
        expect(selectionState.current.includes('c')).toBe(true);
    });
    it('should clear', () => {
        const selectionState = new SelectionState({ initial: ['a', 'b', 'c'] });
        expect(selectionState.current.length).toEqual(3);
        selectionState.clear();
        expect(selectionState.current.length).toEqual(0);
    });
    it('should reset to initial values', () => {
        const selectionState = new SelectionState({ initial: ['a', 'b', 'c'] });
        expect(selectionState.current.length).toEqual(3);
        selectionState.toggle('d');
        expect(selectionState.current.length).toEqual(4);
        selectionState.reset();
        expect(selectionState.current.length).toEqual(3);
        expect(Array.from(selectionState.current)).toEqual(['a', 'b', 'c']);
        selectionState.clear();
        expect(selectionState.current.length).toEqual(0);
        selectionState.reset();
        expect(selectionState.current.length).toEqual(3);
        expect(Array.from(selectionState.current)).toEqual(['a', 'b', 'c']);
    });
    it('should toggle value', () => {
        const selectionState = new SelectionState();
        expect(selectionState.current.length).toEqual(0);
        selectionState.toggle('a');
        expect(selectionState.current.length).toEqual(1);
        expect(selectionState.current.includes('a')).toBe(true);
        selectionState.toggle('a');
        expect(selectionState.current.length).toEqual(0);
        expect(selectionState.current.includes('a')).toBe(false);
    });
    it('should toggle all', () => {
        const selectionState = new SelectionState({ all: ['a', 'b', 'c'] });
        expect(selectionState.current.length).toEqual(0);
        selectionState.toggleAll();
        expect(selectionState.current.length).toEqual(3);
        expect(Array.from(selectionState.current)).toEqual(['a', 'b', 'c']);
    });
    it('should check if any values are selected', () => {
        const selectionState = new SelectionState({ all: ['a', 'b', 'c'] });
        expect(selectionState.isAnySelected()).toBe(false);
        selectionState.toggle('a');
        expect(selectionState.isAnySelected()).toBe(true);
    });
    it('should check if all values are selected', () => {
        const selectionState = new SelectionState({ all: ['a', 'b', 'c'] });
        expect(selectionState.isAllSelected()).toBe(false);
        selectionState.toggle('a');
        expect(selectionState.isAllSelected()).toBe(false);
        selectionState.toggle('b');
        expect(selectionState.isAllSelected()).toBe(false);
        selectionState.toggle('c');
        expect(selectionState.isAllSelected()).toBe(true);
    });
    it('should limit max', () => {
        const selectionState = new SelectionState({ max: 2 });
        expect(selectionState.max).toEqual(2);
        expect(selectionState.isMaxSelected()).toBe(false);
        selectionState.toggle('a');
        selectionState.toggle('b');
        selectionState.toggle('c');
        expect(selectionState.current.length).toEqual(2);
        expect(Array.from(selectionState.current)).toEqual(['a', 'b']);
        expect(selectionState.isMaxSelected()).toBe(true);
    });
    it('should check if value is disabled', () => {
        const selectionState = new SelectionState({ max: 2 });
        expect(selectionState.max).toEqual(2);
        selectionState.toggle('a');
        selectionState.toggle('b');
        expect(selectionState.isDisabled('a')).toBe(false);
        expect(selectionState.isDisabled('b')).toBe(false);
        expect(selectionState.isDisabled('c')).toBe(true);
    });
});
