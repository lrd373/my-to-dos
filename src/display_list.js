import myList from "./list_logic";

const listItemHTML = (listItemObj) => {
    let id = listItemObj.getId();
    let title = listItemObj.getTitle();
    let description = listItemObj.getDescription();
    let dueDate = listItemObj.getDueDate();
    let priority = listItemObj.getPriority();

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("list-item-container");
    itemDiv.setAttribute("id", id);

    let itemTitle = document.createElement("h3");
    itemTitle.classList.add("list-item-title");
    itemTitle.textContent = title;

    let itemDescription = document.createElement("p");
    itemDescription.classList.add("list-item-description");
    itemDescription.textContent = description;

    let itemDueDate = document.createElement("p");
    itemDueDate.classList.add("list-item-duedate");
    itemDueDate.textContent = dueDate;

    let itemPriority = document.createElement("p");
    itemPriority.classList.add("list-item-priority");
    itemPriority.textContent = priority;

    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDescription);
    itemDiv.appendChild(itemDueDate);
    itemDiv.appendChild(itemPriority);

    return itemDiv;
}; 


const listContainer = () => {
    const content = document.querySelector("#content");

    let list = myList.getList();

    list.forEach(item => {
        content.appendChild(listItemHTML(item));
    });
};

export default listContainer;