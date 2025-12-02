var menuNames = ["Αρχική Σελίδα", "Βιβλία", "Μαθήματα", "Ποιοί Είμαστε", "Εγγραφή", "Λεπτομέρειες"];
var menuHrefs = ["index.html", "books.html", "courses.html", "about.html", "register.html", "course-details.html"];
var defaultFormInputValues = {
    "value-name" : "", 
    "value-surname" : "",
    "value-birth-date" : "",
    "value-phone" : "",
    "value-user-name" : "",
    "value-password" : "",
    "value-email" : "",
    "value-category" : "",
    "value-difficulty-level" : "",
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

var mapMenuHrefToMenuName = new Map(menuHrefs.map((href, i) => [href, menuNames[i]]));
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
    let stylsheetHrefs = ["assets/css/layout.css", "assets/css/reset.css", "assets/css/theme.css"];
    
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

    tag = document.createElement("nav");
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
    tag = document.createElement("ul");
    tag.className = "main-sidebar";
    tag4 = document.createElement("li");
    tag.appendChild(tag4); 
    
    let tag5 = document.createElement("h3");
    tag5.className = "main-sidebar-text";
    tag5.textContent = "Προτάσεις";
    tag4.appendChild(tag5);

    tag2 = document.createElement("li");
    tag7 = document.createElement("ul");
    tag7.className = "course-links";
    
    let tag6 = document.createElement("li");
    tag5 = document.createElement("h4");
    tag5.textContent = "Μαθήματα";
    tag6.appendChild(tag5);
    tag7.appendChild(tag6);

    tag2.appendChild(tag7);
    
    tag3 = document.createElement("li");
    tag8 = document.createElement("ul");
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

    // Footer
    tag = document.createElement("footer");
    tag.className = "main-footer";
    tag.textContent = "Η ιστοσελίδα δημιουργήθηκε στα πλαίσια του μαθήματος Τεχνολογίες και Προγραμματισμός Εφαρμογών στον ιστό (2025-2026).";
    contentContainer.appendChild(tag);
}

function OnLinkClickedCallback(event) {
    // Add Link pressed to recommendedLinks
    let recommendedLinks = JSON.parse(localStorage.getItem("recommendedLinks"));
    
    let resID = event.target.id;

    let id = resID.substring(resID.lastIndexOf("-") + 1);
    let resType = resID.substring(0, resID.indexOf("-"));
    let res = null;

    
    if(resType === "book") {
        let pageBooks = globalPageState.GetBooks();
        for(let i = 0; i < pageBooks.length; ++i) {
            if(pageBooks[i].id === id) {
                res = pageBooks[i];
                break;
            }
        }
    } else if(resType === "course") {
        let pageCourses = globalPageState.GetCourses();
        for(let i = 0; i < pageCourses.length; ++i) {
            if(pageCourses[i].id === id) {
                res = pageCourses[i];
                break;
            }
        }
    }

    if(res !== null) {

        let f = recommendedLinks.find(link => res.type === link.resource.type && res.id === link.resource.id);
        if(f === undefined) {
            recommendedLinks.unshift({link: event.target.href, resource: res});

            if(recommendedLinks.length > 10) {
                recommendedLinks.splice(recommendedLinks.length - 1, 1);
            }
        }
    }

    localStorage.setItem("recommendedLinks", JSON.stringify(recommendedLinks));
    localStorage.setItem("resourceClicked", JSON.stringify(res));
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

    SearchFilter();
    SortFilter();

    localStorage.setItem("defaultResourcesType", JSON.stringify({type: "Book"}));
    let pageBooks = globalPageState.GetBooks();

    SortResources(pageBooks);
}

function SortResources(resources, sortOrder) {
    let sortedResources = null;

    switch(sortOrder) {
        case "title-asc":
            sortedResources = resources.sort((a, b) => {
                if(a.title === b.title) 
                    return 0; 
                else if(a.title < b.title) 
                    return -1; 
                else 
                    return 1;
            });
            break;
        case "title-desc":
            sortedResources = resources.sort((a, b) => {
                if(a.title === b.title)
                    return 0;
                else if(a.title < b.title)
                    return 1;
                else
                    return -1;
            });
            break;
        case "category-asc":
            sortedResources = resources.sort((a, b) => {
                if(a.category === b.category)
                    return 0;
                else if(a.category < b.category)
                    return -1;
                else
                    return 1;
            });
            break;
        case "category-desc":
            sortedResources = resources.sort((a, b) => {
                if(a.category === b.category)
                    return 0;
                else if(a.category < b.category)
                    return 1;
                else
                    return -1;
            });
            break;
        default: // title-asc
            sortedResources = resources.sort((a, b) => {
                if(a.title === b.title) 
                    return 0; 
                else if(a.title < b.title) 
                    return -1; 
                else 
                    return 1;
            });
            break;
    }

    let mainSection = document.getElementsByClassName("main-section")[0];

    let resourceArticles = mainSection.getElementsByTagName("article");

    for(let i = resourceArticles.length - 1; i >= 0; --i) {
        mainSection.removeChild(resourceArticles[i]);
    }
    
    let defaultResourcesType = JSON.parse(localStorage.getItem("defaultResourcesType"));
    let resourceType = defaultResourcesType.type;

    if(resourceType === "Book") {
        for(let i = 0; i < sortedResources.length; ++i) {
            bookArticle = CreateCardBook(sortedResources[i]);
            mainSection.appendChild(bookArticle);
        }
    } else if(resourceType === "Course") {
       for(let i = 0; i < sortedResources.length; ++i) {
            courseArticle = CreateCardCourse(sortedResources[i]);
            mainSection.appendChild(courseArticle);
        } 
    } else {
        console.error("Error: Wrong resource type!");
    }
}

function SearchFilter() {
    let mainSection = document.getElementsByClassName("main-section")[0];

    let mainContent = document.getElementsByClassName("main-content")[0];


    let form = document.createElement("form");

    let filterSection = document.createElement("section");
    filterSection.className = "filter-section";

    let searchLabel = document.createElement("label");
    searchLabel.htmlFor = "search-edit";
    searchLabel.textContent = "Αναζήτηση: ";

    let searchInput = document.createElement("input");
    searchInput.id = "search-edit";
    searchInput.name = "title";
    searchInput.type = "text";
    searchInput.placeholder = "Τίτλος";

    let searchButton = document.createElement("input");
    searchButton.value = "Αναζήτηση";
    searchButton.type = "button";
    searchButton.addEventListener("click", OnSearchButtonClicked);

    form.appendChild(searchLabel);
    form.appendChild(searchInput);
    form.appendChild(searchButton);

    filterSection.appendChild(form);

    mainContent.removeChild(mainSection);

    mainContent.appendChild(filterSection);
    mainContent.appendChild(mainSection);
}

function SortFilter() {
    let mainSection = document.getElementsByClassName("main-section")[0];

    let mainContent = document.getElementsByClassName("main-content")[0];

    let filterSection = document.getElementsByClassName("filter-section")[0];

    let form = document.createElement("form");

    let label = document.createElement("label");
    label.htmlFor = "sort-option";
    label.textContent = "Ταξινόμηση Λίστας: ";

    let select = document.createElement("select");
    select.id = "sort-option";
    select.name = "sort-order";
    select.defaultValue = "title-asc";
    select.addEventListener("change", OnSortOptionChange);

    let optionTitleAsc = document.createElement("option");
    optionTitleAsc.value = "title-asc";
    optionTitleAsc.textContent = "Τίτλος Αύξουσα";

    let optionTitleDesc = document.createElement("option");
    optionTitleDesc.value = "title-desc";
    optionTitleDesc.textContent = "Τίτλος Φθίνουσα";

    let optionCategoryAsc = document.createElement("option");
    optionCategoryAsc.value = "category-asc";
    optionCategoryAsc.textContent = "Κατηγορία Αύξουσα";

    let optionCategoryDesc = document.createElement("option");
    optionCategoryDesc.value = "category-desc";
    optionCategoryDesc.textContent = "Κατηγορία Φθίνουσα";

    select.appendChild(optionTitleAsc);
    select.appendChild(optionTitleDesc);
    select.appendChild(optionCategoryAsc);
    select.appendChild(optionCategoryDesc);

    form.appendChild(label);
    form.appendChild(select);

    filterSection.appendChild(form);
}

function OnSortOptionChange() {
    let sortOption = document.getElementById("sort-option");
    let sortOrder = sortOption.options[sortOption.selectedIndex].value;

    let defaultResourcesType = JSON.parse(localStorage.getItem("defaultResourcesType"));
    let resourceType = defaultResourcesType.type;
    
    if(resourceType === "Book") {
        let pageBooks = globalPageState.GetBooks();
        SortResources(pageBooks, sortOrder);
    } else if(resourceType === "Course") {
        let pageCourses = globalPageState.GetCourses();
        SortResources(pageCourses, sortOrder);
    } else {
        console.error("Error: Wrong resource type!");
    }
}

function OnSearchButtonClicked() {
    let title = document.getElementById("search-edit").value;
    
    // store all resources for non destructive filter
    let mainSection = document.getElementsByClassName("main-section")[0];

    // remove all current resources
    let resources = mainSection.getElementsByTagName("article");
    for(let i = resources.length - 1; i >= 0; --i) {
        mainSection.removeChild(resources[i]);
    }
    
    let defaultResourcesType = JSON.parse(localStorage.getItem("defaultResourcesType")).type;
    
    if(title.trim() === "") {
        // restore all default resources

        if(defaultResourcesType === "Book") {
            for(let i = 0; i < books.length; ++i) {
                let bookArticle = CreateCardBook(books[i]);
                mainSection.appendChild(bookArticle);
            }

            globalPageState.SetBooks(books);
        } else if(defaultResourcesType == "Course") {
            for(let i = 0; i < courses.length; ++i) {
                let courseArticle = CreateCardCourse(courses[i]);
                mainSection.appendChild(courseArticle);
            }            

            globalPageState.SetCourses(courses);
        } else {
            console.error("Error: Undefined type: " + defaultResourcesType);
            return;
        }

        return;
    }
    
    let titlesPassed = [];
    let titles = [];

    if(defaultResourcesType === "Book") {
        for(let i = 0; i < books.length; ++i) {
            titles.push(books[i].title);
        }
    } else if(defaultResourcesType === "Course") {
        for(let i = 0; i < courses.length; ++i) {
            titles.push(courses[i].title);
        }
    }

    for(let i = 0; i < titles.length; ++i) {
        if(titles[i].includes(title.trim())) {
            titlesPassed.push(titles[i]);
        }
    }

    // find resources from title
    resources = [];
    if(defaultResourcesType === "Book") {
        for(let i = 0; i < books.length; ++i) {
            for(let j = 0; j < titlesPassed.length; ++j) {
                if(titlesPassed[j].includes(books[i].title)) {
                    resources.push(books[i]);
                }
            }
        }

        // create cards
        for(let i = 0; i < resources.length; ++i) {
            let bookArticle = CreateCardBook(resources[i]);
            mainSection.appendChild(bookArticle);
        }

        globalPageState.SetBooks(resources);

    } else if(defaultResourcesType === "Course") {
        for(let i = 0; i < courses.length; ++i) {
            for(let j = 0; j < titlesPassed.length; ++j) {
                if(titlesPassed[j].includes(courses[i].title)) {
                    resources.push(courses[i]);
                }
            }
        }

        // create cards
        for(let i = 0; i < resources.length; ++i) {
            let courseArticle = CreateCardCourse(resources[i]);
            mainSection.appendChild(courseArticle);
        }

        globalPageState.SetCourses(resources);
    }
}

function InitializeCourses() {
    let mainSectionTitle = document.getElementsByClassName("main-section-title")[0];
    mainSectionTitle.textContent = "Λίστα Μαθημάτων";

    let mainSection = document.getElementsByClassName("main-section")[0];
    mainSection.removeChild(document.getElementsByClassName("main-article")[0]);

    SearchFilter();
    SortFilter();

    localStorage.setItem("defaultResourcesType", JSON.stringify({type: "Course"}));
    
    SortResources(courses);
}

function InitializeCourseDetails() {
    let resourceClicked = JSON.parse(localStorage.getItem("resourceClicked"));
    
    //if(resourceClicked === null) {
    //    resourceClicked = books[0];
    //}

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

function CreateCardCourse(course, article = null) {
    
    if(article === null) {
        article = document.createElement("article");
    }

    article.className = "course-card";
    article.id = "course-card-" + course.id;

    let imageDiv = document.createElement("div");
    imageDiv.className = "image-div";

    let imageTag = document.createElement("img");
    imageTag.src = course.img[0];
    imageTag.srcset = course.img[2] + " 119w, " + course.img[1] + " 237w, " + course.img[0] + " 474w";
    imageTag.sizes = "(max-width: 500px) 119px, (max-width: 700px) 237px, 474px";
    imageTag.alt = "Εικόνα Μαθήματος " + course.title;

    let imageATag = document.createElement("a");
    imageATag.href = "course-details.html";
    imageATag.className = "course-image-link";
    imageATag.id = "course-image-link-" + course.id;
    imageATag.addEventListener("click", OnLinkClickedCallback);

    imageDiv.appendChild(imageTag);
    imageDiv.appendChild(imageATag);

    let titleTag = document.createElement("h4");
    titleTag.textContent = "Τίτλος: " + course.title;
    titleTag.className = "title";
    let categoryTag = document.createElement("h4");
    categoryTag.textContent = "Κατηγορία: " + course.category;
    let semesterTag = document.createElement("h4");
    semesterTag.textContent = "Εξάμηνο: " + course.semester;
    let descriptionTag = document.createElement("h4");
    descriptionTag.textContent = "Περιγραφή: " + course.description;
    let availabilityTag = document.createElement("h4");
    availabilityTag.textContent = "Διαθεσιμότητα: " + course.availability;

    // avoid putting position absolute on last element so that the container can include it when it calculates its dimensions
    let empty = document.createElement("div");


    article.appendChild(imageDiv);
    article.appendChild(titleTag);
    article.appendChild(categoryTag);
    article.appendChild(semesterTag);
    article.appendChild(descriptionTag);
    article.appendChild(availabilityTag);
    article.appendChild(empty);

    return article;
}

function CreateCardBook(book, article = null) {
    if(article === null) {
        article = document.createElement("article");
    }

    article.className = "book-card";
    article.id = "book-card-" + book.id;

    let imageDiv = document.createElement("div");
    imageDiv.className = "image-div";

    let imageTag = document.createElement("img");
    imageTag.src = book.img[0];
    imageTag.srcset = book.img[2] + " 128w, " + book.img[1] + " 256w, " + book.img[0] + " 512w";
    imageTag.sizes = "(max-width: 500px) 128px, (max-width: 700px) 256px, 512px";
    imageTag.alt = "Εικόνα Βιβλίου " + book.title;

    let imageATag = document.createElement("a");
    imageATag.href = "course-details.html";
    imageATag.className = "book-image-link";
    imageATag.id = "book-image-link-" + book.id;
    imageATag.addEventListener("click", OnLinkClickedCallback);

    imageDiv.appendChild(imageTag);
    imageDiv.appendChild(imageATag);

    let titleTag = document.createElement("h4");
    titleTag.textContent = "Τίτλος: " + book.title;
    titleTag.className = "title";
    let categoryTag = document.createElement("h4");
    categoryTag.textContent = "Κατηγορία: " + book.category;
    let authorsTag = document.createElement("h4");
    let authorsText = "";
    
    for(let i = 0; i < book.authors.length; ++i) {
        authorsText = authorsText + book.authors[i] + ", ";
    }
    authorsText.substring(0, authorsText.length - 2);

    authorsTag.textContent = "Συγγραφείς: " + authorsText;
    let descriptionTag = document.createElement("h4");
    descriptionTag.textContent = "Περιγραφή: " + book.description;

    let pageNumberTag = document.createElement("h4");
    pageNumberTag.textContent = "Αριθμός Σελίδων: " + book.pageNumber;
    
    // avoid putting position absolute on last element so that the container can include it when it calculates its dimensions
    let empty = document.createElement("div");

    article.appendChild(imageDiv);
    article.appendChild(titleTag);
    article.appendChild(categoryTag);
    article.appendChild(authorsTag);
    article.appendChild(descriptionTag);
    article.appendChild(pageNumberTag);
    article.appendChild(empty);

    return article;
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
        "p3220202", "p3220202@aueb.gr", cardPerson2);

    // cardPerson1 already appended to main-section
    document.getElementsByClassName("main-section")[0].appendChild(cardPerson2);
}

function CreateCardPerson(id, img, name, email, article = null) {
    if(article === null) {
        article = document.createElement("article");
        article.className = "card-person";
        article.id = "card-person-" + id;
    }

    let imageTag = document.createElement("img");
    imageTag.src = img[0];
    imageTag.srcset = img[2] + " 128w, " + img[1] + " 256w, "+ img[0] + " 512w";
    imageTag.sizes = "(max-width: 500px) 128px, (max-width: 700px) 256px, 512px";
    imageTag.alt = "Εικόνα Ατόμου " + name;

    let nameTag = document.createElement("h4");
    nameTag.textContent = name;

    let emailTag = document.createElement("h4");
    emailTag.textContent = email;

    article.appendChild(imageTag);
    article.appendChild(nameTag);
    article.appendChild(emailTag);
}

function InitializeRegister() {
    let mainSectionTitle = document.getElementsByClassName("main-section-title")[0];
    mainSectionTitle.textContent = "Στοιχεία";

    let mainArticle = document.getElementsByClassName("main-article")[0];
    mainArticle.id = "main-article-form";

    formInputValues = JSON.parse(localStorage.getItem("formInputValues"));


    let form = CreateForm("personal-details-form", "Προσωπικά Στοιχεία", null, null);
    form.addEventListener("input", OnFormInput);

    CreateLabelInput(form, "name", "Όνομα: ", "text", formInputValues["value-name"], 25, "Όνομα", null, null);
    CreateLabelInput(form, "surname", "Επώνυμο: ", "text", formInputValues["value-surname"], 25, "Επώνυμο", null, null);
    CreateLabelInput(form, "birth-date", "Ημερομηνία Γέννησης: ", "date", formInputValues["value-birth-date"], null, null, null);
    CreateLabelInput(form, "phone", "Αριθμός Τηλεφώνου: ", "tel", formInputValues["value-phone"], 10, null, "[0-9]{10}", null);

    mainArticle.appendChild(form);
    
    form = CreateForm("account-details-form", "Στοιχεία Λογαριασμού", null, null);
    form.addEventListener("input", OnFormInput);

    CreateLabelInput(form, "user-name", "Όνομα Χρήστη: ", "text", formInputValues["value-user-name"], 25, "abc", null, null);
    CreateLabelInput(form, "password", "Κωδικός Πρόσβασης: ", "password", formInputValues["value-password"], 25, null, null, null);
    CreateLabelInput(form, "email", "email: ", "email", formInputValues["value-email"], 25, "abc@aueb.gr", null, null);

    mainArticle.appendChild(form);

    form = CreateForm("interests-form", "Ενδιαφέροντα", null);
    form.addEventListener("input", OnFormInput);

    CreateLabelRadio(form, "Αγαπημένη Κατηγορία: ", "category", formInputValues["value-category"], [{value: "Προγραμματισμός", name: "programming"}, 
        {value: "IT", name: "IT"}, 
        {value: "Μαθηματικά", name: "maths"}, 
        {value: "Ηλεκτρονικοί Υπολογιστές", name: "computers"}]);
    CreateLabelDropdown(form, "difficulty-level", "Επίπεδο: ", formInputValues["value-difficulty-level"], ["Αρχάριο", "Μέτριο", "Προχωρημένο"]);
    CreateLabelInput(form, "like", "Μου αρέσει η Πληροφορική: ", "checkbox", formInputValues["value-like"], null, null, null, null);
    CreateButton(form, "submit", "Υποβολή");
    
    mainArticle.appendChild(form);
}

function OnFormInput(event) {
    let formInputValues = JSON.parse(localStorage.getItem("formInputValues"));

    if(event.target.type === "checkbox") {
        formInputValues[event.target.name] = !(formInputValues[event.target.name]);
    } else {
        formInputValues[event.target.name] = event.target.value;
    }

    localStorage.setItem("formInputValues", JSON.stringify(formInputValues));
}

function CreateButton(form, buttonID, buttonText) {
    let div = document.createElement("div");

    let button = document.createElement("input");
    button.type = "button";
    button.id = "button-" + buttonID;
    button.value = buttonText;
    button.addEventListener("click", OnSubmitClicked);

    div.appendChild(button);

    form.appendChild(div);
}

function OnSubmitClicked() {

    let formInputValues = JSON.parse(localStorage.getItem("formInputValues"));

    formInputValuesText = "";
    for(key in formInputValues) {
        if(key === "value-like") {
            formInputValuesText += inputValueToText[key] + " : " + (formInputValues[key] === true ? "Ναί" : "Όχι") + "\n";
        } else {
            formInputValuesText += inputValueToText[key] + " : " + formInputValues[key] + "\n";
        }
    }

    alert("Υποβολή στοιχείων: \n" + formInputValuesText);
}

function CreateLabelRadio(form, labelName, radioName, inputValue, elements) {
    let div = document.createElement("div");
    div.id = "div-label-" + radioName;
    
    let label = document.createElement("label");

    label.htmlFor = "input-" + elements[0].name;
    label.textContent = labelName;

    div.appendChild(label);

    for(let i = 0; i < elements.length; ++i) {

        let div2 = document.createElement("div");

        label = document.createElement("label");
        label.htmlFor = "input-" + elements[i].name;
        label.textContent = elements[i].value;

        let radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "input-" + elements[i].name;
        radio.className = "input-" + elements[i].name; // hack so we can select it 
        radio.name = "value-" + radioName;
        radio.value = elements[i].value;
        
        if(inputValue === radio.value) {
            radio.checked = true;
        }

        div2.appendChild(label);
        div2.appendChild(radio);

        div.appendChild(div2);
    }

    if(inputValue === "") {
        div.getElementsByClassName("input-programming")[0].checked = true;
    }

    form.appendChild(div);
    
}

function CreateLabelDropdown(form, labelName, labelText, inputValue, elements) {
    let div = document.createElement("div");

    let label = document.createElement("label");
    label.htmlFor = "input-" + labelName;
    label.textContent = labelText;

    let dropdown = document.createElement("select");
    dropdown.id = "input-" + labelName;
    dropdown.name = "value-" + labelName;

    for(let i = 0; i < elements.length; ++i) {
        let option = document.createElement("option");
        option.value = elements[i];
        option.text = elements[i];
        if(inputValue === elements[i]) {
            option.selected = true;
        }

        dropdown.appendChild(option);
    }

    
    div.appendChild(label);
    div.appendChild(dropdown);
    
    if(inputValue === "") {
        dropdown.getElementsByTagName("option")[0].selected = true;
    }
    
    form.appendChild(div);
    
}

function CreateForm(id, legendText) {
    let form = document.createElement("form");
    form.id = id;

    let legendPersonalDetails = document.createElement("legend");
    legendPersonalDetails.textContent = legendText;

    form.appendChild(legendPersonalDetails);

    return form;
}

function CreateLabelInput(form, labelName, labelText, inputType, inputValue, inputSize, inputPlaceholder, pattern, dataListName) {
    let div = document.createElement("div");

    let label = document.createElement("label");
    label.htmlFor = "input-" + labelName;
    label.textContent = labelText;

    let input = document.createElement("input");
    input.id = "input-" + labelName;
    input.name = "value-" + labelName;
    input.type = inputType;
    if(inputValue === true) {
        input.checked = true;
    } else {
        input.value = inputValue;
    }
    if(inputPlaceholder !== null) input.placeholder = inputPlaceholder;
    if(inputSize !== null) input.size = inputSize;
    if(pattern !== null) input.pattern = pattern;
    if(dataListName !== null) input.setAttribute("list", dataListName);
    input.required = true;

    div.appendChild(label);
    div.appendChild(input);

    form.appendChild(div);
}