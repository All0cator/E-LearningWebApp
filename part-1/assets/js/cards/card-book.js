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