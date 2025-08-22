export const get = (data, pathStr) => {
    let target = data;
    const path = pathStr.split(".");
    while (path.length)
        target = target[path.shift()];
    return target;
};
