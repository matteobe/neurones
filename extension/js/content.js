'use strict';
// Page parsing and API request happening here...
// TODO: Page parsing

console.log("v3")

async function eventHandler(){
    elementList = document.querySelectorAll('div.css-901oao.r-1nao33i.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0')
    elemInfo = []
    for(const element of elementList){
        if (/^\d+/.test(element.innerText)) {//if the text starts with digits
            continue
        }
        else {
            elemInfo.push(element)
        }
    }

    const postSentenceList = elemInfo.map(e=>{
        return {
            sentences: e.innerText.split(". ")
        }
    })

    
    const res = await fetch('https://20.51.233.111', {
        method: "POST",
        body: JSON.stringify(postSentenceList)
    })

    console.log(res)

    const res_text = await res.text()

    consonle.log(res_text)

    postSentenceList.map((v,i)=> {
        for(const sentenceIdx of badIndices[i]) {
            elementList[i].innerText = elementList[i].innerText.replaceAll(postSentenceList[i][sentenceIdx], "[hate speech redacted]")
        }
    })
}

setTimeout(eventHandler, 5000)

info = eventHandler()

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

