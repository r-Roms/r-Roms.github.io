import { genericNode, intrinsic, rootSchema } from "@ark/schema";
import { Hkt, liftArray } from "@ark/util";
import { Scope } from "../scope.js";
class liftFromHkt extends Hkt {
}
const liftFrom = genericNode("element")(args => {
    const nonArrayElement = args.element.exclude(intrinsic.Array);
    const lifted = nonArrayElement.array();
    return nonArrayElement
        .rawOr(lifted)
        .pipe(liftArray)
        .distribute(branch => branch.assertHasKind("morph").declareOut(lifted), rootSchema);
}, liftFromHkt);
export const arkArray = Scope.module({
    root: intrinsic.Array,
    readonly: "root",
    index: intrinsic.nonNegativeIntegerString,
    liftFrom
}, {
    name: "Array"
});
