export type ResponseData = {
    id: number;
    name: string;
    email: string;
};
export type SearchResponseData = {
    results: {
        id: number;
        title: string;
    }[];
    page: number;
    total: number;
};
export declare const handlers: import("msw").HttpHandler[];
