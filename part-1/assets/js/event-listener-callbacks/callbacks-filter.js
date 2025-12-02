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