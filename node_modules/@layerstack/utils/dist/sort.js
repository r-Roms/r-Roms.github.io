import { propAccessor } from './object.js';
export function sortFunc(value, direction = 'asc') {
    const sortDirection = direction === 'asc' ? 1 : -1;
    return (a, b) => {
        const valueFn = propAccessor(value);
        const aValue = valueFn(a);
        const bValue = valueFn(b);
        if (aValue == null || bValue == null) {
            if (aValue == null && bValue != null) {
                return -sortDirection;
            }
            else if (aValue != null && bValue == null) {
                return sortDirection;
            }
            else {
                // both `null`
                return 0;
            }
        }
        return aValue < bValue ? -sortDirection : aValue > bValue ? sortDirection : 0;
    };
}
export function compoundSortFunc(...sortFns) {
    return (a, b) => {
        for (let i = 0; i < sortFns.length; i++) {
            let result = sortFns[i](a, b);
            if (result != 0) {
                return result;
            }
        }
        return 0;
    };
}
/** Make a shallow copy and appy sort */
export function sort(data, value, direction = 'asc') {
    return [...data].sort(sortFunc(value, direction));
}
export function nestedSort(data, sortFunc, depth = 0) {
    data.sort((a, b) => sortFunc(a, b, depth));
    data.forEach((d) => {
        if (d.values) {
            nestedSort(d.values, sortFunc, depth + 1);
        }
    });
    return data;
}
