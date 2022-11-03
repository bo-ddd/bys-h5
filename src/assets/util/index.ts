export const parseAssetFile = function (url: string): string {
    console.log(new URL(`/src/assets/images/${url}`, import.meta.url).href)
    return new URL(`/src/assets/images/${url}`, import.meta.url).href;
};

export default function () {
    return { parseAssetFile }
}