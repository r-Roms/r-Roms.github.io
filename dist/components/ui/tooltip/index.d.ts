import { Tooltip as TooltipPrimitive } from "bits-ui";
import Trigger from "./tooltip-trigger.svelte";
import Content from "./tooltip-content.svelte";
declare const Root: import("svelte").Component<TooltipPrimitive.RootProps, {}, "open">;
declare const Provider: import("svelte").Component<TooltipPrimitive.ProviderProps, {}, "">;
declare const Portal: import("svelte").Component<TooltipPrimitive.PortalProps, {}, "">;
export { Root, Trigger, Content, Provider, Portal, Root as Tooltip, Content as TooltipContent, Trigger as TooltipTrigger, Provider as TooltipProvider, Portal as TooltipPortal, };
