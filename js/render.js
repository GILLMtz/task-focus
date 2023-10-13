import { StateIcon, TaskStates, tasks, ulTasksList } from "./constantes.js";



 
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
    return `<strong class="task-badge">${icon} ${getNameByState(state)} </strong>`;
}

function createHtmlTask(task) {
    let badge = getBadge(task);
    let styleClass = `task-${getNameByState(task.state)}`;

    return `<li data-id=${task.id}  class="${styleClass}">
     ${badge}
    <span>${task.name} ${task.time.minutes}:${task.time.seconds}  </span> 
    <div>
        <button ${task.state == TaskStates.SUCCESSFUL ? 'disabled="true"' : ""} class="btn btn-task-timer">start</button> 
        <button class="btn btn--danger btn-task-delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg>
        </button>
    </div>
</li>`;
}
function viewTasks() {
    ulTasksList.innerHTML = tasks.map((task) => createHtmlTask(task)).join(" ");
}



export default { viewTasks, addExampleTasks, removeExampleTasks };