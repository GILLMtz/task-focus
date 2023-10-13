import utils from "./utils.js";
import { PAGE_TITLE_BREAK_TIME ,Themes,PAGE_TITLE, ProcessType } from "./constantes.js";
import panelTime from "./panel-time.js";
import stateHandler from "./state-handler.js";
 

function start({minutes,seconds}){
    return new Promise((resolve,reject)=>{
        utils.setTheme(Themes.SUB_THEME_BREAKTIME);
        utils.setTitle(PAGE_TITLE_BREAK_TIME);
        stateHandler.setTypeCurrentProcess(ProcessType.BREAK_TIME);
        panelTime.counting({minutes, seconds}).then(()=>{
            stop();
            resolve();
        });
    }); 
} 

function stop(){
        stateHandler.reset();
        utils.removeTheme(Themes.SUB_THEME_BREAKTIME);
  /*       utils.setTheme(Themes.DEFAULT); */
        utils.setTitle(PAGE_TITLE);
        return;
}

export default {start};