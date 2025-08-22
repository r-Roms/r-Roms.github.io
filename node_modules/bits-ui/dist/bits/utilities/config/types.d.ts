import type { WithChildren } from "../../../internal/types.js";
import type { PortalTarget } from "../portal/types.js";
export type BitsConfigPropsWithoutChildren = {
    /**
     * The default portal `to`/target to use for the `Portal` components throughout the app.
     */
    defaultPortalTo?: PortalTarget;
    /**
     * The default locale to use for the components that support localization.
     */
    defaultLocale?: string;
};
export type BitsConfigProps = WithChildren<BitsConfigPropsWithoutChildren>;
