import { type Intersection, type JsonSchema } from "@ark/schema";
import { type Json } from "@ark/util";
import type { To } from "../attributes.ts";
import type { Module, Submodule } from "../module.ts";
export declare const regexStringNode: (regex: RegExp, description: string, jsonSchemaFormat?: JsonSchema.Format) => Intersection.Node;
export declare const stringInteger: stringInteger.module;
export declare namespace stringInteger {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        parse: (In: string) => To<number>;
    };
}
declare const base64: Module<{
    root: unknown;
    url: unknown;
}>;
declare namespace base64 {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        url: string;
    };
}
export declare const capitalize: capitalize.module;
export declare namespace capitalize {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string>;
        preformatted: string;
    };
}
export declare const isLuhnValid: (creditCardInput: string) => boolean;
export declare const creditCard: import("@ark/schema").BaseRoot<import("@ark/schema").InternalRootDeclaration>;
type DayDelimiter = "." | "/" | "-";
type DayPart = DayPatterns[PartKey];
type PartKey = keyof DayPatterns;
type DayPatterns = {
    y: "yy" | "yyyy";
    m: "mm" | "m";
    d: "dd" | "d";
};
type fragment<part extends DayPart, delimiter extends DayDelimiter> = `${delimiter}${part}` | "";
export type DayPattern<delimiter extends DayDelimiter = DayDelimiter> = delimiter extends unknown ? {
    [k1 in keyof DayPatterns]: {
        [k2 in Exclude<keyof DayPatterns, k1>]: `${DayPatterns[k1]}${fragment<DayPatterns[k2], delimiter>}${fragment<DayPatterns[Exclude<keyof DayPatterns, k1 | k2>], delimiter>}`;
    }[Exclude<keyof DayPatterns, k1>];
}[keyof DayPatterns] : never;
export type DateFormat = "iso" | DayPattern;
export type DateOptions = {
    format?: DateFormat;
};
export declare const iso8601Matcher: RegExp;
export declare const tryParseDatePattern: (data: string, opts?: DateOptions) => Date | string;
export declare const stringDate: stringDate.module;
export declare namespace stringDate {
    type module = Module<stringDate.submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        parse: (In: string) => To<Date>;
        iso: iso.submodule;
        epoch: epoch.submodule;
    };
    namespace iso {
        type submodule = Submodule<$>;
        type $ = {
            root: string;
            parse: (In: string) => To<Date>;
        };
    }
    namespace epoch {
        type submodule = Submodule<$>;
        type $ = {
            root: string;
            parse: (In: string) => To<Date>;
        };
    }
}
export declare const ip: ip.module;
export declare namespace ip {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        v4: string;
        v6: string;
    };
}
export declare const writeJsonSyntaxErrorProblem: (error: unknown) => string;
export declare const json: stringJson.module;
export declare namespace stringJson {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        parse: (In: string) => To<Json>;
    };
}
export declare namespace lower {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string>;
        preformatted: string;
    };
}
export declare const normalizedForms: readonly ["NFC", "NFD", "NFKC", "NFKD"];
export type NormalizedForm = (typeof normalizedForms)[number];
export declare const NFC: Module<{
    root: unknown;
    preformatted: unknown;
}>;
export declare const NFD: Module<{
    root: unknown;
    preformatted: unknown;
}>;
export declare const NFKC: Module<{
    root: unknown;
    preformatted: unknown;
}>;
export declare const NFKD: Module<{
    root: unknown;
    preformatted: unknown;
}>;
export declare const normalize: Module<{
    root: unknown;
    NFC: Submodule<{
        root: unknown;
        preformatted: unknown;
    }>;
    NFD: Submodule<{
        root: unknown;
        preformatted: unknown;
    }>;
    NFKC: Submodule<{
        root: unknown;
        preformatted: unknown;
    }>;
    NFKD: Submodule<{
        root: unknown;
        preformatted: unknown;
    }>;
}>;
export declare namespace normalize {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string>;
        NFC: NFC.submodule;
        NFD: NFD.submodule;
        NFKC: NFKC.submodule;
        NFKD: NFKD.submodule;
    };
    namespace NFC {
        type submodule = Submodule<$>;
        type $ = {
            root: (In: string) => To<string>;
            preformatted: string;
        };
    }
    namespace NFD {
        type submodule = Submodule<$>;
        type $ = {
            root: (In: string) => To<string>;
            preformatted: string;
        };
    }
    namespace NFKC {
        type submodule = Submodule<$>;
        type $ = {
            root: (In: string) => To<string>;
            preformatted: string;
        };
    }
    namespace NFKD {
        type submodule = Submodule<$>;
        type $ = {
            root: (In: string) => To<string>;
            preformatted: string;
        };
    }
}
export declare const stringNumeric: stringNumeric.module;
export declare namespace stringNumeric {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        parse: (In: string) => To<number>;
    };
}
export declare namespace trim {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string>;
        preformatted: string;
    };
}
declare const upper: upper.module;
declare namespace upper {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: (In: string) => To<string>;
        preformatted: string;
    };
}
export declare const url: url.module;
export declare namespace url {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        parse: (In: string) => To<URL>;
    };
}
export declare const uuid: Module<{
    root: string;
    v4: unknown;
    v6: unknown;
    v1: unknown;
    v2: unknown;
    v3: unknown;
    v5: unknown;
    v7: unknown;
    v8: unknown;
}>;
export declare namespace uuid {
    type module = Module<submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        v1: string;
        v2: string;
        v3: string;
        v4: string;
        v5: string;
        v6: string;
        v7: string;
        v8: string;
    };
    namespace $ {
        type flat = {};
    }
}
export declare const string: Module<{
    root: unknown;
    alpha: unknown;
    alphanumeric: unknown;
    hex: unknown;
    base64: Submodule<{
        root: unknown;
        url: unknown;
    }>;
    capitalize: Submodule<capitalize.submodule>;
    creditCard: unknown;
    date: Submodule<stringDate.submodule>;
    digits: unknown;
    email: unknown;
    integer: Submodule<stringInteger.submodule>;
    ip: Submodule<ip.submodule>;
    json: Submodule<stringJson.submodule>;
    lower: Submodule<lower.submodule>;
    normalize: Submodule<{
        root: unknown;
        NFC: Submodule<{
            root: unknown;
            preformatted: unknown;
        }>;
        NFD: Submodule<{
            root: unknown;
            preformatted: unknown;
        }>;
        NFKC: Submodule<{
            root: unknown;
            preformatted: unknown;
        }>;
        NFKD: Submodule<{
            root: unknown;
            preformatted: unknown;
        }>;
    }>;
    numeric: Submodule<stringNumeric.submodule>;
    regex: unknown;
    semver: unknown;
    trim: Submodule<trim.submodule>;
    upper: Submodule<upper.submodule>;
    url: Submodule<url.submodule>;
    uuid: Submodule<{
        root: string;
        v4: unknown;
        v6: unknown;
        v1: unknown;
        v2: unknown;
        v3: unknown;
        v5: unknown;
        v7: unknown;
        v8: unknown;
    }>;
}>;
export declare namespace string {
    type module = Module<string.submodule>;
    type submodule = Submodule<$>;
    type $ = {
        root: string;
        alpha: string;
        alphanumeric: string;
        hex: string;
        base64: base64.submodule;
        capitalize: capitalize.submodule;
        creditCard: string;
        date: stringDate.submodule;
        digits: string;
        email: string;
        integer: stringInteger.submodule;
        ip: ip.submodule;
        json: stringJson.submodule;
        lower: lower.submodule;
        normalize: normalize.submodule;
        numeric: stringNumeric.submodule;
        regex: string;
        semver: string;
        trim: trim.submodule;
        upper: upper.submodule;
        url: url.submodule;
        uuid: uuid.submodule;
    };
}
export {};
