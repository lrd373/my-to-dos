import {myList, myProjects} from "./list_logic";
import {itemForm, projectForm} from "./forms";

const content = document.querySelector("#content");

const listItemHTML = (listItemObj) => {
    let id = listItemObj.itemId;
    let title = listItemObj.itemTitle;
    let description = listItemObj.itemDescription;
    let dueDate = listItemObj.itemDueDate;

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("list-item-container");
    itemDiv.setAttribute("id", id);

        let itemTitle = document.createElement("h3");
        itemTitle.classList.add("list-item-title");
        itemTitle.textContent = title;

        let itemDescription = document.createElement("p");
        itemDescription.classList.add("list-item-description");
        itemDescription.textContent = description;

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

        let itemDueDate = document.createElement("p");
        itemDueDate.classList.add("list-item-duedate");
        itemDueDate.textContent = dueDate;

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
            myList.removeFromList(id);
            itemForm.setFormValues(title, description, dueDate, priority);
            itemForm.launchForm();
        });

    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDueDate);
    itemDiv.appendChild(removeButton);
    itemDiv.appendChild(editButton);
    itemDiv.appendChild(itemDescription);

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

export {listContainer, projectButtonContainer, setHeaderText};