import { Accordion as AccordionPrimitive } from "bits-ui";
declare const AccordionContent: import("svelte").Component<Omit<AccordionPrimitive.ContentProps, "child">, {}, "ref">;
type AccordionContent = ReturnType<typeof AccordionContent>;
export default AccordionContent;
