import { Routes } from '../constants/routes';

export function createRoute(routerPattern: Routes | string, params: Record<string, string | number>): string {
    let res = routerPattern;
    Object.keys(params).forEach((param) => {
        res = res.replace(`:${param}`, params[param].toString());
    });
    return res;
}

export function utf8_to_b64(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

export function createS3Path(imagePath?: string) {
    if (!imagePath) return undefined;
    return `http://videoapp-files.s3.amazonaws.com/${imagePath}`;
}
