function OnFormInput(event) {
    let formInputValues = JSON.parse(localStorage.getItem("formInputValues"));

    if(event.target.type === "checkbox") {
        formInputValues[event.target.name] = !(formInputValues[event.target.name]);
    } else {
        formInputValues[event.target.name] = event.target.value;
    }

    localStorage.setItem("formInputValues", JSON.stringify(formInputValues));
}

function OnSubmitClicked() {

    let formInputValues = JSON.parse(localStorage.getItem("formInputValues"));

    let hasError = false;

    formInputValuesText = "";
    for(key in formInputValues) {

        // clear all error spans before displaying new state of form
        let errorSpan = document.getElementById("error-" + key.substring(key.indexOf("-") + 1));
        if(errorSpan !== null) {
            errorSpan.textContent = "";
        }

        if(key === "value-like") {
            formInputValuesText += inputValueToText[key] + " : " + (formInputValues[key] === true ? "Ναί" : "Όχι") + "\n";
        } else {
            // check if it meets required, pattern and type criteria

            if(key !== "value-category") {
                let inputTag = document.getElementById("input-" + key.substring(key.indexOf("-") + 1));

                if(!inputTag.validity.valid) {
                    hasError = true;
                    if(inputTag.validity.valueMissing) {
                        errorSpan.textContent = "Το πεδίο είναι υποχρεωτικό.";
                    } else if(inputTag.validity.typeMismatch) {
                        errorSpan.textContent = "Λάθος τύπος δεδομένων.";
                    } else if(inputTag.validity.patternMismatch){
                        // Used only for phone
                        errorSpan.textContent = "Το πεδίο αποτελείται από 10 ψηφία";
                    }
                }
            }

            formInputValuesText += inputValueToText[key] + " : " + formInputValues[key] + "\n";
        }
    }

    if(!hasError) {
        alert("Υποβολή στοιχείων: \n" + formInputValuesText);
    }
}