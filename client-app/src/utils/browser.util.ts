import { isNotNullOrUndefined } from "./common.util"

const generateQueryStringFromObj = (params: any | undefined) => {
    if (!isNotNullOrUndefined(params)) return '';

    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
        if (isNotNullOrUndefined(params[key])) {
            searchParams.append(key, params[key]?.toString());
        }
    });

    return searchParams.toString();
} 

export {
    generateQueryStringFromObj
}