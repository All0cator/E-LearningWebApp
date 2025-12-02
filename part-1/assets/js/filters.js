function CreateSearchFilter() {
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

function CreateSortFilter() {
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