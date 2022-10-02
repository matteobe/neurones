'use strict';

// Store page data in cache
let pageData = {};

// Add page data information
pageData['Hate'] = 10;
pageData['Racism'] = 0;

// Listen to messages with tabId
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let currentTabId = request.tab_id;
        chrome.storage.local.set({[currentTabId]: pageData}).then();
        console.log("Content script for tab-id:", currentTabId);
        console.log("Stored data", pageData);
    }
)

