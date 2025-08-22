import { splitPath } from '../stringPath.js';
import { traversePath } from '../traversal.js';
const noCustomValidityDataAttribute = 'noCustomValidity';
export async function updateCustomValidity(validityEl, errors) {
    // Always reset validity, in case it has been validated on the server.
    if ('setCustomValidity' in validityEl) {
        validityEl.setCustomValidity('');
    }
    if (noCustomValidityDataAttribute in validityEl.dataset)
        return;
    setCustomValidity(validityEl, errors);
}
export function setCustomValidityForm(formElement, errors) {
    for (const el of formElement.querySelectorAll('input,select,textarea,button')) {
        if (('dataset' in el && noCustomValidityDataAttribute in el.dataset) || !el.name) {
            continue;
        }
        const path = traversePath(errors, splitPath(el.name));
        const error = path && typeof path.value === 'object' && '_errors' in path.value
            ? path.value._errors
            : path?.value;
        setCustomValidity(el, error);
        if (error)
            return;
    }
}
function setCustomValidity(el, errors) {
    if (!('setCustomValidity' in el))
        return;
    const message = errors && errors.length ? errors.join('\n') : '';
    el.setCustomValidity(message);
    if (message)
        el.reportValidity();
}
