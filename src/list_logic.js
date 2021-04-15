import listContainer from "./display_list";

const listItemFactory = (title, description, dueDate, priority) => {
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
    
    let itemId = generateId(title, description);
    let itemTitle = title;
    let itemDescription = description;
    let itemDueDate = dueDate;
    let itemPriority = priority;

    return {itemId, itemTitle, itemDescription, itemDueDate, itemPriority}
};

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

export default myList;