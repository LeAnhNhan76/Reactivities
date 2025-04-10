import { Location } from "react-router-dom";
import { HomeRoutingConstants } from "../constants/routing.constant";
import { isNotNullOrUndefined } from "./common.util";

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

const getCurrentRoute = (location: Location | undefined): string => {
    if (location) {
        return location.pathname.split('/')[1];
    }
    return '';
}

const isHomePage = (route: string | undefined | null): boolean => {
    if (route !== undefined && route !== null && route !== '') {
        return HomeRoutingConstants.includes(route);
    }
    return false;
}

export {
    generateQueryStringFromObj,
    getCurrentRoute,
    isHomePage
};

