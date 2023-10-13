import { bodyElement ,btnSetTheme,Themes, titlePage} from "./constantes.js";
import stateHandler from "./state-handler.js";



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
    btnSetTheme.innerHTML= currentTheme.name ==Themes.DEFAULT.name?Themes.DARK_MODE.icon:Themes.DEFAULT.icon;
}

function setSystemTheme(){

    let theme=getSystemTheme();
    stateHandler.setCurrentTheme(theme); 
    setTheme(theme);
    switchBtnTheme();
} 
export default {setTheme, setTitle,removeTheme,getSystemTheme,switchBtnTheme,setSystemTheme};