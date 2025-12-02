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