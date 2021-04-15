import {listContainer, projectButtonContainer} from "./display";



// Add ability to have multiple "Projects"
// Header displays projects array
// User clicks project name button
// check if list of such name exists in local storage
// if so, set current list to that list
// all add/remove and display functions work with the var current list
// on first page load, current list = My To-Dos default list

// Add buttons to add remove entire Projects (to do lists in local storage)

const generateId = (str1, str2) => {
    let id = "";
    if (str1) {id += str1.charAt(0)}
    if (str2) {id += str2.charAt(0)}

    let rando1 = Math.ceil(Math.random() * 10000);
    let rando2 = Math.ceil(Math.random() * 10000);
    let result = rando1 * rando2;
    id += result;

    return id;
}

const listItemFactory = (title, description, dueDate, priority) => {
    
    
    let itemId = generateId(title, description);
    let itemTitle = title;
    let itemDescription = description;
    let itemDueDate = dueDate;
    let itemPriority = priority;

    return {itemId, itemTitle, itemDescription, itemDueDate, itemPriority}
};

const myProjects = (() => {
    let _projects = [];

    // const storageAvailable = (type) => {
    //     var storage;
    //     try {
    //         storage = window[type];
    //         var x = '__storage_test__';
    //         storage.setItem(x, x);
    //         storage.removeItem(x);
    //         return true;
    //     }
    //     catch(e) {
    //         return e instanceof DOMException && (
    //             // everything except Firefox
    //             e.code === 22 ||
    //             // Firefox
    //             e.code === 1014 ||
    //             // test name field too, because code might not be present
    //             // everything except Firefox
    //             e.name === 'QuotaExceededError' ||
    //             // Firefox
    //             e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
    //             // acknowledge QuotaExceededError only if there's something already stored
    //             (storage && storage.length !== 0);
    //     }
    // }

    // if (storageAvailable("localStorage") && localStorage.getItem("projects")) {
    //     console.log("Local storage available");
    //     _projects = JSON.parse(localStorage.getItem("projects"));
    // } else {
    //     console.log("No local storage available");
    // }

    const addProject = (name) => {
        // List obj is an obj with three properties:
        // id
        // name of the project
        // an array --> the array of objs that represents that specific
        // to do list
        let id = generateId(name);
        let listObj = {
            id: id,
            name: name,
            list: []
        }
        _projects.push(listObj);
        projectButtonContainer();
    }

    const deleteProject = (id) => {
        let projectIndex = _projects.findIndex(project => project.id == id);
        _projects.splice(projectIndex,1);
    }

    const setCurrentProject = () => {

    }

    const getProject = (id) => {
        let theProject = _projects.find(project => project.id == id);
        return theProject;
    }

    const getProjects = () => {
        return _projects;
    }

    return {getProject, getProjects, addProject, deleteProject, setCurrentProject}

})();

const myList = (() => {
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

    let _list = [];
    
    if (storageAvailable("localStorage") && localStorage.getItem("_list")) {
        console.log("Local storage available");
        _list = JSON.parse(localStorage.getItem("_list"));
        console.log("After get");
        console.log(_list);
    } else {
        console.log("No local storage available");
    }

    const setLocalStorage = () => {
        console.log("trying to set local storage");
        if (storageAvailable("localStorage")) {
            localStorage.setItem("_list", JSON.stringify(_list));
        }
    }

    const addToList = (title, description, dueDate, priority) => {
        let newItem = listItemFactory(title, description, dueDate, priority);
        _list.push(newItem);
        setLocalStorage();
        listContainer();
    }

    const removeFromList = (id) => {
        console.log("remove triggered");
        let itemIndex = _list.findIndex(itemObj => itemObj.itemId == id);

        if (itemIndex !== -1) {
            _list.splice(itemIndex,1)
        };
        console.log(_list);
        setLocalStorage();
        listContainer();
    }

    const getList = () => {
        return _list;
    }

    return {addToList, removeFromList, getList}

})();

export {myList, myProjects};