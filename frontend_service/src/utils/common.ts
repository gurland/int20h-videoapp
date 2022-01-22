import { Routes } from '../constants/routes';

export function createRoute(routerPattern: Routes | string, params: Record<string, string | number>): string {
    let res = routerPattern;
    Object.keys(params).forEach((param) => {
        res = res.replace(`:${param}`, params[param].toString());
    });
    return res;
}
