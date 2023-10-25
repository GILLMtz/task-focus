import { DEFAULT_TASK_TIME, StateIcon, TaskStates, tasks, timePanel, timePanelProcess, ulTasksList } from "./constantes.js";
import taskModule from "./task.js";



function addExampleTasks() {
    /* ulTasksList.innerHTML=exampleTasks; */
    ulTasksList.innerHTML = `
   <span> No tasks have been added</span>
   <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
   viewBox="0 0 500 500"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
     <style type="text/css">
      <![CDATA[
       .fil0 {fill:#800000}
      ]]>
     </style>
    </defs>
    <g id="Layer_x0020_1">
     <metadata id="CorelCorpID_0Corel-Layer"/>
     <path class="fil0" d="M101 63l61 0 6 -11c1,-1 1,-2 3,-2l48 0c2,0 7,-3 7,-8l0 -12c0,-5 4,-10 10,-10l28 0c6,0 10,5 10,10l0 12c0,5 5,8 7,8l46 0c2,0 4,1 5,2l6 11 61 0c8,0 15,7 15,16l0 386c0,8 -7,15 -15,15l-298 0c-8,0 -15,-7 -15,-15l0 -386c0,-9 7,-16 15,-16zm88 108l182 0 0 7 -182 0 0 -7zm0 -17l148 0 0 7 -148 0 0 -7zm0 -18l161 0 0 7 -161 0 0 -7zm0 119l147 0 0 7 -147 0 0 -7zm0 -18l173 0 0 7 -173 0 0 -7zm0 -17l98 0 0 7 -98 0 0 -7zm0 118l147 0 0 7 -147 0 0 -7zm0 -17l127 0 0 7 -127 0 0 -7zm0 -18l176 0 0 7 -176 0 0 -7zm0 118l93 0 0 7 -93 0 0 -7zm0 -17l80 0 0 7 -80 0 0 -7zm0 -17l112 0 0 7 -112 0 0 -7zm-58 -251l42 0 0 42 -42 0 0 -42zm17 24l15 -14 4 4 -19 19 -11 -12 4 -4 7 7zm-17 60l42 0 0 42 -42 0 0 -42zm17 24l15 -15 4 5 -19 18 -11 -11 4 -5 7 8zm-17 59l42 0 0 42 -42 0 0 -42zm17 24l15 -14 4 4 -19 19 -11 -12 4 -4 7 7zm-17 60l42 0 0 41 -42 0 0 -41zm17 23l15 -14 4 4 -19 19 -11 -11 4 -5 7 7zm206 -298l-208 0c-1,0 -5,-2 -5,-5 -1,-3 1,-6 2,-8l10 -19 -41 0c-5,0 -9,4 -9,9l0 366c0,5 4,9 9,9l200 0 85 -85 0 -290c0,-5 -4,-9 -9,-9l-41 0 10 19c1,2 3,5 2,8 0,3 -4,5 -5,5z"/>
    </g>
   </svg>

   `;
    ulTasksList.classList.add('tasks-list--empty');
}
function removeExampleTasks() {
    ulTasksList.classList.remove('tasks-list--empty');
}



function getStateIcon(state) { return StateIcon.find((element) => element.state == state); }

function getNameByState(state) {
    let name = "";
    switch (state) {

        case TaskStates.STARTING:
            name = "starting"
            break;
        case TaskStates.SUCCESSFUL:
            name = "successful";
            break;
        case TaskStates.RESUME:
            name = "resume";
            break;
        default:
            name = "pending";
            break;
    }
    return name;
}

function getBadge(task) {
    let { state, icon } = getStateIcon(task.state);
    /*     return `<strong class="badge"> ${icon} ${getNameByState(state)} </strong>`; */
    return `<span class="badge"> <strong>Status: </strong>  ${icon} ${getNameByState(state)} </span>`;
}


function createBodyHtmlTask(task,isRemovable=true) {
    const btnStart=`    <button ${task.state == TaskStates.SUCCESSFUL ? 'disabled="true"' : ""} class="btn btn-task-timer">
    <span> start </span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg>
     </button>`;

    const btnPause=`    <button ${task.state == TaskStates.SUCCESSFUL ? 'disabled="true"' : ""} class="btn btn-task-pause">
    <span> pause </span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
    <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
  </svg>
    </button>`;
    
    const btnSelect=task.state==TaskStates.STARTING?btnPause:btnStart;

    return `
<span class="task-card__title"><strong>Name: </strong>  ${task.name}   </span> 
<span class="task-card__time"><strong>Time: </strong> ${task.time.minutes}:${task.time.seconds}</span>
<div>
    ${btnSelect}
    <button ${ (task.state == TaskStates.SUCCESSFUL&&!isRemovable) ? 'disabled="true"' : ""}   class="btn btn--danger btn-task-delete">
    <span> delete </span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
    </button>
</div>
`;
}


function createHtmlTask(task, listItem = true) {
    const bodyHtmlTask = createBodyHtmlTask(task);
    const badge = getBadge(task);
    const styleClass = `task-${getNameByState(task.state)}`;
    const headTag = (!listItem) ?
        `<div data-id=${task.id}  class="${styleClass}  task-card task-card--current">`
        :
        `<li data-id=${task.id}  class="${styleClass} task-card">`
        ;
    const closeTag = (!listItem) ? "</div>" : "</li>";
    return headTag +
        badge + bodyHtmlTask +
        closeTag;
}
function viewTasks() {
    ulTasksList.innerHTML = tasks.map((task) => createHtmlTask(task)).join(" ");
}


 


function viewProcess(task,isActive=true) {

    console.log("task to render in panel-time: ",task);


    if(!task ){
        task= taskModule.createTask("New Task",TaskStates.PENDING,DEFAULT_TASK_TIME);
    }

    //reset 
    timePanelProcess.classList=[]; 
    const badge = getBadge(task);
 
    const styleClass =["panel-time__process", "task-card", "task-card--current",`task-${getNameByState(task.state)}`] ;
    if(!isActive){
        styleClass.push("task-card--current-no-active");
    }
 
    timePanelProcess.classList.add(...styleClass);
    timePanelProcess.dataset.id=task.id;
    timePanelProcess.innerHTML=
    badge+createBodyHtmlTask(task,false);
}



export default { viewTasks, addExampleTasks, removeExampleTasks,viewProcess };