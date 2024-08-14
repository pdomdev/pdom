// extract the script url from a function which has a dynamic import
// for the script url.
export function getScriptUrlFromFunction(fn: (() => Promise<any>) | string) {
    if (typeof fn === 'string') {
        return fn;
    }
    return new URL(fn.toString().match(/import\([\s\S]*?["'](.+?)["'][\s\S]*?\)/)[1], import.meta.url).href;
}