var menuNames = ["Αρχική Σελίδα", "Βιβλία", "Μαθήματα", "Ποιοί Είμαστε", "Εγγραφή", "Λεπτομέρειες"];
var menuHrefs = ["index.html", "books.html", "courses.html", "about.html", "register.html", "course-details.html"];
var mapMenuHrefToMenuName = new Map(menuHrefs.map((href, i) => [href, menuNames[i]]));

var defaultFormInputValues = {
    "value-name" : "", 
    "value-surname" : "",
    "value-birth-date" : "",
    "value-phone" : "",
    "value-user-name" : "",
    "value-password" : "",
    "value-email" : "",
    "value-category" : "Προγραμματισμός",
    "value-difficulty-level" : "Αρχάριο",
    "value-like" : false
};

var inputValueToText = {
    "value-name" : "Όνομα", 
    "value-surname" : "Επώνυμο",
    "value-birth-date" : "Ημερομηνία Γέννησης",
    "value-phone" : "Αριθμός Τηλεφώνου",
    "value-user-name" : "Όνομα Χρήστη",
    "value-password" : "Κωδικός Πρόσβασης",
    "value-email" : "email",
    "value-category" : "Αγαπημένη Κατηγορια",
    "value-difficulty-level" : "Επίπεδο",
    "value-like" : "Μου αρέσει η Πληροφορική"
}

var globalPageState;

(function() {
    document.addEventListener("DOMContentLoaded", function() {
        globalPageState = InitializeGlobalPageState();
        
        let formInputValues = JSON.parse(localStorage.getItem("formInputValues"));

        if(formInputValues === null) {
            formInputValues = defaultFormInputValues;
            localStorage.setItem("formInputValues", JSON.stringify(formInputValues));
        }

        let recommendedLinks = JSON.parse(localStorage.getItem("recommendedLinks"));

        if(recommendedLinks === null) {
            recommendedLinks = globalPageState.GetStarterRecommendationLinks();
            localStorage.setItem("recommendedLinks", JSON.stringify(recommendedLinks));
        }

        Main();
    });
})();

function InitializeGlobalPageState() {
    
    let resourceBooks = [];
    let resourceCourses = [];

    // deep copy books and courses into new arrays
    SetBooks(books);
    SetCourses(courses);

    const starterRecommendationLinks = [{link: "course-details.html", resource: courses[0]}, {link: "course-details.html", resource: courses[1]},
            {link: "course-details.html", resource: books[0]}, {link: "course-details.html", resource: books[1]}];

    function GetBooks() {
        return resourceBooks;
    }

    function SetBooks(bookss) {
        resourceBooks = [];

        for(let i = 0; i < bookss.length; ++i) {
            let copyBook = {...(bookss[i])};
            resourceBooks.push(copyBook);
        }
    }

    function GetCourses() {
        return resourceCourses;
    }

    function SetCourses(coursess) {
        resourceCourses = [];

        for(let i = 0; i < coursess.length; ++i) {
            let copyCourse = {...(coursess[i])};
            resourceCourses.push(copyCourse);
        }
    }

    function GetStarterRecommendationLinks() {
        return starterRecommendationLinks;
    }

    return {GetBooks, SetBooks, GetCourses, SetCourses, GetStarterRecommendationLinks};
}

function Main() {

    // Get our current page name
    let path = window.location.pathname;
    let pageName = path.substring(path.lastIndexOf("/") + 1);

    // Create general Page layout
    InitializeHeader();
    InitializeBody();

    // Change header to match page's name
    let header = document.getElementsByClassName("main-header")[0];

    header.textContent = mapMenuHrefToMenuName.get(pageName);

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
    let stylsheetHrefs = ["assets/css/components.css", "assets/css/layout.css", "assets/css/reset.css", "assets/css/theme.css"];
    
    for(let i = 0; i < stylsheetHrefs.length; ++i) {
        tag = document.createElement("link");
        tag.rel = "stylesheet";
        tag.type = "text/css";
        tag.href = stylsheetHrefs[i];
        document.head.appendChild(tag);
    }

    tag = document.createElement("link");
    tag.rel = "shortcut icon";
    tag.type = "image/png";
    tag.href = "assets/img/book-icon-small.png";
    document.head.appendChild(tag);

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
}

function InitializeBody() {
    contentContainer = document.getElementsByClassName("page")[0];

    // Header
    let tag = document.createElement("header");
    tag.className = "main-header";
    tag.textContent = "Header";
    contentContainer.appendChild(tag);

    // Menu
    CreateMenu();

    // Content
    tag = document.createElement("div");
    tag.className = "main-content";
    tag2 = document.createElement("section");
    tag2.className = "main-section";
    tag3 = document.createElement("article");
    tag3.className = "main-article";
    tag4 = document.createElement("h2");
    tag4.className = "main-section-title";
    tag4.textContent = "Τίτλος";
    tag2.appendChild(tag4);
    tag2.appendChild(tag3);
    tag.appendChild(tag2);
    contentContainer.appendChild(tag);

    // Sidebar
    CreateSidebar();

    // Footer
    tag = document.createElement("footer");
    tag.className = "main-footer";
    tag.textContent = "Η ιστοσελίδα δημιουργήθηκε στα πλαίσια του μαθήματος Τεχνολογίες και Προγραμματισμός Εφαρμογών στον ιστό (2025-2026).";
    contentContainer.appendChild(tag);
}

function InitializeIndex() {
    let titleElement = document.getElementsByClassName("main-section-title")[0];
    titleElement.textContent = "Εισαγωγή";
    let articleElement = document.getElementsByClassName("main-article")[0];
    articleElement.id = "main-article-index";
    let p = document.createElement("p");
    p.className = "main-article-par";
    p.innerHTML = `Η ιστοσελίδα περιέχει μια συλλογή μαθημάτων και βιβλίων με σκοπό να βελτιώσει την πρόσβαση των φοιτητών του πανεπιστημίου σε θέματα Πληροφορικής όπως: <br> <br>
     * Προγραμματισμό <br> 
     * Κυβερνοασφάλεια <br> 
     * Μαθηματικά <br> 
     * και άλλα.`;
    articleElement.appendChild(p);

    let video = document.createElement("video");
    video.src = "assets/video/index.mp4";
    video.controls = true;
    video.textContent = "Video not supported.";

    articleElement.appendChild(video);
    
    let empty = document.createElement("div");
    articleElement.appendChild(empty);
}

function InitializeBooks() {
    let mainSectionTitle = document.getElementsByClassName("main-section-title")[0];
    mainSectionTitle.textContent = "Λίστα Βιβλιων";

    let mainSection = document.getElementsByClassName("main-section")[0];
    mainSection.removeChild(document.getElementsByClassName("main-article")[0]);

    CreateSearchFilter();
    CreateSortFilter();

    localStorage.setItem("defaultResourcesType", JSON.stringify({type: "Book"}));
    let pageBooks = globalPageState.GetBooks();

    SortResources(pageBooks);
}

function InitializeCourses() {
    let mainSectionTitle = document.getElementsByClassName("main-section-title")[0];
    mainSectionTitle.textContent = "Λίστα Μαθημάτων";

    let mainSection = document.getElementsByClassName("main-section")[0];
    mainSection.removeChild(document.getElementsByClassName("main-article")[0]);

    CreateSearchFilter();
    CreateSortFilter();

    localStorage.setItem("defaultResourcesType", JSON.stringify({type: "Course"}));
    
    SortResources(courses);
}

function InitializeCourseDetails() {
    let resourceClicked = JSON.parse(localStorage.getItem("resourceClicked"));

    let typeText = "Unknown";

    let articleElement = document.getElementsByClassName("main-article")[0];
    let card = null;
    // Create card for resource
    if(resourceClicked.type == "Book") {
        typeText = "Book";
        // fill article element with correct data
        CreateCardBook(resourceClicked, articleElement);

    } else if(resourceClicked.type == "Course") {
        typeText = "Course";
        // fill article element with correct data
        CreateCardCourse(resourceClicked, articleElement);
    }

    let titleElement = document.getElementsByClassName("main-section-title")[0];
    titleElement.textContent = typeText;
}

function InitializeAbout() {

    let mainSectionTitle = document.getElementsByClassName("main-section-title")[0];
    mainSectionTitle.textContent = "Άτομα";

    let cardPerson1 = document.getElementsByClassName("main-article")[0];
    cardPerson1.className = "card-person";
    cardPerson1.id = "card-person-1";

    CreateCardPerson("1", ["assets/img/user-image-large.png" ,"assets/img/user-image-medium.png" , "assets/img/user-image-small.png"], 
        "p3220202", "p3220202@aueb.gr", cardPerson1);
    
    let cardPerson2 = document.createElement("article");
    cardPerson2.className = "card-person";
    cardPerson2.id = "card-person-2";

    CreateCardPerson("2", ["assets/img/user-image-large.png" ,"assets/img/user-image-medium.png" , "assets/img/user-image-small.png"], 
        "p3210100", "p3210100@aueb.gr", cardPerson2);

    // cardPerson1 already appended to main-section
    document.getElementsByClassName("main-section")[0].appendChild(cardPerson2);
}

function InitializeRegister() {
    let mainSectionTitle = document.getElementsByClassName("main-section-title")[0];
    mainSectionTitle.textContent = "Στοιχεία";

    CreateRegisterForm();
}