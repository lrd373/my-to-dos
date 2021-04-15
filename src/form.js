import {myList} from "./list_logic";

const itemForm = (() => {
    const content = document.querySelector("#content");

    let formContainer = document.createElement("div");
    formContainer.setAttribute("id", "form-container");
       
    const launchForm = () => {
        formContainer.style.display = "block";
    }
    
    const closeForm = () => {
        formContainer.style.display = "none";
    }

    const generateForm = () => {
        let form = document.createElement("form");
        let exitButton = document.createElement("button");
        exitButton.setAttribute("id", "form-exit-button");
        exitButton.textContent = "x";
        exitButton.addEventListener("click", closeForm);
        form.appendChild(exitButton);


        let titleLabel = document.createElement("label");
        titleLabel.setAttribute("for","title-input");
        titleLabel.textContent = "Title";
        let titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "title-input");
        form.appendChild(titleLabel);
        form.appendChild(titleInput);

        let descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "description-input");
        descriptionLabel.textContent = "Description";
        let description = document.createElement("textarea");
        description.setAttribute("id", "description-input");
        form.appendChild(descriptionLabel);
        form.appendChild(description);

        let dueDateLabel = document.createElement("label");
        dueDateLabel.setAttribute("for", "due-date");
        dueDateLabel.textContent = "Due Date";
        let dueDate = document.createElement("input");
        dueDate.setAttribute("id", "due-date");
        dueDate.setAttribute("type", "date");
        form.appendChild(dueDateLabel);
        form.appendChild(dueDate);

        let priorityLabel = document.createElement("label");
        priorityLabel.setAttribute("for", "priority");
        priorityLabel.setAttribute("id", "priority-label");
        priorityLabel.textContent = "Priority";
        let priorityList = document.createElement("select")
        priorityList.setAttribute("id", "priority");
        priorityList.setAttribute("name", "priority");

            let high = document.createElement("option");
            high.setAttribute("value", "high");
            high.textContent = "High";
            let medium = document.createElement("option");
            medium.setAttribute("value", "medium");
            medium.textContent = "Medium";
            let low = document.createElement("option");
            low.setAttribute("value", "low");
            low.textContent = "Low";
            priorityList.appendChild(high);
            priorityList.appendChild(medium);
            priorityList.appendChild(low);

        form.appendChild(priorityLabel);
        form.appendChild(priorityList);

        let submitButton = document.createElement("button");
        submitButton.setAttribute("type", "button");
        submitButton.textContent = "Add to list";
        submitButton.addEventListener("click", () => {
            myList.addToList(
                titleInput.value,
                description.value,
                dueDate.value,
                priorityList.value
            );
            itemForm.closeForm();
        });

        form.appendChild(submitButton);

        formContainer.appendChild(form);

        content.appendChild(formContainer);
    }

    return {generateForm, launchForm, closeForm};
})();

export default itemForm;