'use strict';

// ------------------------------------- NAVIGATION ------------------------------------- //
// Navigation tab selection
function selectNavElement() {
    let pages = document.getElementsByClassName('page');
    let selectedNav = document.querySelector(".nav_element_selected");

    // TODO: Fix that spacer is selectable
    if (selectedNav) {
        selectedNav.classList.remove("nav_element_selected");
    }
    this.classList.add("nav_element_selected");

    // Show the relevant page
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id === this.textContent) {
            pages[i].style.visibility = "visible";
        }
        else {
            pages[i].style.visibility = "hidden";
        }
    }
}
let elements = document.getElementsByClassName('nav_element');
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", selectNavElement, false);
}

// ------------------------------------- CONTENT ------------------------------------- //
// Retrieve current tab id
function getCurrentTabId() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let tab = chrome.tabs.query(queryOptions).then((tab) => {return tab;});
    return tab.id;
}

// Display current content information
function displayCurrentContent() {
    let currentTabId = getCurrentTabId();
    chrome.tabs.sendMessage(currentTabId, {'tab_id': currentTabId}).then();
    console.log("Display for current tab-id: ", currentTabId);
    let currentData = chrome.storage.local.get([currentTabId])
        .then((data) => {return data[currentTabId]})

    console.log("Current data", currentData);
    document.getElementById("CURRENT").innerText = 'Hate';
}

displayCurrentContent();
