/**
 * Helper action to handle multiple actions as a single action.  Useful for adding actions for custom components
 */
export function multi(node, actions) {
    let destroyFuncs = [];
    function update() {
        destroy();
        if (actions) {
            destroyFuncs = actions(node)
                .filter((x) => x)
                .map((x) => (x ? x.destroy : () => { }));
        }
    }
    function destroy() {
        destroyFuncs.forEach((fn) => fn?.());
    }
    if (actions?.length) {
        update();
        return { update, destroy };
    }
}
