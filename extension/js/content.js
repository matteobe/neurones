'use strict';
// Page parsing and API request happening here...
// TODO: Page parsing

console.log("v3")

async function eventHandler(){
    // let css_class = 'div.css-901oao.r-1nao33i.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0';
    let css_class = "div.css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0";

    console.log("Retrieving DOM elements.")
    const elementList = document.querySelectorAll(css_class)
    console.log("Element list", elementList)
    const elemInfo = []
    for(const element of elementList){
        if (/^\d+/.test(element.innerText)) {
            //if the text starts with digits ignore
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
    console.log("postSentenceList", postSentenceList)
    
    console.log("Sending message")
    chrome.runtime.sendMessage(postSentenceList, function(badIndices) {
        console.log("Response received")
        console.log(badIndices)
        postSentenceList.map((v,i)=> {
            const offensiveSentenceIndices = badIndices[i]
            for(const sentenceIdx of offensiveSentenceIndices) {
                console.log("Offensive sentence [innerText, idx, value]", elementList[i].innerText, i, v.sentences[sentenceIdx]);
                elementList[i].innerHTML = elementList[i].innerHTML.replaceAll(v.sentences[sentenceIdx], 
                "<span style='color:black;background-color:red'>[Hate Speech]</span><span style='color:red;background-color:red;'>${v.sentences[sentenceIdx]}</span>")
            }
        })
      });

}

setTimeout(eventHandler, 5000);

// Listen to messages with tabId
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let currentTabId = request.tab_id;
        // Store page data in cache
        let pageData = {};

        // Add page data information
        pageData['Hate'] = 10;
        pageData['Racism'] = 0;

        // Store information
        chrome.storage.local.set({[currentTabId]: pageData}).then();
        console.log("Content script for tab-id:", currentTabId);
        console.log("Stored data", pageData);
    }
)

