import { Themes, btnAddTask,btnSetTheme, taskSectionElement} from './constantes.js';
import actions from './actions.js';
import stateHandler from './state-handler.js';
import utils from './utils.js';


export default function events(){
    document.querySelector('body').addEventListener("click", (event) => {
        event.preventDefault();
        let { target } = event;
    
        if (target.id === btnAddTask.id) {
            actions.add();
            return;
        }
        if (target.classList.contains("btn-task-timer")) {
            actions.start(event);
            return;
        }
    
        if (target.classList.contains("btn-task-delete")) {
            actions.remove(event);
            return;
        }
        if (target.classList.contains('task-panel-time__button-pause')) {
            actions.pause();
            return;
        }    
        if (target.classList.contains('btn-set-theme')) {
             stateHandler.toggleTheme();
             utils.switchBtnTheme();
            return;
        }
        if(target.parentNode&&target.parentNode.classList.contains('tasks-section__btn')){
            taskSectionElement.classList.toggle('up-section');
            utils.setBtnUpTasksSection();
            return;
        }
    });
 
 

}

