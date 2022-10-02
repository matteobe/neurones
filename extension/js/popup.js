'use strict';

// Load the hate speech categories
import categories from '../data/categories.json' assert {type: 'json'};

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
    return chrome.tabs.query({active: true, currentWindow: true})
        .then((tabs) => {return tabs[0].id})
}

// Send message to current tab for information
chrome.tabs.sendMessage(getCurrentTabId(), {'msg': 'update'}).then()

// Display current content information
function updateCurrentContent(sender) {
    document.getElementById("CURRENT").innerText = sender.tab.id.toString();
}

// Send message to current tab for information
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {'msg': 'test'}).then();
});
