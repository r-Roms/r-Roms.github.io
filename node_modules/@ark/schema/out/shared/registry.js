import { register, registry } from "@ark/util";
let _registryName = "$ark";
let suffix = 2;
while (_registryName in globalThis)
    _registryName = `$ark${suffix++}`;
export const registryName = _registryName;
globalThis[registryName] = registry;
export const $ark = registry;
export const reference = (name) => `${registryName}.${name}`;
export const registeredReference = (value) => reference(register(value));
