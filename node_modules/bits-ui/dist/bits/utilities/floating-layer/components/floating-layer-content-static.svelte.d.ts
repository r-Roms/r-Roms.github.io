import { type Snippet } from "svelte";
type $$ComponentProps = {
    content?: Snippet<[
        {
            props: Record<string, unknown>;
            wrapperProps: Record<string, unknown>;
        }
    ]>;
    onPlaced?: () => void;
};
declare const FloatingLayerContentStatic: import("svelte").Component<$$ComponentProps, {}, "">;
type FloatingLayerContentStatic = ReturnType<typeof FloatingLayerContentStatic>;
export default FloatingLayerContentStatic;
