import { BaseLiteralType } from '../base/literal.js';
import type { FieldContext, FieldOptions, Validation } from '../../types.js';
import { SUBTYPE } from '../../symbols.js';
/**
 * VineEnum represents a enum data type that performs validation
 * against a pre-defined choices list.
 */
export declare class VineEnum<const Values extends readonly unknown[]> extends BaseLiteralType<Values[number], Values[number], Values[number]> {
    #private;
    /**
     * Default collection of enum rules
     */
    static rules: {
        enum: (options: {
            choices: readonly any[] | ((field: FieldContext) => readonly any[]);
        }) => Validation<{
            choices: readonly any[] | ((field: FieldContext) => readonly any[]);
        }>;
    };
    /**
     * The subtype of the literal schema field
     */
    [SUBTYPE]: string;
    /**
     * Returns the enum choices
     */
    getChoices(): Values | ((field: FieldContext) => Values);
    constructor(values: Values | ((field: FieldContext) => Values), options?: FieldOptions, validations?: Validation<any>[]);
    /**
     * Clones the VineEnum schema type. The applied options
     * and validations are copied to the new instance
     */
    clone(): this;
}
