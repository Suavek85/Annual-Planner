import { tasksArray } from '../Days';
import { mainArray } from '../Days';


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

      } else {

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
  const taskList = document.getElementById("task_list");
  taskList.insertAdjacentHTML('afterbegin', joinmappedtasksArray);
    
}


 const typeDayArray = [
    {type: "Home", icon: "images/home-white.png", bgColor: "#6B5B95"},
    {type: "Sports", icon: "images/barbell-white.png", bgColor: "#2E4A62"},
    {type: "Shopping", icon: "images/shopping-white.png", bgColor: "#009B77"},
    {type: "Celebration", icon: "images/celebrate-white.png", bgColor: "#BC70A4"},
    {type: "Learning", icon: "images/learn-white.png", bgColor: "#663399"},
    {type: "Appointment", icon: "images/appointment-white.png", bgColor: "#A9754F"},
    {type: "Health", icon: "images/health-white.png", bgColor: "#DC4C46"},
 ]


 const typeDayIcon = el => {

  for (let i = 0; i < typeDayArray.length; i++) {
    
    if (el.type === typeDayArray[i].type) {
     return typeDayArray[i].icon;
    }
  }
 }


 const typeDayBackground = el => {
  
  for (let i = 0; i < typeDayArray.length; i++) {
    
    if (el.type === typeDayArray[i].type) {
     return typeDayArray[i].bgColor;
    }
  }
}

const doneTaskStyleCross = el => {
      
  if ( el.done === true ) {
    return 'text-decoration: line-through; color: grey;';
  } else {
    return '';
  }
}

const doneTaskStyleIcon = el => {
    
  if ( el.done === true) {
    return 'display: inline-block;';
  } else {
    return " ";
  }
}

const isIndexEven = value => {
    if (value % 2 == 0)
        return '#F5F5F5'
    else
        return '#FFFFFF'
}