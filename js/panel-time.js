import {  STEP, timePanelValue} from "./constantes.js";
 import stateHandler from "./state-handler.js";
 import render from "./render.js";


function getTime() {
    let [minutes, seconds] = timePanelValue.innerText.split(':');
    minutes = minutes[0] == '0' ? minutes[1] : minutes;
    seconds = seconds[0] == '0' ? seconds[1] : seconds;
    return { minutes, seconds };
}

 function updateProcess(process,isActive) {
    render.viewProcess(process,isActive);
} 

function updateTime(minutes, seconds) {
    timePanelValue.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function stopCounter(countingProcessId){
    clearInterval(countingProcessId);
}

function counting({minutes, seconds}) {
    return new Promise((resolve, reject)=>{
        const countingProcessId= setInterval(() => {
            seconds -= 1
             
            if (minutes == 0 && seconds < 0) {//if minutes equals -1 end task                
                stopCounter(countingProcessId);
                resolve();
                return ;
            }
            if (seconds < 0) {
                seconds = 59;minutes = minutes - 1;
            }
            updateTime(minutes, seconds);
        }, STEP);
        stateHandler.setIdCurrentProcess(countingProcessId);
    });

}

export default { updateTime,   getTime,counting,stopCounter, updateProcess };