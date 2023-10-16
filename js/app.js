import events from "./events.js";
import render from "./render.js";
import stateHandler from "./state-handler.js";
import utils from "./utils.js";
export default class App{
   
    static  init ( ) {
        utils.setConfig();
        render.addExampleTasks();
        events();
        
    }
 
    
}


 