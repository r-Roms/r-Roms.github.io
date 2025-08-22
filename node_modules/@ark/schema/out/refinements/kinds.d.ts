import type { BaseConstraint } from "../constraint.ts";
import type { BoundKind, nodeImplementationOf } from "../shared/implement.ts";
import { After } from "./after.ts";
import { Before } from "./before.ts";
import { ExactLength } from "./exactLength.ts";
import { Max } from "./max.ts";
import { MaxLength } from "./maxLength.ts";
import { Min } from "./min.ts";
import { MinLength } from "./minLength.ts";
export interface BoundDeclarations {
    min: Min.Declaration;
    max: Max.Declaration;
    minLength: MinLength.Declaration;
    maxLength: MaxLength.Declaration;
    exactLength: ExactLength.Declaration;
    after: After.Declaration;
    before: Before.Declaration;
}
export interface BoundNodesByKind {
    min: Min.Node;
    max: Max.Node;
    minLength: MinLength.Node;
    maxLength: MaxLength.Node;
    exactLength: ExactLength.Node;
    after: After.Node;
    before: Before.Node;
}
export type boundImplementationsByKind = {
    [k in BoundKind]: nodeImplementationOf<BoundDeclarations[k]>;
};
export declare const boundImplementationsByKind: boundImplementationsByKind;
export declare const boundClassesByKind: Record<BoundKind, typeof BaseConstraint<any>>;
