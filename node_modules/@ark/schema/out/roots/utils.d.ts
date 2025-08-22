import { type RootIntersection, type RootKind } from "../shared/implement.ts";
import type { schemaKindRightOf } from "./root.ts";
export declare const defineRightwardIntersections: <kind extends RootKind>(kind: kind, implementation: RootIntersection<kind, schemaKindRightOf<kind>>) => { [k in schemaKindRightOf<kind>]: RootIntersection<kind, k>; };
