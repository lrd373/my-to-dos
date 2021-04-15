import {itemForm, projectForm} from "./forms";
import {myProjects} from "./list_logic";

const content = document.querySelector("#content");

const showHeader = () => {
    
    itemForm.generateForm();

    let header = document.createElement("header");

    let headerDiv = document.createElement("div");
    headerDiv.setAttribute("id","header-container");

    let projectTitle = document.createElement("h1");
    projectTitle.textContent = "My To-Dos";
    headerDiv.appendChild(projectTitle);

    let addButton = document.createElement("button");
    addButton.setAttribute("id", "add-button");
    addButton.textContent = "+";
    addButton.addEventListener("click", () => {
        itemForm.launchForm();
    });
    headerDiv.appendChild(addButton);

    header.appendChild(headerDiv);


    let projects = myProjects.getProjects();

    // Look for Div Container for Project Buttons
    // If it exists, remove all existing project buttons
    // If it doesn't exist, create it
    let projectButtonContainer = document.querySelector("#project-button-container");
    if (projectButtonContainer) {
        while(projectButtonContainer.firstChild) {
            projectButtonContainer.removeChild(projectButtonContainer.firstChild);
        }
    } else {
        projectButtonContainer = document.createElement("div");
        projectButtonContainer.setAttribute("id", "project-button-container");
    }

    projectForm.generateForm();
    let addProjectButton = document.createElement("button");
    addProjectButton.setAttribute("id", "add-project-button");
    addProjectButton.textContent = "+";
    addProjectButton.addEventListener("click", () => {
       projectForm.launchForm();
    });
    projectButtonContainer.appendChild(addProjectButton);

    const createProjectButton = (project) => {
        let projectButton = document.createElement("button");
        projectButton.classList.add("project-button");
        projectButton.setAttribute("type", "button");
        projectButton.textContent = project.name;
        // add head to project functionality here

        projectButtonContainer.appendChild(projectButton);
    }

    projects.forEach(project => {
        createProjectButton(project);
    });

    header.appendChild(projectButtonContainer);

    content.appendChild(header);
   
};

export default showHeader;