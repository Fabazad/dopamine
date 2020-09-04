const networkFilters = {
    urls: ["<all_urls>"]
};

const tag = "fabazad7403-21";
const urlRegExp: RegExp = /https?:\/\/www\.amazon\.(com|fr).*\/dp\/([A-Z0-9]{10})/;

chrome.webRequest.onBeforeRequest.addListener((details) => {
    const {method, url} = details;
    if (method !== "GET") return;

    const matchProductUrl: RegExpMatchArray | null = url.match(urlRegExp);
    const matchTag: Boolean = url.includes(`tag=${tag}`);

    if (matchProductUrl && !matchTag) {
        const asin: string = matchProductUrl[2];
        chrome.tabs.update({url: `https://www.amazon.fr/dp/${asin}?tag=${tag}`});
    }
}, networkFilters);