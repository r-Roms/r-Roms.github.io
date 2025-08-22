import { genericNode, intrinsic } from "@ark/schema";
import { Hkt } from "@ark/util";
import { Scope } from "../scope.js";
class MergeHkt extends Hkt {
    description = 'merge an object\'s properties onto another like `Merge(User, { isAdmin: "true" })`';
}
const Merge = genericNode(["base", intrinsic.object], ["props", intrinsic.object])(args => args.base.merge(args.props), MergeHkt);
export const arkBuiltins = Scope.module({
    Key: intrinsic.key,
    Merge
});
