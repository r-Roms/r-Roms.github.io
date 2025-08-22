import { rootSchema } from "@ark/schema";
import { registry } from "@ark/util";
import { Scope } from "../scope.js";
const value = rootSchema(["string", registry.FileConstructor]);
const parsedFormDataValue = value.rawOr(value.array());
const parsed = rootSchema({
    meta: "an object representing parsed form data",
    domain: "object",
    index: {
        signature: "string",
        value: parsedFormDataValue
    }
});
export const arkFormData = Scope.module({
    root: ["instanceof", FormData],
    value,
    parsed,
    parse: rootSchema({
        in: FormData,
        morphs: (data) => {
            const result = {};
            for (const [k, v] of data) {
                if (k in result) {
                    const existing = result[k];
                    if (typeof existing === "string" ||
                        existing instanceof registry.FileConstructor)
                        result[k] = [existing, v];
                    else
                        existing.push(v);
                }
                else
                    result[k] = v;
            }
            return result;
        },
        declaredOut: parsed
    })
}, {
    name: "FormData"
});
