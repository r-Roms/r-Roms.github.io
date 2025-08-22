export function onDestroyEffect(fn) {
    $effect(() => {
        return () => {
            fn();
        };
    });
}
