
import { projectButtonContainer,listContainer } from "./display";
import showHeader from "./header";
import {myProjects} from "./list_logic";


showHeader();
if (myProjects.projectInList("mytodos") === false) {
    myProjects.addProject("My To-Dos", "mytodos");
}

myProjects.setCurrentProject("mytodos");
console.log("Projects at first load:");
console.log(myProjects.getProjects());
console.log("Current project at first load:");
console.log(myProjects.getCurrentProject());
listContainer();
projectButtonContainer();