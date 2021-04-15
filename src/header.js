import itemForm from "./form";

const content = document.querySelector("#content");

const showHeader = () => {
    
    itemForm.generateForm();

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

    content.appendChild(headerDiv);
};

export default showHeader;