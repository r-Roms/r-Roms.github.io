import { ObjectGroup } from './group.js';
import { CamelCase } from '../camelcase_types.js';
import { GroupConditional } from './conditional.js';
import { OTYPE, COTYPE, ITYPE } from '../../symbols.js';
import type { FieldContext, SchemaTypes, UndefinedOptional } from '../../types.js';
/**
 * Create an object group. Groups are used to conditionally merge properties
 * to an existing object.
 */
export declare function group<Conditional extends GroupConditional<any, any, any, any>>(conditionals: Conditional[]): ObjectGroup<Conditional>;
export declare namespace group {
    var _a: <Properties extends Record<string, SchemaTypes>>(conditon: (value: Record<string, unknown>, field: FieldContext) => any, properties: Properties) => GroupConditional<Properties, UndefinedOptional<{ [K in keyof Properties]: Properties[K][typeof ITYPE]; }>, UndefinedOptional<{ [K_1 in keyof Properties]: Properties[K_1][typeof OTYPE]; }>, UndefinedOptional<{ [K_2 in keyof Properties as CamelCase<K_2 & string>]: Properties[K_2][typeof COTYPE]; }>>;
    var _b: <Properties extends Record<string, SchemaTypes>>(properties: Properties) => GroupConditional<Properties, UndefinedOptional<{ [K in keyof Properties]: Properties[K][typeof ITYPE]; }>, UndefinedOptional<{ [K_1 in keyof Properties]: Properties[K_1][typeof OTYPE]; }>, UndefinedOptional<{ [K_2 in keyof Properties as CamelCase<K_2 & string>]: Properties[K_2][typeof COTYPE]; }>>;
    export { _a as if, _b as else };
}
