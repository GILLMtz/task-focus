import  App  from "./app.js";
import { inputTask } from "./constantes.js";
import actionHandler from "./action-handler.js";

App.init();

function mock() {
    const nTasks = 100;
    for (let i = 1; i <= nTasks; i++) {
        inputTask.value=`Task ${i}`;
        actionHandler.add(inputTask.value);
    }
}
//mock();