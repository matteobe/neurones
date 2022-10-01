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
// TODO: Code that parses the text for labelling
async function newPageLoad(tabId, changeInfo, tab) {
    console.log("Tab updated")
    console.log(changeInfo.status)

    // When tab updating complete trigger parsing of text and badge update
    if (changeInfo.status === "complete") {
        let value = Math.floor(Math.random() * 50).toString()
        chrome.action.setBadgeText({text: value}).then();
    }
}
chrome.tabs.onUpdated.addListener(newPageLoad);
