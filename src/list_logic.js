import {listContainer, projectButtonContainer, setHeaderText} from "./display";

// Create "My To-Dos" default list from the start (maybe from index?)

const generateId = (str1, str2) => {
    let id = "";
    if (str1) {id += str1.charAt(0)}
    if (str2) {id += str2.charAt(0)}
    if (!str1 && !str2) {
        let alphaCharCode = Math.ceil(Math.random() * 26) + 64
        let alphaChar = String.fromCharCode(alphaCharCode);
        id += alphaChar;
    }

    let rando1 = Math.ceil(Math.random() * 10000);
    let rando2 = Math.ceil(Math.random() * 10000);
    let result = rando1 * rando2;
    id += result;

    return id;
}

const storageAvailable = (type) => {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

const listItemFactory = (title, description, dueDate, priority) => {
    
    let itemId = generateId(title, description);
    let itemTitle = title;
    let itemDescription = description;
    let itemDueDate = dueDate;

    return {itemId, itemTitle, itemDescription, itemDueDate}
};

const myProjects = (() => {
    let _projects = [];
    let _currentProject = {
        id: generateId("m"),
        name: "My To-Dos",
        list: []
    };

    if (storageAvailable("localStorage") && localStorage.getItem("projects")) {
        console.log("Local storage available");
        _projects = JSON.parse(localStorage.getItem("projects"));
    } else {
        console.log("No local storage available");
    }

    const setLocalStorage = () => {
        console.log("trying to set local storage");
        if (storageAvailable("localStorage")) {
            localStorage.setItem("projects", JSON.stringify(_projects));
            console.log("local storage updated successfully");
        }
        
    }

    const addProject = (name, givenId) => {
        let id;
        if (givenId) {
            id = givenId;
        } else {
            id = generateId(name);
        }
            
        let listObj = {
            id: id,
            name: name,
            list: []
        }
        _projects.push(listObj);
        setLocalStorage();
        projectButtonContainer();
    }


    const deleteProject = (id) => {
        let projectIndex = _projects.findIndex(project => project.id == id);
        _projects.splice(projectIndex,1);
        setLocalStorage();
        projectButtonContainer();
    }

    const getProject = (id) => {
        let theProject = _projects.find(project => project.id == id);
        return theProject;
    }

    const getProjects = () => {
        return _projects;
    }

    const getCurrentProject = () => {
        return _currentProject;        
    }

    const setCurrentProject = (id) => {
        _currentProject = getProject(id);
        setHeaderText(_currentProject.name);

        let deleteProjectButton = document.querySelector("#delete-project-button");
        if (id === "mytodos") {
            deleteProjectButton.style.display = "none";
        } else {
            deleteProjectButton.style.display = "inline";
        }
        
        projectButtonContainer();
        listContainer();
    }

    const projectInList = (id) => {
        let allProjects = getProjects();
        let foundProjectIndex = allProjects.findIndex(project => project.id = id);
        if (foundProjectIndex === -1) {
            return false;
        } else {
            return true;
        }
    }

    return {
            setLocalStorage,
            getProject, 
            getProjects, 
            addProject, 
            deleteProject, 
            getCurrentProject, 
            setCurrentProject,
            projectInList
        }

})();

const myList = (() => {

    const addToList = (title, description, dueDate) => {
        let newItem = listItemFactory(title, description, dueDate);
        
        // push newItem to currentProject's list property
        getList().push(newItem);
        console.log("Updated project");
        console.log(myProjects.getCurrentProject());

        myProjects.setLocalStorage();
        listContainer();
    }

    const removeFromList = (id) => {
        let itemIndex = getList().findIndex(itemObj => itemObj.itemId == id);

        if (itemIndex !== -1) {
            getList().splice(itemIndex,1)
        };
        myProjects.setLocalStorage();
        listContainer();
    }

    const getList = () => {
        let currentProject = myProjects.getCurrentProject();
        let _list = currentProject.list;
        return _list;
    }

    return {addToList, removeFromList, getList}

})();

export {myList, myProjects};