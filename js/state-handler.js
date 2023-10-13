import { ProcessType, Themes, appState } from "./constantes.js";

import utils from "./utils.js";
 

function setIdCurrentProcess(id) {
    appState.currentProcess.id = id;
    appState.counter = id;
}
function setTypeCurrentProcess(type) {
    appState.currentProcess.type = type;
}

function setCurrentProcess(id, type) {
    appState.currentProcess={id,type};
/*     appState.setCurrentProcess(id, type); */
}

function getIdCurrentProcess() {
    return appState.currentProcess.id;
}
function getTypeCurrentProcess() {
    return appState.currentProcess.type;
}
function isAnyProcessRunning(){
    return appState.currentProcess.id||appState.currentProcess.type;
}

function getIdCurrentTask(){
    return appState.currentTask.id;

}
function setIdCurrentTask(id){
     appState.currentTask.id=id;

}

function setCurrentTask(id,name){
    appState.currentTask.id=id;
    appState.currentTask.name=name;
}

function reset(){
    if(appState.currentProcess.type==ProcessType.TASK){
        appState.lastTask.id=appState.currentProcess.id;
        appState.lastTask.name=appState.currentProcess.name;
    }
    appState.currentProcess.id=null;
    appState.currentProcess.type=null;
}


function toggleTheme(){
    if(!appState.currentTheme){return ;}
   let theme= appState.currentTheme.name==Themes.DEFAULT.name?Themes.DARK_MODE:Themes.DEFAULT;
    setCurrentTheme(theme);
    utils.setTheme(theme);
    
}

function setCurrentTheme(theme){
    if(!theme||theme==null){   return ; }
    appState.currentTheme=theme;

}
function getCurrentTheme(){
    return appState.currentTheme;

}
export default {
    setCurrentProcess,
    getIdCurrentProcess,
    getTypeCurrentProcess,
    setIdCurrentProcess,
    setTypeCurrentProcess,
    isAnyProcessRunning,
    getIdCurrentTask,
    setIdCurrentTask,
    setCurrentTask,
    reset,
    toggleTheme,
    setCurrentTheme,
    getCurrentTheme
};