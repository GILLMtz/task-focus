import {btnAddTask } from './constantes.js';
import actions from './actions.js';
 

const Actions={

    START:{name:"start",idClass:"btn-task-timer",id:null},
    PAUSE:{name:"pause",idClass:"btn-task-pause",id:null},
    REMOVE:{name:"delete",idClass:"btn-task-delete",id:null},
    ADD :{name:"add",idClass:null,id:btnAddTask.id},
    SET_THEME:{name:"set-theme",idClass:"btn-set-theme",id:null},
    UP_TASK_SECTION:{name:"up-task-section",idClass:"tasks-section__btn",id:null},

};


function runAction(target,action){
    return target.classList.contains(action.idClass) ||
    (target.parentNode && target.parentNode.classList.contains(action.idClass)) ||
    ( action.id && target.id  && target.id==action.id) ;
    
} 

function getBtnActionElement(target,idClass){
    return target.classList.contains(idClass)?target:target.parentNode;
}
export default function events(){
    document.querySelector('body').addEventListener("click", (event) => {
        event.preventDefault();
        let { target } = event;
        console.log(event.target);

        if (runAction(target,Actions.ADD)) {
            actions.add();
            return;
        }
        if (runAction(target,Actions.START)) {
            actions.start(getBtnActionElement(target,Actions.START.idClass));
            return;
        }
    
        if (runAction(target,Actions.REMOVE)) {
            actions.remove(getBtnActionElement(target,Actions.REMOVE.idClass));
            return;
        }
        if (runAction(target,Actions.PAUSE)) {
            actions.pause();
            return;
        }    
        if (runAction(target,Actions.SET_THEME)) {
            actions.switchAppTheme();
            return;
        }
        if(runAction(target,Actions.UP_TASK_SECTION)){
            actions.upTaskSection();
            return;
        }
    });
}

