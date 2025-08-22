import { getContext as getSvelteContext, hasContext, setContext as setSvelteContext } from "svelte";
function setContext(key, value) {
    return setSvelteContext(key, value);
}
function getContext(key, fallback) {
    const trueKey = typeof key === "symbol" ? key : key;
    const description = typeof key === "symbol" ? key.description : key;
    if (!hasContext(trueKey)) {
        if (fallback === undefined) {
            throw new Error(`Missing context dependency: ${description} and no fallback was provided.`);
        }
        return fallback;
    }
    return getSvelteContext(key);
}
function getSymbolDescription(providerComponentName, contextName) {
    if (contextName !== undefined)
        return contextName;
    if (typeof providerComponentName === "string" && contextName === undefined) {
        return `${providerComponentName}Context`;
    }
    else if (Array.isArray(providerComponentName) && contextName === undefined) {
        return `${providerComponentName[0]}Context`;
    }
    else {
        if (contextName !== undefined)
            return contextName;
        return `${providerComponentName}Context`;
    }
}
export function createContext(providerComponentName, contextName, useSymbol = true) {
    const symbolDescription = getSymbolDescription(providerComponentName, contextName);
    const symbol = Symbol.for(`formsnap.${symbolDescription}`);
    const key = symbolDescription;
    function getCtx(fallback) {
        const context = getContext(useSymbol ? symbol : key, fallback);
        if (context === undefined) {
            throw new Error(`Context \`${symbolDescription}\` not found. Component must be used within ${Array.isArray(providerComponentName)
                ? `one of the following components: ${providerComponentName.join(", ")}`
                : `\`${providerComponentName}\``}`);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (context === null)
            return context;
        return context;
    }
    function setCtx(value) {
        if (useSymbol) {
            return setContext(symbol, value);
        }
        else {
            return setContext(key, value);
        }
    }
    return [setCtx, getCtx];
}
