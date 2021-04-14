

const listItemFactory = (title, description, dueDate, priority) => {
    let _id = generateId(title, description);
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;

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

    const getId = () => {
        return _id;
    }

    const getTitle = () => {
        return _title;
    }

    const setTitle = (str) => {
        _title = str;
    }

    const getDescription = () => {
        return _description;
    }

    const setDescription = (str) => {
        _description = str;
    }

    const getDueDate = () => {
        return _dueDate;
    }

    const setDueDate = (date) => {
        _dueDate = date;
    }

    const getPriority = () => {
        return _priority;
    }

    const setPriority = (str) => {
        _priority = str;
    }

    return {getId,
            getTitle, 
            setTitle, 
            getDescription, 
            setDescription,
            getDueDate,
            setDueDate,
            getPriority,
            setPriority}
};

const myList = (() => {
    let _list = [];

    const addToList = (title, description, dueDate, priority) => {
        let newItem = listItemFactory(title, description, dueDate, priority);
        _list.push(newItem);
    };

    const removeFromList = (id) => {
        let itemIndex = _list.find(item => item.getId() === id);
        if (itemIndex !== -1) {
            _list.splice(itemIndex,1)
        };
    };

    const getList = () => {
        return _list;
    }

    return {addToList, removeFromList, getList};
})();

export default myList;