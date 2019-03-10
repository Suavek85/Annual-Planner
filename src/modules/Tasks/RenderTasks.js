import { tasksArray } from '../Days';
import {
  mainArray
} from '../Days';



export const displayEachTaskDay = (i) => {
      
  const mappedtasksArrayDay = mainArray[i].z.map( (el, ind) => {

    return `
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;background-color:${isIndexEven(ind)}">

    <div style="display: flex; flex-direction: row; align-items: center;" >

    <div style="display: inline-block; width: 45px; height: 45px; background-color: ${typeDayBackground(el)}; margin: 5px 10px 5px 5px;">
    <img src=${typeDayIcon(el)} style='width:35px; height: 35px; padding: 5px;'>
    </div>
    
    <div style="${doneTaskStyleCross(el)}" >${el.text}
    </div>

    <img src="images/completed.png" alt="logo done" class="icons_done" margin-left="12px" height="30px" width="30px" style="${doneTaskStyleIcon(el)}">

    </div>

    <div style="display: flex; align-items: center; justify-content: center; width: 60px; height: 55px; background-color: #E8E8E8;">

    <input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb">

    </div>

    </div>

    `
    }
  )

  const joinmappedtasksArrayDay = mappedtasksArrayDay.join("");

  document.getElementById("task_list_output").insertAdjacentHTML('afterbegin', joinmappedtasksArrayDay);

}



export const displaySelectedTaskDay = (i, currentHtml) => {

  const mappedArraySelectedDay = mainArray[i].z.map( (el, ind) => {

    if (el.type == currentHtml) {
      
      return `
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;background-color:${isIndexEven(ind)}">
  
      <div style="display: flex; flex-direction: row; align-items: center;" >
  
      <div style="display: inline-block; width: 45px; height: 45px; background-color: ${typeDayBackground(el)}; margin: 5px 10px 5px 5px;">
      <img src=${typeDayIcon(el)} style='width:35px; height: 35px; padding: 5px;'>
      </div>
      
      <div style="${doneTaskStyleCross(el)}" >${el.text}
      </div>
  
      <img src="images/completed.png" alt="logo done" class="icons_done" margin-left="12px" height="30px" width="30px" style="${doneTaskStyleIcon(el)}">
  
      </div>
  
      <div style="display: flex; align-items: center; justify-content: center; width: 60px; height: 55px; background-color: #E8E8E8;">
  
      <input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb">
  
      </div>
  
      </div>
  
      `

      } 
      
    else {

      return;

      }
    }
  )

  const joinmappedtasksArrayDay3 = mappedArraySelectedDay.join("");

  document.getElementById("task_list_output").insertAdjacentHTML('afterbegin', joinmappedtasksArrayDay3);

}


export const displayEachTaskForm = () => {
      
  const mappedtasksArray = tasksArray.map(el => {
    
      return  `<input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb"><li style=${doneTaskStyleCross(el)} >${el.text} (${el.type})</li><img src="images/completed.png" alt="logo done" class="icons_done" height="16px" width="16px" style=${doneTaskStyleIcon(el)}><br>`
    
      }
  )
    
  const joinmappedtasksArray = mappedtasksArray.join("");
    
  document.getElementById("task_list").insertAdjacentHTML('afterbegin', joinmappedtasksArray);
    
}



const doneTaskStyleCross = (el) => {
      
    if ( el.done === true ) {
  
    return 'text-decoration: line-through; color: grey;';
  
    } else {
  
      return '';
  
    }
  }

 const doneTaskStyleIcon = (el) => {
      
    if ( el.done === true) {
    return 'display: inline-block;';
    } 
    
    else {
      return " ";
    }
  }
  
    
  const typeDayIcon = (el) => {
  
    switch(el.type) {
      case "Home":
      return 'images/home-white.png';
      break;
      case "Sports":
      return 'images/barbell-white.png';
      break;
      case "Shopping":
      return 'images/shopping-white.png';
      break;
      case "Celebration":
      return 'images/celebrate-white.png';
      break;
      case "Learning":
      return 'images/learn-white.png';
      break;
      case "Appointment":
      return 'images/appointment-white.png';
      break;
      case "Health":
      return 'images/health-white.png';
      break;
      default:
      return 'images/home-white.png';
    }
  }
  
  
  const typeDayBackground = (el) => {
  
    switch(el.type) {
      case "Home":
      return '#6B5B95';
      break;
      case "Sports":
      return '#2E4A62';
      break;
      case "Shopping":
      return '#009B77';
      break;
      case "Celebration":
      return '#BC70A4';
      break;
      case "Learning":
      return '#663399';
      break;
      case "Appointment":
      return '#A9754F';
      break;
      case "Health":
      return '#DC4C46';
      break;
      default:
      return '#6B5B95';
    }
  
  }
  
  const isIndexEven = (value) => {
    if (value % 2 == 0)
        return '#F5F5F5'
    else
        return '#FFFFFF'
  }