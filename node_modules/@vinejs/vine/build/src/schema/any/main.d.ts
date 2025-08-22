import { BaseLiteralType } from '../base/literal.js';
import type { FieldOptions, Validation } from '../../types.js';
import { SUBTYPE } from '../../symbols.js';
/**
 * VineAny represents a value that can be anything
 */
export declare class VineAny extends BaseLiteralType<any, any, any> {
    constructor(options?: Partial<FieldOptions>, validations?: Validation<any>[]);
    /**
     * The subtype of the literal schema field
     */
    [SUBTYPE]: string;
    /**
     * Clones the VineAny schema type. The applied options
     * and validations are copied to the new instance
     */
    clone(): this;
}
