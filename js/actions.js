import { inputTask } from './constantes.js';
import actionHandler from './action-handler.js';
import stateHandler from './state-handler.js';

function add() {
    if (inputTask.value == "") { return; }
    if (actionHandler.canTaskBeAdded(inputTask.value)) { 
        alert("Ya exite una tarea con el mismo nombre"); 
        return; 
    }
    actionHandler.add(inputTask.value);
}

function start(event) {
    if(stateHandler.isAnyProcessRunning()){return ;}
   
    const taskId = event.target.parentElement.parentElement.dataset.id;
    actionHandler.start(taskId);
}

function pause() {
    if(!stateHandler.isAnyProcessRunning()){return ;}
    actionHandler.pause();
    return ;
}

function remove({target}) {   
    let taskId= !stateHandler.isAnyProcessRunning()
    ?target.parentElement.parentElement.dataset.id:stateHandler.getIdCurrentTask();
    actionHandler.remove(taskId);    
}

export default {add,start,pause,remove};
