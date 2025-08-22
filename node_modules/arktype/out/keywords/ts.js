import { genericNode, intrinsic, node } from "@ark/schema";
import { Hkt } from "@ark/util";
import { Scope } from "../scope.js";
export const arkTsKeywords = Scope.module({
    bigint: intrinsic.bigint,
    boolean: intrinsic.boolean,
    false: intrinsic.false,
    never: intrinsic.never,
    null: intrinsic.null,
    number: intrinsic.number,
    object: intrinsic.object,
    string: intrinsic.string,
    symbol: intrinsic.symbol,
    true: intrinsic.true,
    unknown: intrinsic.unknown,
    undefined: intrinsic.undefined
});
export const unknown = Scope.module({
    root: intrinsic.unknown,
    any: intrinsic.unknown
}, {
    name: "unknown"
});
export const json = Scope.module({
    root: intrinsic.jsonObject,
    stringify: node("morph", {
        in: intrinsic.jsonObject,
        morphs: (data) => JSON.stringify(data),
        declaredOut: intrinsic.string
    })
}, {
    name: "object.json"
});
export const object = Scope.module({
    root: intrinsic.object,
    json
}, {
    name: "object"
});
class RecordHkt extends Hkt {
    description = 'instantiate an object from an index signature and corresponding value type like `Record("string", "number")`';
}
const Record = genericNode(["K", intrinsic.key], "V")(args => ({
    domain: "object",
    index: {
        signature: args.K,
        value: args.V
    }
}), RecordHkt);
class PickHkt extends Hkt {
    description = 'pick a set of properties from an object like `Pick(User, "name | age")`';
}
const Pick = genericNode(["T", intrinsic.object], ["K", intrinsic.key])(args => args.T.pick(args.K), PickHkt);
class OmitHkt extends Hkt {
    description = 'omit a set of properties from an object like `Omit(User, "age")`';
}
const Omit = genericNode(["T", intrinsic.object], ["K", intrinsic.key])(args => args.T.omit(args.K), OmitHkt);
class PartialHkt extends Hkt {
    description = "make all named properties of an object optional like `Partial(User)`";
}
const Partial = genericNode(["T", intrinsic.object])(args => args.T.partial(), PartialHkt);
class RequiredHkt extends Hkt {
    description = "make all named properties of an object required like `Required(User)`";
}
const Required = genericNode(["T", intrinsic.object])(args => args.T.required(), RequiredHkt);
class ExcludeHkt extends Hkt {
    description = 'exclude branches of a union like `Exclude("boolean", "true")`';
}
const Exclude = genericNode("T", "U")(args => args.T.exclude(args.U), ExcludeHkt);
class ExtractHkt extends Hkt {
    description = 'extract branches of a union like `Extract("0 | false | 1", "number")`';
}
const Extract = genericNode("T", "U")(args => args.T.extract(args.U), ExtractHkt);
export const arkTsGenerics = Scope.module({
    Exclude,
    Extract,
    Omit,
    Partial,
    Pick,
    Record,
    Required
});
