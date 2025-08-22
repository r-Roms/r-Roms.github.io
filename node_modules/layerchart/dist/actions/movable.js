export const movable = (node, options = {}) => {
    let lastX = 0;
    let lastY = 0;
    let moved = false;
    function onMouseDown(event) {
        lastX = event.clientX;
        lastY = event.clientY;
        moved = false;
        options?.onMoveStart?.(new CustomEvent('movestart', { detail: { x: lastX, y: lastY } }));
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }
    node.addEventListener('mousedown', onMouseDown);
    function onMouseMove(event) {
        moved = true;
        // TODO: Handle page scroll?  clientX/Y is based on viewport (apply to parent?)
        let dx = event.clientX - lastX;
        let dy = event.clientY - lastY;
        const xEnabled = options?.axis?.includes('x') ?? true;
        const yEnabled = options?.axis?.includes('y') ?? true;
        if (options.step) {
            if (Math.abs(dx) >= options.step) {
                const overStep = dx % options.step;
                dx = dx - overStep;
                lastX = event.clientX - overStep;
            }
            else {
                dx = 0;
            }
            if (Math.abs(dy) >= options.step) {
                const overStep = dy % options.step;
                dy = dy - overStep;
                lastY = event.clientY - overStep;
            }
            else {
                dy = 0;
            }
        }
        else if (options.stepPercent) {
            const parentWidth = node.parentElement?.offsetWidth ?? 0;
            const parentHeight = node.parentElement?.offsetHeight ?? 0;
            if (Math.abs(dx / parentWidth) >= options.stepPercent) {
                const overStep = dx % (parentWidth * options.stepPercent);
                dx = dx - overStep;
                lastX = event.clientX - overStep;
            }
            else {
                dx = 0;
            }
            if (Math.abs(dy / parentHeight) >= options.stepPercent) {
                const overStep = dy % (parentHeight * options.stepPercent);
                dy = dy - overStep;
                lastY = event.clientY - overStep;
            }
            else {
                dy = 0;
            }
        }
        else {
            lastX = event.clientX;
            lastY = event.clientY;
        }
        if ((xEnabled && dx) || (yEnabled && dy)) {
            options.onMove?.(new CustomEvent('move', {
                detail: { x: lastX, y: lastX, dx: xEnabled ? dx : 0, dy: yEnabled ? dy : 0 },
            }));
        }
        else {
            // Not enough change
        }
    }
    function onMouseUp(event) {
        lastX = event.clientX;
        lastY = event.clientY;
        options.onMoveEnd?.(new CustomEvent('moveend', { detail: { x: lastX, y: lastY } }));
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }
    function onClick(event) {
        if (moved) {
            event.stopImmediatePropagation();
        }
    }
    node.addEventListener('click', onClick);
    return {
        destroy() {
            node.removeEventListener('mousedown', onMouseDown);
            node.removeEventListener('click', onClick);
        },
    };
};
