import { bodyElement ,btnSetStateTasksSection,btnSetTheme,taskSectionElement,Themes, titlePage,PAGE_TITLE} from "./constantes.js";
import stateHandler from "./state-handler.js";
import panelTime from "./panel-time.js";
 
const BtnTasksSection={
    DOWN:{icon:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
  </svg>`,title:"Tasks"},
    UP:{icon:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
  </svg>`,title:"Tasks"}

};

const BtnAction={
    START:{icon:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">`
,title:"Start"},
    PAUSE:{icon:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">`
    ,  title:"Pause"},
    DELETE:{icon:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">`
    ,  title:"Delete"}
}


function isTheme(theme){
    return theme.name==Themes.DARK_MODE.name || theme.name==Themes.DEFAULT.name;
}


function setTheme(theme){
    if(!theme||theme==null){   return ; }
    clearTheme(theme);
    bodyElement.classList.add(theme.name);
}



function clearTheme(theme){
 
    if(!theme||theme==null){   return ; }
    const  themesAndSubs=Object.values(Themes);
    if(!themesAndSubs||themesAndSubs==[]) { return; }
    let clearElements=[];
    if(isTheme(theme)){
        clearElements=themesAndSubs.filter((el)=>isTheme(el));
    }
    else{
        clearElements=themesAndSubs.filter((el)=>!isTheme(el));
    }

    bodyElement.classList.remove(...clearElements.map((cl)=>cl.name));
}

function setTitle(title){
    titlePage.innerHTML=title;
}

function removeTheme(theme){
    if(!theme||theme==null){
        return ;
    }
    bodyElement.classList.remove(theme.name);
  
}
function getSystemTheme(){
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches?Themes.DARK_MODE:Themes.DEFAULT;  
}


function switchBtnTheme(){
    let currentTheme=stateHandler.getCurrentTheme();
    const styleClassAdded=currentTheme.name==Themes.DEFAULT.name?Themes.DARK_MODE.style:Themes.DEFAULT.style;
    const styleClassRemoved=styleClassAdded==Themes.DARK_MODE.style?Themes.DEFAULT.style:Themes.DARK_MODE.style;

    btnSetTheme.classList.remove(styleClassRemoved);
    btnSetTheme.classList.add(styleClassAdded);
    btnSetTheme.innerHTML= currentTheme.name ==Themes.DEFAULT.name?Themes.DARK_MODE.icon:Themes.DEFAULT.icon;
}

function setSystemTheme(){

    let theme=getSystemTheme();
    stateHandler.setCurrentTheme(theme); 
    setTheme(theme);
    switchBtnTheme();
} 


function setBtnUpTasksSection(){
    btnSetStateTasksSection.innerHTML=taskSectionElement.classList.contains('up-section')?
        BtnTasksSection.UP.icon+BtnTasksSection.UP.title:BtnTasksSection.DOWN.icon+BtnTasksSection.DOWN.title;
}

function setConfig(){
    setTitle(PAGE_TITLE);
    setSystemTheme();
    setBtnUpTasksSection();
    panelTime.updateProcess(null,false);
}

function switchBtnStartPause(target,action="start"){
    console.log("Element to change",target);
    if(action=="start"){
        target.classList.remove('btn-task-timer');
        target.classList.add('btn-task-pause');

        const deleteNode= [...target.childNodes].filter((node)=>node.tagName=="svg")[0];
        console.log("deleteNode !!",deleteNode)
        console.log(target.childNodes );

        target.removeChild(deleteNode);
        
        console.log(target.childNodes);
        //target.childNodes[1].innerHTML=BtnAction.PAUSE.icon;
        return ;
    }
    target.classList.remove('btn-task-pause');
    target.classList.add('btn-task-timer');
 
}

export default {setTheme, setTitle,removeTheme,getSystemTheme,switchBtnTheme,setSystemTheme,setBtnUpTasksSection,setConfig,switchBtnStartPause};