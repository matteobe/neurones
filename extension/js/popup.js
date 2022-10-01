// Navigation tab selection
function selectNavElement() {
    console.log("here")
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