/**
 * Apply changes to an HTMLElement with the ability to reverse.
 * Useful with Svelte actions when being destroyed
 */
export default class DomTracker {
    node;
    changes;
    constructor(node) {
        this.node = node;
        this.changes = {
            classes: [],
            styles: [],
            attributes: [],
            eventListeners: [],
            actions: new Map(),
        };
    }
    addClass(className) {
        this.node.classList.add(className);
        this.changes.classes.push(className);
    }
    addStyle(property, value) {
        this.node.style.setProperty(property, value);
        this.changes.styles.push({ property, value });
    }
    addAttribute(qualifiedName, value) {
        this.node.setAttribute(qualifiedName, value);
        this.changes.attributes.push({ qualifiedName, value });
    }
    addEventListener(type, listener) {
        this.node.addEventListener(type, listener);
        this.changes.eventListeners.push({ type, listener });
    }
    addAction(action, options) {
        const existingAction = this.changes.actions.get(action.name);
        if (existingAction) {
            // Action already created, call action's update() (if available)
            existingAction.update?.(options);
        }
        else {
            // Add new action
            this.changes.actions.set(action.name, action(this.node, options));
        }
    }
    reset() {
        this.changes.classes.forEach((className) => {
            this.node.classList.remove(className);
        });
        this.changes.styles.forEach(({ property, value }) => {
            this.node.style.removeProperty(property);
        });
        this.changes.attributes.forEach(({ qualifiedName, value }) => {
            this.node.removeAttribute(qualifiedName);
        });
        this.changes.eventListeners.forEach(({ type, listener }) => {
            this.node.removeEventListener(type, listener);
        });
        // Do not destroy actions so internal state is kept
        this.changes = {
            ...this.changes,
            classes: [],
            styles: [],
            attributes: [],
            eventListeners: [],
        };
    }
    destroy() {
        this.reset();
        // Destroy actions (cleanup any global state like actions on `window`, etc)
        for (var action of this.changes.actions.values()) {
            if (action) {
                action.destroy?.();
            }
        }
    }
}
