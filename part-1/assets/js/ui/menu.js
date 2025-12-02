function CreateMenu() {
    let contentContainer = document.getElementsByClassName("page")[0];

    let tag = document.createElement("nav");
    tag.className = "main-nav";
    let tag2 = document.createElement("ul");
    for(let i = 0; i < menuNames.length; ++i) {

        if(menuHrefs[i] === "course-details.html") continue;

        let tag3 = document.createElement("li");
        let tag4 = document.createElement("a");
        tag4.href = menuHrefs[i];
        tag4.textContent = menuNames[i];
        tag3.appendChild(tag4);
        tag2.appendChild(tag3);
    }
    tag.appendChild(tag2);
    contentContainer.appendChild(tag);
}