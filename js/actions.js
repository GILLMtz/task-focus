import { inputTask,taskSectionElement,  bodyElement } from './constantes.js';
import actionHandler from './action-handler.js';
import stateHandler from './state-handler.js';
import utils from './utils.js';
function add() {
    if (inputTask.value == "") { return; }
    if (actionHandler.canTaskBeAdded(inputTask.value)) { 
        alert("Ya exite una tarea con el mismo nombre"); 
        return; 
    }
    actionHandler.add(inputTask.value);
}

function start(target) {
    if(stateHandler.isAnyProcessRunning()){return ;}
    const taskId = target.parentElement.parentElement.dataset.id;
    actionHandler.start(taskId);
}

function pause() {
    if(!stateHandler.isAnyProcessRunning()){return ;}
    actionHandler.pause();
    return ;
}

function remove(target) {   
    const taskId=!stateHandler.isAnyProcessRunning()?target.parentElement.parentElement.dataset.id:stateHandler.getIdCurrentTask();
    actionHandler.remove(taskId);
}

function switchAppTheme() {
    stateHandler.toggleTheme();
    utils.switchBtnTheme();
}

function upTaskSection(){
    taskSectionElement.classList.toggle('up-section');
    bodyElement.classList.toggle('up-tasks-section');
    utils.setBtnUpTasksSection();
}

export default {add,start,pause,remove,switchAppTheme,upTaskSection};
