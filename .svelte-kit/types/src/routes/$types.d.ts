import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/" | "/Microsoft" | "/Microsoft/microsoft-xbox" | "/Microsoft/microsoft-xbox360" | "/Miscellaneous" | "/Miscellaneous/bios-files" | "/Miscellaneous/rom-sets" | "/Nintendo" | "/Nintendo/nintendo-3ds" | "/Nintendo/nintendo-ds" | "/Nintendo/nintendo-gamecube" | "/Nintendo/nintendo-games" | "/Nintendo/nintendo-wii" | "/Nintendo/nintendo-wii-u" | "/PC" | "/PC/pc-games" | "/Populars" | "/Populars/about-rvz-files" | "/Populars/fire-emblem" | "/Populars/mario" | "/Populars/metroid" | "/Populars/persona" | "/Populars/pokemon" | "/Populars/super-smash-bros" | "/Populars/xenoblade" | "/Populars/zelda" | "/Retro & Arcade" | "/Retro & Arcade/arcade" | "/Retro & Arcade/retro-games" | "/Sega" | "/Sega/sega-cd" | "/Sega/sega-dreamcast" | "/Sega/sega-games" | "/Sega/sega-saturn" | "/Sony" | "/Sony/nopaystation" | "/Sony/sony-playstation" | "/Sony/sony-playstation-2" | "/Sony/sony-playstation-3" | "/Sony/sony-playstation-portable" | "/Sony/sony-playstation-vita" | null
type LayoutParams = RouteParams & {  }
type LayoutServerParentData = EnsureDefined<{}>;
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { params: RouteParams; data: PageData }
export type LayoutServerLoad<OutputData extends OutputDataShape<LayoutServerParentData> = OutputDataShape<LayoutServerParentData>> = Kit.ServerLoad<LayoutParams, LayoutServerParentData, OutputData, LayoutRouteId>;
export type LayoutServerLoadEvent = Parameters<LayoutServerLoad>[0];
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;