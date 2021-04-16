
import {itemForm, projectForm} from "./forms";
import {myProjects} from "./list_logic";

const content = document.querySelector("#content");

const showHeader = () => {
    
    itemForm.generateForm();

    let header = document.createElement("header");

    let headerDiv = document.createElement("div");
    headerDiv.setAttribute("id","header-container");

    let projectTitle = document.createElement("h1");
    headerDiv.appendChild(projectTitle);

    let addButton = document.createElement("button");
    addButton.setAttribute("id", "add-button");
    addButton.textContent = "+";
    addButton.addEventListener("click", () => {
        itemForm.launchForm();
    });
    headerDiv.appendChild(addButton);

    let deleteProject = document.createElement("button");
    deleteProject.textContent = "Delete this project";
    deleteProject.setAttribute("id", "delete-project-button");
    // disable deleting function if id = mytodos
    deleteProject.addEventListener("click", () => {
        let thisProject = myProjects.getCurrentProject();
        let thisProjectId = thisProject.id;
        if (thisProjectId !== "mytodos") {
            myProjects.deleteProject(thisProjectId);
            let remainingProjects = myProjects.getProjects();
            let firstProjectId = remainingProjects[0].id;
            myProjects.setCurrentProject(firstProjectId);
        }
    });
    headerDiv.appendChild(deleteProject);

    header.appendChild(headerDiv);


    projectForm.generateForm();
    
    let addProjectButton = document.createElement("button");
    addProjectButton.setAttribute("id", "add-project-button");
    addProjectButton.textContent = "+";
    addProjectButton.addEventListener("click", () => {
       projectForm.launchForm();
    });

    header.appendChild(addProjectButton);

    content.appendChild(header);
   
};

export default showHeader;