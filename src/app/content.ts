const tag = "fabazad7403-21";

(() => {
    console.log("We're in the injected content script!");

    const currentUrl: string = document.URL;
    const matchProductUrl: RegExpMatchArray | null = currentUrl.match(/(?:[/dp/]|$)?([A-Z0-9]{10})/);
    const matchTag: Boolean = currentUrl.includes(`tag=${tag}`);

    if (!matchProductUrl || matchTag) return;

    const asin: string = matchProductUrl[1];

    chrome.runtime.sendMessage({
        redirect: `https://www.amazon.fr/dp/${asin}?tag=${tag}`
    });
})();
