// Installation setup
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
async function newPageLoad(tabId, changeInfo, tab) {
    console.log("Tab updated")
    console.log(tab.id)
    console.log(changeInfo.status)

    // When tab updating complete trigger parsing of text and badge update
    if (tab.status === "complete") {
        // Inject the content script
        await chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['js/content.js']
        });

        // Update the badge number
        let value = Math.floor(Math.random() * 50).toString()
        chrome.action.setBadgeText({text: value}).then();
    }
}
chrome.tabs.onUpdated.addListener(newPageLoad);

// Setting change
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.options?.newValue) {
        const debugMode = Boolean(changes.options.newValue.debug);
        console.log('Enable debug mode?', debugMode);
    }
});
