import { BaseLiteralType } from '../base/literal.js';
import type { FieldOptions, Validation } from '../../types.js';
import { SUBTYPE } from '../../symbols.js';
/**
 * VineAccepted represents a checkbox input that must be checked
 */
export declare class VineAccepted extends BaseLiteralType<'on' | '1' | 'yes' | 'true' | true | 1, true, true> {
    /**
     * Default collection of accepted rules
     */
    static rules: {
        accepted: (options?: undefined) => Validation<undefined>;
    };
    /**
     * The subtype of the literal schema field
     */
    [SUBTYPE]: string;
    constructor(options?: Partial<FieldOptions>, validations?: Validation<any>[]);
    /**
     * Clones the VineAccepted schema type. The applied options
     * and validations are copied to the new instance
     */
    clone(): this;
}
