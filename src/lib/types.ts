export type Link = {
    name: string;
    url: string;
    description?: string;
};

export type LinkSystem = {
    name: string;
    url: string;
    image: string;
};
export function extendSite(base: Link, subPath?: string, name?: string): Link {
    const baseUrl = base.url.endsWith('/') ? base.url : `${base.url}/`;
    return {
        ...base,
        url: subPath ? `${baseUrl}${subPath}` : base.url,
        name: name || base.name
    };
}

export type Console = {
    name: string;
}

export type DownloadRow = {
    title: string;
    downloads: Link[];
    torrents: Link[];
}

export type FileType = {
    extension: string;
    recommended?: boolean;
    notes?: string
}

export type BaseRomsForPatch = {
    name: string;
    altnames: string[];
    notes?: string[];
    hashes: { crc32: string, md5: string, sha1: string }
}
