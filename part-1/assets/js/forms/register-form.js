function CreateRegisterForm() {
    let mainArticle = document.getElementsByClassName("main-article")[0];
    mainArticle.id = "main-article-form";

    let formInputValues = JSON.parse(localStorage.getItem("formInputValues"));

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

    let error = document.createElement("span");
    error.id = "error-" + labelName;
    error.className = "error";
    error.textContent = "";

    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(error);

    form.appendChild(div);
}