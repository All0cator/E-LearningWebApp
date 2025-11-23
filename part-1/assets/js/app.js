(function() {
    document.addEventListener("DOMContentLoaded", function() {
        Main();
    });
})();

function Main() {

    // Get our current page name
    let path = window.location.pathname;
    let pageName = path.substring(path.lastIndexOf("/") + 1)

    // Create general Page layout
    InitializeHeader();
    InitializeBody();

    // Create specific Page layout
    switch(pageName) {
        case "index.html":
            InitializeIndex();
            break;
        case "books.html":
            InitializeBooks();
            break;
        case "courses.html":
            InitializeCourses();
            break;
        case "course-details.html":
            InitializeCourseDetails();
            break;
        case "about.html":
            InitializeAbout();
            break;
        case "register.html":
            InitializeRegister();
            break;
        default:
            console.error("Page with name: " + pageName + " not recognized!");
            break;
    }
}

function InitializeHeader() {

    // title
    let tag = document.createElement("title");
    tag.textContent = "E-Learning Web App";
    document.head.appendChild(tag);

    // meta
    tag = document.createElement("meta");
    tag.name = "viewport";
    tag.content = "width = device-width, initial-scale=1";
    document.head.appendChild(tag);
    
    // link
    let stylsheetHrefs = ["assets/css/layout.css", "assets/css/reset.css", "assets/css/theme.css"];
    
    for(let i = 0; i < stylsheetHrefs.length; ++i) {
        tag = document.createElement("link");
        tag.rel = "stylesheet";
        tag.type = "text/css";
        tag.href = stylsheetHrefs[i];
        document.head.appendChild(tag);
    }
    
    let imageHrefs = ["assets/img/book_icon.png", "assets/img/course_image.png"];

    for(let i = 0; i < imageHrefs.length; ++i) {
        tag = document.createElement("link");
        tag.rel = "stylesheet";
        tag.type = "image/png";
        tag.href = imageHrefs[i];
        document.head.appendChild(tag);
    }

    tag = document.createElement("link");
    tag.rel = "preconnect";
    tag.href = "https://fonts.googleapis.com";
    document.head.appendChild(tag);
    tag = document.createElement("link");
    tag.rel = "preconnect";
    tag.href = "https://fonts.gstatic.com";
    tag.crossorigin = "anonymous";
    document.head.appendChild(tag);
    tag = document.createElement("link");
    tag.rel = "stylesheet";
    tag.href = "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
    document.head.appendChild(tag);

    // script
}

function InitializeBody() {
    contentContainer = document.getElementsByClassName("page")[0];

    // Header
    let tag = document.createElement("header");
    tag.className = "main-header";
    tag.textContent = "Header";
    contentContainer.appendChild(tag);

    // Menu
    let menuNames = ["Αρχική Σελίδα", "Βιβλία", "Μαθήματα", "Ποιοί Είμαστε", "Εγγραφή"];
    let menuHrefs = ["index.html", "books.html", "courses.html", "about.html", "register.html"];

    tag = document.createElement("nav");
    tag.className = "main-nav";
    let tag2 = document.createElement("ul");
    for(let i = 0; i < menuNames.length; ++i) {
        let tag3 = document.createElement("li");
        let tag4 = document.createElement("a");
        tag4.href = menuHrefs[i];
        tag4.textContent = menuNames[i];
        tag3.appendChild(tag4);
        tag2.appendChild(tag3);
    }
    tag.appendChild(tag2);
    contentContainer.appendChild(tag);

    // Content
    tag = document.createElement("div");
    tag.className = "main-content";
    tag2 = document.createElement("section");
    tag2.className = "main-section";
    tag3 = document.createElement("article");
    tag3.className = "main-article";
    tag3.textContent = "Main Article";
    tag2.appendChild(tag3);
    tag.appendChild(tag2);
    contentContainer.appendChild(tag);

    // Sidebar
    tag = document.createElement("div");
    tag.className = "main-sidebar";
    tag.textContent = "Sidebar";
    contentContainer.appendChild(tag);

    // Footer
    tag = document.createElement("footer");
    tag.className = "main-footer";
    tag.textContent = "Main Footer";
    contentContainer.appendChild(tag);
}

function InitializeIndex() {
    
}

function InitializeBooks() {

}

function InitializeCourses() {

}

function InitializeCourseDetails() {

}

function InitializeAbout() {

}

function InitializeRegister() {
    
}

