import * as ResizablePrimitive from "paneforge";
import { type WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = WithoutChildrenOrChild<ResizablePrimitive.PaneResizerProps> & {
    withHandle?: boolean;
};
declare const ResizableHandle: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ResizableHandle = ReturnType<typeof ResizableHandle>;
export default ResizableHandle;
