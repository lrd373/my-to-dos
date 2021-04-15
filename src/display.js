import {myList, myProjects} from "./list_logic";

const listItemHTML = (listItemObj) => {
    let id = listItemObj.itemId;
    let title = listItemObj.itemTitle;
    let description = listItemObj.itemDescription;
    let dueDate = listItemObj.itemDueDate;
    let priority = listItemObj.itemPriority;


    let itemDiv = document.createElement("div");
    itemDiv.classList.add("list-item-container");
    itemDiv.setAttribute("id", id);

        let removeButton = document.createElement("button");
        removeButton.classList.add("remove-item-button");
        removeButton.textContent = "x";
        removeButton.addEventListener("click", () => {
            myList.removeFromList(id);
        });

        let itemTextDiv = document.createElement("div");
        itemTextDiv.classList.add("item-text-div");

            let itemTitle = document.createElement("h3");
            itemTitle.classList.add("list-item-title");
            itemTitle.textContent = title;

            let itemDescription = document.createElement("p");
            itemDescription.classList.add("list-item-description");
            itemDescription.textContent = description;

        itemTextDiv.appendChild(itemTitle);
        itemTextDiv.appendChild(itemDescription);

        let itemDueDate = document.createElement("p");
        itemDueDate.classList.add("list-item-duedate");
        itemDueDate.textContent = dueDate;

        let itemPriority = document.createElement("p");
        itemPriority.classList.add("list-item-priority");
        itemPriority.textContent = `Priority: ${priority}`;

    itemDiv.appendChild(removeButton);
    itemDiv.appendChild(itemTextDiv);
    itemDiv.appendChild(itemDueDate);
    itemDiv.appendChild(itemPriority);

    return itemDiv;
}; 

const projectButtonContainer = () => {
    const header = document.querySelector("header");

    // Look for Div Container for Project Buttons
    // If it exists, remove all existing project buttons
    // If it doesn't exist, create it
    let projectButtonDiv = document.querySelector("#project-button-container");
    if (projectButtonDiv) {
        while(projectButtonDiv.firstChild) {
            projectButtonDiv.removeChild(projectButtonDiv.firstChild);
        }
    } else {
        projectButtonDiv = document.createElement("div");
        projectButtonDiv.setAttribute("id", "project-button-container");
    }

    const createProjectButton = (project) => {
        let projectButton = document.createElement("button");
        projectButton.classList.add("project-button");
        projectButton.setAttribute("type", "button");
        projectButton.textContent = project.name;
        // add head to project functionality here

        projectButtonDiv.appendChild(projectButton);
    }

    let projects = myProjects.getProjects();

    projects.forEach(project => {
        createProjectButton(project);
    });

    header.appendChild(projectButtonDiv);
}

const listContainer = () => {
    const content = document.querySelector("#content");

    let listDiv = document.querySelector("#list-container");

    if (listDiv) {
        while (listDiv.firstChild) {
            listDiv.removeChild(listDiv.firstChild);
        }
    } else {
        listDiv = document.createElement("div");
    }
    
    listDiv.setAttribute("id", "list-container");

    let list = myList.getList();

    list.forEach(item => {
        listDiv.appendChild(listItemHTML(item));
    });

    content.appendChild(listDiv);
};

export {listContainer, projectButtonContainer};