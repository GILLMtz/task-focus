import { TaskStates,
    CONFIG_SUCCESSFUL_MESSAGE_WHEN_TASK_IS_COMPLETED,
    CONFIG_START_NEXT_TASK,
ProcessType, 
DEFAULT_BREAK_TIME} from "./constantes.js";

 
import task from "./task.js";
import render from "./render.js";
import panelTime from "./panel-time.js";
import breakTime from "./break-time.js";
import modal from "./modal.js";
import stateHandler from "./state-handler.js";

function canTaskBeAdded(taskName){
    return task.addedTask(taskName);
}
function add(name){
    task.add(name);
    render.removeExampleTasks();
    render.viewTasks();
}


function start(taskId){
    const taskToStarting =  task.get(taskId);
    task.setState(taskToStarting.id, TaskStates.STARTING); 
    
    /* panelTime.updateName(taskToStarting.name); */

    panelTime.updateProcess(taskToStarting);

    stateHandler.setCurrentTask(taskToStarting);

 

    stateHandler.setTypeCurrentProcess(ProcessType.TASK);
    panelTime.counting(taskToStarting.time)
        .then(()=>stop())
        .then(()=>{
            let idNextTask=task.next();
            if(idNextTask){
                setTimeout(() => {
                    let { content, counterMin, counterMax } = CONFIG_START_NEXT_TASK;
                   modal.showAsNotification(content,counterMin, counterMax)
                   .then(()=>start(idNextTask));
                   return;
                }, 1000);
            }
            return;
        })
        .catch(()=>{console.log("Error")});        
     
    render.viewTasks();    
}

function pause(){
    panelTime.stopCounter(stateHandler.getIdCurrentProcess());
    let {minutes,seconds}=panelTime.getTime(); 
    task.updateTime(minutes,seconds,stateHandler.getIdCurrentTask());
    task.setState(stateHandler.getIdCurrentTask(), TaskStates.RESUME);
    render.viewTasks();

    panelTime.updateProcess(stateHandler.getCurrentTask() );

    stateHandler.reset();
}

function remove(taskId){
    panelTime.stopCounter(stateHandler.getIdCurrentProcess());
    task.removeById(taskId);
    panelTime.updateProcess(null,false);
  /*   panelTime.updateName(""); */
    task.empty()?render.addExampleTasks():render.viewTasks();
    panelTime.updateTime(25, 0);      
    stateHandler.reset();
}

function stop(){
   return new Promise((resolve,reject)=>{
       task.setState(stateHandler.getIdCurrentTask(), TaskStates.SUCCESSFUL);
       panelTime.updateProcess(stateHandler.getCurrentTask());
       stateHandler.reset();
       render.viewTasks();

       let { content, counterMin, counterMax } = CONFIG_SUCCESSFUL_MESSAGE_WHEN_TASK_IS_COMPLETED;
       modal.showAsNotification(content, counterMin, counterMax)
       .then(() => breakTime.start(DEFAULT_BREAK_TIME))
       .then(()=>resolve());
   });
}

export default {add,start,pause,remove,canTaskBeAdded};