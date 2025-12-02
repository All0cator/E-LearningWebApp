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