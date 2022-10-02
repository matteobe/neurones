// Page parsing and API request happening here...
// TODO: Page parsing

// Retrieve this tab id
function getCurrentTabId() {
    return chrome.tabs.query({active: true, currentWindow: true})
        .then((tabs) => {return tabs[0].id})
}

let thisTabId = getCurrentTabId();
chrome.storage.local.set({thisTabId: {'value': 'test'}}).then()


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "hello")
            sendResponse({farewell: "goodbye"});
    }
);