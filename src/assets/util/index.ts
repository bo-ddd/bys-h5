export const parseAssetFile = function (url: string): string {
    return new URL(`/src/assets/images/${url}`, import.meta.url).href;
};

export default  ()=> {
    return { parseAssetFile }
}