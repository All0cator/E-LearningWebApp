function CreateSidebar() {
    let contentContainer = document.getElementsByClassName("page")[0];

    let tag = document.createElement("ul");
    tag.className = "main-sidebar";
    let tag4 = document.createElement("li");
    tag.appendChild(tag4); 
    
    let tag5 = document.createElement("h3");
    tag5.className = "main-sidebar-text";
    tag5.textContent = "Προτάσεις";
    tag4.appendChild(tag5);

    let tag2 = document.createElement("li");
    let tag7 = document.createElement("ul");
    tag7.className = "course-links";
    
    let tag6 = document.createElement("li");
    tag5 = document.createElement("h4");
    tag5.textContent = "Μαθήματα";
    tag6.appendChild(tag5);
    tag7.appendChild(tag6);

    tag2.appendChild(tag7);
    
    let tag3 = document.createElement("li");
    let tag8 = document.createElement("ul");
    tag8.className = "book-links";

    tag6 = document.createElement("li");
    tag5 = document.createElement("h4");
    tag5.textContent = "Βιβλία";
    tag6.appendChild(tag5);
    tag8.appendChild(tag6);
    
    tag3.appendChild(tag8);


    let recommendedLinks = JSON.parse(localStorage.getItem("recommendedLinks"));

    for(let i = 0; i < recommendedLinks.length; ++i) {
        let res = recommendedLinks[i].resource;

        if(res.type !== "Book" && res.type !== "Course") continue;

        tag4 = document.createElement("li");
        tag5 = document.createElement("a");
        tag4.appendChild(tag5);

        if(res.type === "Book") {
            tag5.className = "book-link";
            tag5.id = "book-link-" + res.id;
            tag5.href = "course-details.html";
            tag5.textContent = res.title;
            tag5.addEventListener("click", OnLinkClickedCallback);
            tag8.appendChild(tag4);
        } else if(res.type === "Course") {
            tag5.className = "course-link";
            tag5.id = "course-link-" + res.id;
            tag5.href = "course-details.html";
            tag5.textContent = res.title;
            tag5.addEventListener("click", OnLinkClickedCallback);
            tag7.appendChild(tag4);
        } // else do nothing
    }

    tag.appendChild(tag2);
    tag.appendChild(tag3);

    contentContainer.appendChild(tag);
}