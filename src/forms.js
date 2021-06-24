import { listContainer } from "./display";
import {myList, myProjects} from "./list_logic";

// make submit button clear values of inputs

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
        form.setAttribute("id", "new-list-item-form");

        let contentDiv = document.createElement("div");
        contentDiv.classList.add("form-content-container");

        let exitButton = document.createElement("button");
        exitButton.setAttribute("type", "button");
        exitButton.classList.add("form-exit-button");
        exitButton.textContent = "❌";
        exitButton.addEventListener("click", () => {
            closeForm();
            setFormValues("", "", "");
        });
        contentDiv.appendChild(exitButton);


        let titleLabel = document.createElement("label");
        titleLabel.setAttribute("for","title-input");
        titleLabel.textContent = "Title";
        let titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "title-input");
        contentDiv.appendChild(titleLabel);
        contentDiv.appendChild(titleInput);

        let descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "description-input");
        descriptionLabel.textContent = "Description";
        let description = document.createElement("textarea");
        description.setAttribute("id", "description-input");
        contentDiv.appendChild(descriptionLabel);
        contentDiv.appendChild(description);

        let dueDateLabel = document.createElement("label");
        dueDateLabel.setAttribute("for", "due-date");
        dueDateLabel.textContent = "Due Date";
        let dueDate = document.createElement("input");
        dueDate.setAttribute("id", "due-date");
        dueDate.setAttribute("type", "date");
        contentDiv.appendChild(dueDateLabel);
        contentDiv.appendChild(dueDate);

        let submitButton = document.createElement("button");
        submitButton.setAttribute("type", "button");
        submitButton.classList.add("form-submit-button");
        submitButton.classList.add("submit-button");
        submitButton.textContent = "+ Add to list";
        submitButton.addEventListener("click", () => {
            myList.addToList(
                titleInput.value,
                description.value,
                dueDate.value,
            );
            itemForm.closeForm();
            setFormValues("","","");
        });

        contentDiv.appendChild(submitButton);
        form.appendChild(contentDiv);

        formContainer.appendChild(form);

        content.appendChild(formContainer);
    }

    const setFormValues = (title, description, dueDate) => {
        let titleInput = document.querySelector("#title-input");
        let descriptionInput = document.querySelector("#description-input");
        let dueDateInput = document.querySelector("#due-date");

        if (titleInput && descriptionInput && dueDateInput) {
            titleInput.value = title;
            descriptionInput.value = description;
            dueDateInput.value = dueDate;
        }

    }

    return {generateForm, launchForm, closeForm, setFormValues};
})();

const projectForm = (() => {
    const content = document.querySelector("#content");

    let formContainer = document.createElement("div");
    formContainer.setAttribute("id", "project-form-container");

    const launchForm = () => {
        formContainer.style.display = "block";
    }

    const closeForm = () => {
        formContainer.style.display = "none";
        let nameInput = document.querySelector("#name-input");
        nameInput.value = "";
    }

    const generateForm = () => {
        let form = document.createElement("form");
        let exitButton = document.createElement("button");
        exitButton.classList.add("form-exit-button");
        exitButton.textContent = "❌";
        exitButton.addEventListener("click", closeForm);
        form.appendChild(exitButton);

        let nameLabel = document.createElement("label");
        nameLabel.setAttribute("for","name-input");
        nameLabel.textContent = "Project Name";
        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "name-input");
        form.appendChild(nameLabel);
        form.appendChild(nameInput);

        let submitButton = document.createElement("button");
        submitButton.setAttribute("type", "button");
        submitButton.classList.add("form-submit-button");
        submitButton.classList.add("submit-button");
        submitButton.textContent = "Create project";
        submitButton.addEventListener("click", () => {
            myProjects.addProject(nameInput.value);
            projectForm.closeForm();
        });

        form.appendChild(submitButton);

        formContainer.appendChild(form);

        content.appendChild(formContainer);
    }

    return {generateForm, launchForm, closeForm};
})();

export {itemForm, projectForm};