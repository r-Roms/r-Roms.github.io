import { flatMorph } from "@ark/util";
import { schemaKindsRightOf } from "../shared/implement.js";
export const defineRightwardIntersections = (kind, implementation) => flatMorph(schemaKindsRightOf(kind), (i, kind) => [
    kind,
    implementation
]);
