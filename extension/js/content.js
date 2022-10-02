// Page parsing and API request happening here...
// TODO: Page parsing
const myRe = /^\d+$/;



function eventHandler(){
    a = document.querySelectorAll('.css-901oao.css-16my406.r-poiln3.r-bcqeeo')
    elemInfo = []
    for(const element of a){
        if (myRe.test(element.innerText)) {
            continue
        }
        else {
            return elemInfo = (element)
        }
        
    }
}

setTimeout(eventHandler, 5000)

info = eventHandler()

fetch(), {
    method: 'POST',
    body: JSON.stringify(elemInfo)
    .then(function(response)) {
        
    }
    
}
