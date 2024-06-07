chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { secureNetflixId, netflixId, url } = request;

    if (request.action === "setCookies") {
        chrome.cookies.set({
            url: url,
            name: 'SecureNetflixId',
            value: secureNetflixId,
            domain: '.netflix.com',
            secure: true,
            httpOnly: true
        });

        chrome.cookies.set({
            url: url,
            name: 'NetflixId',
            value: netflixId,
            domain: '.netflix.com'
        });
        sendResponse({ status: "Cookies are being set" });
        return true
    } else if (request.action === "reloadTab") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0 && tabs[0].id) {
                chrome.tabs.reload(tabs[0].id, {}, () => {
                    if (chrome.runtime.lastError) {
                        console.error("Error reloading tab:", chrome.runtime.lastError.message);
                    } else {
                        console.log("Tab reloaded successfully.");
                    }
                });
            }
        });
    } else if (request.action === "removeCookies") {
        chrome.cookies.remove({ url: url, name: 'SecureNetflixId' });
        chrome.cookies.remove({ url: url, name: 'NetflixId' });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].id) chrome.tabs.reload(tabs[0].id);
        });
    }
    return true
});
