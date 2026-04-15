import { type VariantProps } from "tailwind-variants";
export declare const tabsListVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        line: string;
    };
}, undefined, "rounded-lg p-[3px] group-data-horizontal/tabs:h-8 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col", {
    variant: {
        default: string;
        line: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    variant: {
        default: string;
        line: string;
    };
}, undefined, "rounded-lg p-[3px] group-data-horizontal/tabs:h-8 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col", unknown, unknown, undefined>>;
export type TabsListVariant = VariantProps<typeof tabsListVariants>["variant"];
import { Tabs as TabsPrimitive } from "bits-ui";
type $$ComponentProps = TabsPrimitive.ListProps & {
    variant?: TabsListVariant;
};
declare const TabsList: import("svelte").Component<$$ComponentProps, {}, "ref">;
type TabsList = ReturnType<typeof TabsList>;
export default TabsList;
