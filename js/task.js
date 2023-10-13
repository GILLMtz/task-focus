import { tasks,TaskStates,PREFIX, DEFAULT_TASK_TIME} from "./constantes.js"; 


 
function createId() { return `${PREFIX}-${Date.now()}`; }

function get(id) { return tasks.filter((task) => task.id == id)[0]; }

function setState(id, state) {
   let task= tasks.find((task)=>task.id==id);
   if(task){ task.state=state; }
}

function create(name) {
    return { id: createId(), name: name, state: TaskStates.PENDING, pomodoro: 1, time: DEFAULT_TASK_TIME}
}


function updateTime(minutes,seconds,id){
    let task= tasks.find((task)=>task.id==id);
    if(task){  task.time = { minutes: Number(minutes), seconds: Number(seconds) } }
}


function addedTask(nameNewTask) { return tasks.some((task) => task.name == nameNewTask); }

function add(name){//add task
    tasks.push(create(name));
}
function removeById(id){
    let index = tasks.findIndex((task) => task.id == id);
    if (index >= 0) {
        tasks.splice(index, 1);
    }
}

function next(){
    return tasks
    .filter((task)=>task.state==TaskStates.RESUME || task.state==TaskStates.PENDING)
    .map((t)=>t.id)[0];
}

function empty(){
    return !tasks.length;
}
export default {setState,get,create,updateTime,addedTask,add,removeById,next,empty};