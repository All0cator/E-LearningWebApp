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