import pThrottle from "p-throttle";

export const convertSearchParamsToString = (search: { [key: string]: string } | string): string => {
    if (typeof search === 'object' &&
        !Array.isArray(search) &&
        search !== null) {
        return Object.keys(search)
            .map((key) => {
                return `${key}=${encodeURIComponent(search[key])}`;
            })
            .join("&");
    }
    return ``;
}


export const changePathName = (current: string, newLang: string, pathName: string): string => {
    var segements = pathName.split(`/${current}/`);
    segements[0] = "" + newLang;
    var newurl = segements.join("/");
    return `/${newurl.toString()}`;

}

export const convertToJson = (qs: string) => {
    qs = qs || location.search.slice(1);
    var pairs = qs.split('&');
    var result: any = {};
    pairs.forEach(function (p) {
        var pair = p.split('=');
        var key = pair[0];
        var value = decodeURIComponent(pair[1] || '');

        if (result[key]) {
            if (Object.prototype.toString.call(result[key]) === '[object Array]') {
                result[key].push(value);
            } else {
                result[key] = [result[key], value];
            }
        } else {
            result[key] = value;
        }
    });

    return JSON.parse(JSON.stringify(result));
};

export const addDashs = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

export const removeTags = (str: string) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}

export const mainHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const revalidate = {
    min: 60,
    mid: 120,
    max: 180
}

export const globalMaxWidth = 'max-w-8xl';


export const throttleLimit = pThrottle({
    limit: 2,
    interval: 1000,
});