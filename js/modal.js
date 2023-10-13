import { bodyElement ,mainContainer} from "./constantes.js";
const idSectionModalElement ="modalElement";
const BACKGROUND_FILTER='filter:blur(10px)';
const BACKGROUND_NO_FILTER='filter:none';

const ModalType={
    DEFAULT:"modal--timer",
    NOTIFICATION:"modal--as-notification"
};

function createModal({message,title,description},modalType=ModalType.DEFAULT){
    
    let sectionEl=document.createElement("section");
    sectionEl.classList.add("modal",modalType);
    sectionEl.id="modalElement";

    let mainContentEl=document.createElement("div");
    mainContentEl.classList.add('modal__main-content');

    let titleEl=document.createElement('h2');
    titleEl.innerHTML=title;
    titleEl.classList.add('modal__title');

    let contentEl=document.createElement("p");
    contentEl.innerHTML=message;
    contentEl.classList.add('modal__message');
    
    let descriptionEl=document.createElement("p");
    descriptionEl.innerHTML=description;
    descriptionEl.classList.add('modal__description');


    mainContentEl.appendChild(titleEl);
    mainContentEl.appendChild(contentEl);
    mainContentEl.appendChild(descriptionEl);

    sectionEl.appendChild(mainContentEl);
    return sectionEl;
}

function setBackground(background=true){
    if(background){
        mainContainer.style.cssText=BACKGROUND_FILTER;
    }else{
        mainContainer.style.cssText=BACKGROUND_NO_FILTER;
    }
}

function getMessageEl(){
    let modalSection= document.querySelector("#"+idSectionModalElement);
  return  [...modalSection.childNodes[0].childNodes]
  .filter((childEl)=>childEl.classList.contains('modal__message'))[0];    
}

function updateMessageEl(messageEl,value){
    if(messageEl){ messageEl.innerHTML=value;}
}
function addOnView(content,modalType=ModalType.DEFAULT){
    bodyElement.append(createModal(content,modalType))  ;
    if(modalType!==ModalType.NOTIFICATION){
        setBackground();
    }
}
function removeOnView(counterReference){
    clearInterval(counterReference);
     let deleteEl=document.querySelector("#"+idSectionModalElement);
     bodyElement.removeChild(deleteEl );
     setBackground(false);
}

/* function counting(counterMin,counterMax){
    let index=counterMax,limit=counterMin; 
    let messageEl=getMessageEl();


    let counterReference=setInterval(()=>{
        updateMessageEl(messageEl,index);
        if( index<limit){ removeOnView(counterReference); }
        index--;
        },1000);
} */

function counting(counterMin,counterMax){
    let index=counterMax,limit=counterMin; 
    let messageEl=getMessageEl();

    return new Promise((resolve,reject)=>{
        let counterReference=setInterval(()=>{
            updateMessageEl(messageEl,index);
            if( index<limit){ 
                removeOnView(counterReference);
            resolve();
            }
            index--;
            },1000);

    });

}

function show(content, counterMin=0,counterMax=5){
    addOnView(content);
   return counting(counterMin,counterMax);
}

function showAsNotification(content, counterMin=0,counterMax=5){
    addOnView(content,ModalType.NOTIFICATION);
   return counting(counterMin,counterMax);
}

 

export default { show,showAsNotification}