
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

    let deleteProject = document.createElement("button");
    deleteProject.textContent = "Delete project";
    deleteProject.setAttribute("id", "delete-project-button");
    deleteProject.classList.add("submit-button");
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

    content.appendChild(header);
   
};

export default showHeader;