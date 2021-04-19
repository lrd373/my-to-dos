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

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("item-title-container");


        let itemTitle = document.createElement("h3");
        itemTitle.classList.add("list-item-title");
        itemTitle.textContent = title;
        titleDiv.appendChild(itemTitle);

        if (description) {
            let toggleDescription = document.createElement("button");
            toggleDescription.classList.add("toggle-description");
            toggleDescription.textContent = "🔺";
            toggleDescription.addEventListener("click", () => {
                if (toggleDescription.classList.contains("spin-and-reveal")) {
                    toggleDescription.classList.remove("spin-and-reveal");
                    descriptionDiv.style.display = "none";
                } else {
                    toggleDescription.classList.add("spin-and-reveal");
                    descriptionDiv.style.display = "inline-block";
                }
                
            });
            titleDiv.appendChild(toggleDescription);
        }

        

    let checkbox = document.createElement("span");
    checkbox.classList.add("item-checkbox");
    checkbox.addEventListener("click", () => {
        if (itemTitle.classList.contains("checked")) {
            itemTitle.classList.remove("checked");
            checkbox.textContent = "";
        } else {
            itemTitle.classList.add("checked");
            checkbox.textContent = "✔️";
        }
    });

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

    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description-container");
    let itemDescription = document.createElement("p");
    itemDescription.classList.add("list-item-description");
    itemDescription.textContent = description;
    descriptionDiv.appendChild(itemDescription);
    
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("item-button-container");

        let removeButton = document.createElement("button");
        removeButton.classList.add("remove-item-button");
        removeButton.innerHTML = "<img src='images/trash.png' alt='Edit list item'>";
        removeButton.addEventListener("click", () => {
            myList.removeFromList(id);
        });

        let editButton = document.createElement("button");
        editButton.classList.add("edit-item-button");
        editButton.innerHTML = "<img src='images/edit.png' alt='Delete list item'>"
        editButton.addEventListener("click", () => {
            editButton.style.display = "none";
            removeButton.style.display = "none";
            toggleTaskForm(itemDiv);
        });

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(removeButton);

    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(titleDiv);
    itemDiv.appendChild(dueDateDiv);
    itemDiv.appendChild(buttonDiv);
    itemDiv.appendChild(descriptionDiv);

    return itemDiv;
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
        addProjectButton.textContent = "+";
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

    projects.forEach(project => {
        if (project != myProjects.getCurrentProject()) {
            createProjectButton(project);
        } 
    });

    content.appendChild(projectButtonDiv);
}

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
        addButton.textContent = "+ Add Task";
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

const setHeaderText = (str) => {
    const headerText = document.querySelector("h1");
    headerText.textContent = str;
}

const toggleTaskForm = (itemDiv) => {
    let itemId = itemDiv.getAttribute("id");
    let titleDiv = document.querySelector(`#${itemId} .item-title-container`);
    let itemTitle = titleDiv.firstChild;
    let dueDateDiv = document.querySelector(`#${itemId} .duedate-container`);
    let descriptionDiv = document.querySelector(`${itemId} .description-container`);
    let itemDescription = document.querySelector(`#${itemId} .list-item-description`);
    let buttonDiv = document.querySelector(`${itemId} .item-button-container`);
    let editButton = document.querySelector(`${itemId} .edit-item-button`);
    let removeButton = document.querySelector(`${itemId} .remove-item-button`)


    let newTitleInput = document.createElement("input");
    newTitleInput.setAttribute("type", "text");
    newTitleInput.setAttribute("value", `${itemTitle.textContent}`);
    while (titleDiv.firstChild) {
        titleDiv.removeChild(titleDiv.firstChild);
    }
    titleDiv.appendChild(newTitleInput);


    let newDateInput = document.createElement("input");
    newDateInput.setAttribute("type", "date");
    while (dueDateDiv.firstChild) {
        dueDateDiv.removeChild(dueDateDiv.firstChild);
    }
    dueDateDiv.appendChild(newDateInput);

    let submitEdits = document.createElement("button");
    submitEdits.classList.add("submit-edits");
    submitEdits.innerHTML = "<img src='images/checked.png' alt='Submit changes'>";
    submitEdits.addEventListener("click", () => {
        editButton.style.display = "inline";
        removeButton.style.display = "inline";
        submitEdits.style.display = "none";
    });
    buttonDiv.appendChild(submitEdits);

    if (descriptionDiv) {
        console.log("found description");
    } else {
        console.log("no desc exists, i swear");
    }
    let newDescriptionInput = document.createElement("textarea");
    newDescriptionInput.setAttribute("value", `${itemDescription.textContent}`);
    while (descriptionDiv.firstChild) {
        descriptionDiv.removeChild(descriptionDiv.firstChild);
    }
    
    descriptionDiv.appendChild(newDescriptionInput);

    
}

const createItem = (itemDiv, titleValue, dueDateValue, descriptionValue) => {

}

export {listContainer, projectButtonContainer, setHeaderText};