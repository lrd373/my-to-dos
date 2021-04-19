import {myList, myProjects} from "./list_logic";
import {itemForm, projectForm} from "./forms";

const content = document.querySelector("#content");

// Fix edit button functionality - replace values with inputs that allow
// user to update the values
// DO NOT open form and then delete list item --> if user exits form, their item is gone

const listItemHTML = (listItemObj) => {
    let id = listItemObj.itemId;
    let title = listItemObj.itemTitle;
    let dueDate = new Date(listItemObj.itemDueDate);
    let description = listItemObj.itemDescription;

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("list-item-container");
    itemDiv.setAttribute("id", id);


    // ***** TASK TITLE ******
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("item-title-container");

        let itemTitle = document.createElement("h3");
        itemTitle.classList.add("list-item-title");
        itemTitle.textContent = title;
        titleDiv.appendChild(itemTitle);

        let toggleDescription = document.createElement("button");
        toggleDescription.classList.add("toggle-description");
        toggleDescription.textContent = "🔺";
        toggleDescription.addEventListener("click", () => {
            if (toggleDescription.classList.contains("spin-and-reveal")) {
                toggleDescription.classList.remove("spin-and-reveal");
                itemDescription.style.display = "none";
            } else {
                toggleDescription.classList.add("spin-and-reveal");
                itemDescription.style.display = "inline-block";
            }
            
        });
        if (description) {
            toggleDescription.style.display = "inline";
        } else {
            toggleDescription.style.display = "none";
        }
        titleDiv.appendChild(toggleDescription);

        let newTitleInput = document.createElement("input");
        newTitleInput.setAttribute("type", "text");
        newTitleInput.setAttribute("value", `${itemTitle.textContent}`);
        newTitleInput.style.display = "none";
        titleDiv.appendChild(newTitleInput);
        

    let checkbox = document.createElement("span");
    checkbox.classList.add("item-checkbox");
    checkbox.addEventListener("click", () => {
        if (itemTitle.classList.contains("checked")) {
            itemTitle.classList.remove("checked");
            checkbox.textContent = "";
            checkbox.style.backgroundColor = "#668658";
        } else {
            itemTitle.classList.add("checked");
            checkbox.textContent = "✔️";
            checkbox.style.backgroundColor = "rgb(37, 51, 38)"
        }
    });

    // ****** Due Date ******
    let dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("duedate-container");
        let dueText = document.createElement("p");
        dueText.textContent = "Due: ";
        let itemDueDate = document.createElement("p");
        itemDueDate.classList.add("list-item-duedate");

        if (listItemObj.itemDueDate) {
            itemDueDate.textContent = dueDate.toLocaleDateString();
            dueDateDiv.appendChild(dueText);
        } 
        dueDateDiv.appendChild(itemDueDate);

        let newDateInput = document.createElement("input");
        newDateInput.setAttribute("type", "date");
        newDateInput.style.display = "none";
        dueDateDiv.appendChild(newDateInput);

    // ****** Description ********
    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description-container");

        let itemDescription = document.createElement("p");
        itemDescription.classList.add("list-item-description");
        itemDescription.textContent = description;
        descriptionDiv.appendChild(itemDescription);

        let newDescriptionInput = document.createElement("textarea");
        newDescriptionInput.setAttribute("value", `${itemDescription.textContent}`);
        newDescriptionInput.setAttribute("rows", "5");
        newDescriptionInput.setAttribute("cols", "50");
        newDescriptionInput.style.display = "none";
        descriptionDiv.appendChild(newDescriptionInput);
    
    // ******** Buttons **********
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("item-button-container");
        let submitEdits = document.createElement("button");
        submitEdits.classList.add("submit-edits-button");
        submitEdits.classList.add("submit-button");
        submitEdits.textContent = "Submit";
        submitEdits.style.display = "none";
        submitEdits.addEventListener("click", () => {
            toggleTaskForm();
        });

        let removeButton = document.createElement("button");
        removeButton.classList.add("remove-item-button");
        removeButton.classList.add("img-button");
        removeButton.innerHTML = "<img src='images/trash.png' alt='Edit list item'>";
        removeButton.addEventListener("click", () => {
            myList.removeFromList(id);
        });

        let editButton = document.createElement("button");
        editButton.classList.add("edit-item-button");
        editButton.classList.add("img-button");
        editButton.innerHTML = "<img src='images/edit.png' alt='Delete list item'>"
        editButton.addEventListener("click", () => {
            toggleTaskForm();
        });
    buttonDiv.appendChild(submitEdits);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(removeButton);


    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(titleDiv);
    itemDiv.appendChild(dueDateDiv);
    itemDiv.appendChild(buttonDiv);
    itemDiv.appendChild(descriptionDiv);

    const toggleTaskForm = () => {

        if (submitEdits.style.display !== "none") {
            itemTitle.textContent = newTitleInput.value;
            itemTitle.style.display = "inline";
            toggleDescription.style.display = "inline";
            newTitleInput.style.display = "none";
            
            if (newDateInput.value) {
                let dateInput = new Date(newDateInput.value);
                itemDueDate.textContent = dateInput.toLocaleDateString();
            } else {
                itemDueDate.textContent = "";
            }
            dueText.style.display = "inline";
            itemDueDate.style.display = "inline";
            newDateInput.style.display = "none";
    
            editButton.style.display = "inline";
            removeButton.style.display = "inline";
            submitEdits.style.display = "none";

            itemDescription.textContent = newDescriptionInput.value;
            itemDescription.style.display = "none";
            if (newDescriptionInput.value) {
                toggleDescription.style.display = "inline";
            } else {
                toggleDescription.style.display = "none";
            }
            newDescriptionInput.style.display = "none";
            

        } else { 
            itemTitle.style.display = "none";
            toggleDescription.style.display = "none";
            newTitleInput.style.display = "inline";
    
            dueText.style.display = "none";
            itemDueDate.style.display = "none";
            newDateInput.style.display = "inline";
    
            editButton.style.display = "none";
            removeButton.style.display = "none";
            submitEdits.style.display = "inline";

            itemDescription.style.display = "none";
            newDescriptionInput.style.display = "inline";
        }
    }

    return itemDiv;
}; 



const listContainer = () => {

    let listDiv = document.querySelector("#list-container");

    if (listDiv) {
        while (listDiv.childNodes.length > 1) {
            listDiv.firstChild.remove();
        }
    } else {
        listDiv = document.createElement("div");
        listDiv.setAttribute("id", "list-container");
        let addButton = document.createElement("button");
        addButton.setAttribute("id", "add-button");
        addButton.classList.add("submit-button");
        addButton.textContent = "+ Add Item";
        addButton.addEventListener("click", () => {
            itemForm.launchForm();
        });
        listDiv.appendChild(addButton);
    }


    let addItemButton = document.querySelector("#add-button");
    let list = myList.getList();

    if (addItemButton) {
        list.forEach(item => {
            addItemButton.before(listItemHTML(item));
        });
    }
    

    content.appendChild(listDiv);
};

const projectButtonContainer = () => {
    
    // Look for Div Container for Project Buttons
    // If it exists, remove all existing project buttons
    // If it doesn't exist, create it
    let projectButtonDiv = document.querySelector("#project-button-container");
    if (projectButtonDiv) {
        while(projectButtonDiv.childNodes.length > 1) {
            projectButtonDiv.removeChild(projectButtonDiv.lastChild);
        }
    } else {
        projectButtonDiv = document.createElement("div");
        projectButtonDiv.setAttribute("id", "project-button-container");
        let addProjectButton = document.createElement("button");
        addProjectButton.setAttribute("id", "add-project-button");
        addProjectButton.classList.add("submit-button");
        addProjectButton.textContent = "+ Add Project";
        addProjectButton.addEventListener("click", () => {
            projectForm.launchForm();
        });
        projectButtonDiv.appendChild(addProjectButton);
    }

    const createProjectButton = (project) => {
        let projectButton = document.createElement("button");
        projectButton.classList.add("project-button");
        projectButton.setAttribute("type", "button");
        projectButton.textContent = project.name;

        // add head to project functionality here
        projectButton.addEventListener("click", () =>{
            myProjects.setCurrentProject(project.id);
        });

        projectButtonDiv.appendChild(projectButton);
    }

    let projects = myProjects.getProjects();

    if (projects.length > 1) {
        let myProjects = document.createElement("h2");
        myProjects.setAttribute("id", "my-projects");
        myProjects.textContent = "My Projects";
        projectButtonDiv.appendChild(myProjects);

        let divider = document.createElement("hr");
        divider.setAttribute("id", "projects-divider");
        projectButtonDiv.appendChild(divider);
    }
    

    projects.forEach(project => {
        if (project != myProjects.getCurrentProject()) {
            createProjectButton(project);
        } 
    });

    content.appendChild(projectButtonDiv);
}

const setHeaderText = (str) => {
    const headerText = document.querySelector("h1");
    headerText.textContent = str;
}

export {listContainer, projectButtonContainer, setHeaderText};