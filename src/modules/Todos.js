import {
  view
} from './View';

import * as Progress from './Progress';
import * as Stats from './Stats';
import * as SignRegister from './SignRegister';

export let mainArray = [];
export let tasksArray = [];
let numberSave;
let closeBtnPreviousIds = [];


export class Day {
  constructor(a, f, z) {
    this.a = a;
    this.f = f;
    this.z = z;
  }

  createDayOnCard() {
    const todosListHtml = `
    <div style="flex-basis: 4" id='todolist' class='mynotes-gen'>
    <div style="display: flex; flex-direction: column; min-height: 100px;" id='task_list_output'></div>
    </div>`;
   document.getElementById("notes-box-top").insertAdjacentHTML("afterend", todosListHtml);
   document.getElementById("type-day-icon").src = this.f;
  }

  updateDay() {

    this.f = document.getElementById("type-day-icon").src;
  }
}



export const submitTheNewDay = (dayNameAttribute) => {

  const typeOfDay = view.takeTypeOfDay();
  const dayfull = new Day(dayNameAttribute, typeOfDay, tasksArray);
  mainArray.push(dayfull);
  Stats.countAllTodos();
  tasksArray = [];
}

export const openTheDay = (dayNameAttribute) => {

  let dayIndexforOpen = mainArray.findIndex(element => {
    return element.a === dayNameAttribute;
  });

  mainArray[dayIndexforOpen].createDayOnCard();

  for (var i = 0; i < mainArray.length; i++) {

  if (mainArray[i].a.includes(numberSave)) {

    displayEachTaskDay(i);
    Progress.calculateProgress(i);
    
    }
  }
}
  

export const updateTheDay = (dayNameAttribute) => {

  let dayIndex = mainArray.findIndex(element => {
    return element.a === dayNameAttribute;
  });
  
  mainArray[dayIndex].updateDay();
}



export class Task {

  constructor(type, text) {
    this.type = type;
    this.done = false;
    this.text = text;
    this.g = Math.random()
  }

}


export const addTheTaskForm = () => {

  let inputTodoForm = document.getElementById("input_list").value;
  let typesTodo = document.getElementById("todo-type-selected").innerHTML;
  const taskObj = new Task(typesTodo, inputTodoForm);
  tasksArray.push(taskObj);
  displayEachTaskForm();

}


export const addTheTaskDay = () => {

  for (var i = 0; i < mainArray.length; i++) {
    
    if (mainArray[i].a.includes(numberSave)) {
     
      let inputTodoDay = document.getElementById("input_list_output").value;
      let types = document.getElementById("todo-type-selected-2").innerHTML;
      const taskObj2 = new Task(types, inputTodoDay);
      mainArray[i].z.push(taskObj2);
      displayEachTaskDay(i);
      Progress.calculateProgress(i);
     
    }
  }
}
      

  export const taskComepletedDay = () => {


    var allTodos3 = document.getElementsByName("todoscb");
  
        var allTodos3Array = Array.prototype.slice.call(allTodos3);
  
     
        for (let y = 0; y < mainArray.length; y++) {
  
          if (mainArray[y].a.includes(numberSave)) {
  
            for (let i = 0;  i < allTodos3Array.length; i++) {
             
              if ( allTodos3Array[i].checked == true ) {
  
                for (var p = 0; p < mainArray[y].z.length; p++) {
  
                  if (mainArray[y].z[p].g == allTodos3Array[i].value) {
  
                    mainArray[y].z[p].done = true;
                  
                  }
  
                }
  
              } 
  
            }
  
            removeTodoListDay();
            displayEachTaskDay(y);
            Progress.calculateProgress(y);
  
          }
  
        }
  }
  
  
  
  
  export const deleteTaskDay = () => {
  
    var allTodos2 = document.getElementsByName("todoscb");
  
    var allTodos2Array = Array.prototype.slice.call(allTodos2);
  
  
    for (var y = 0; y < mainArray.length; y++) {
  
      if (mainArray[y].a.includes(numberSave)) {
  
        for (let i = 0;  i < allTodos2Array.length; i++) {
  
          if (allTodos2Array[i].checked) {
  
            for (var p = 0; p < mainArray[y].z.length; p++) {
  
              if (mainArray[y].z[p].g == allTodos2Array[i].value) {
  
                mainArray[y].z.splice(p, 1);
                p--;
  
              }
            }
          }
        }
  
        removeTodoListDay();
        displayEachTaskDay(y);
        Progress.calculateProgress(y);
  
      }
    }
  }
  
  
  const displaySaveExitButton = () => {
      
    let saveexitBtnGen = `<div day-name="dayname${numberSave}" class='close-save' id='close-day-${numberSave}'>Close</div>`
    document.getElementById("close-day-wrapper").insertAdjacentHTML('afterbegin', saveexitBtnGen);

  }



  
  export const deleteTaskForm = () => {
  
    const allTodos = document.getElementsByName("todoscb");
  
    for (let i = 0, length = allTodos.length - 1; i <= length; i++) {
      
      if (allTodos[i].checked) {
  
        for (var p = 0; p < tasksArray.length; p++) {
  
          if (tasksArray[p].g == allTodos[i].value) {
  
            tasksArray.splice(p, 1);
            p--;
  
          }
        }
      }
    }
  }
  
  
  export const removeTodoList = () => {
  
    const list = document.getElementById("task_list");
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  }
  
  export const removeTodoListDay = () => {
  
    const listDay = document.getElementById("task_list_output");
    while (listDay.hasChildNodes()) {
      listDay.removeChild(listDay.firstChild);
    }
  }
  
  
  export const doneTaskStyleCross = (el) => {
  
    if ( el.done === true ) {
  
    return 'text-decoration: line-through; color: grey;';
  
    } else {
  
      return '';
  
    }
  }
  
  
  export const doneTaskStyleIcon = (el) => {
  
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
  
  
  
  export const displayEachTaskForm = () => {
  
    const mappedtasksArray = tasksArray.map(el => {
  
      return  `<input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb"><li style=${doneTaskStyleCross(el)} >${el.text} (${el.type})</li><img src="images/completed.png" alt="logo done" class="icons_done" height="16px" width="16px" style=${doneTaskStyleIcon(el)}><br>`
  
      }
    )
  
    const joinmappedtasksArray = mappedtasksArray.join("");
  
    document.getElementById("task_list").insertAdjacentHTML('afterbegin', joinmappedtasksArray);
  
  }
  
  
  
  
  const displayEachTaskDay = (i) => {
  
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
  
  
  
  const displaySelectedTaskDay = (i, currentHtml) => {
  
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



  export const filteringTodos = (currentHtml, currentId) => {

    for (var i = 0; i < mainArray.length; i++) {

      if (mainArray[i].a.includes(numberSave)) {

        if (currentId === "filtered-all" ) {

          displayEachTaskDay(i);

        } else {

          displaySelectedTaskDay(i, currentHtml);

        }
      }
    }
  }



export const handlingTasksRendering = (currentId, currentHtml) => {

    //DELETE TASK - FORM
        
    if (currentId.includes("delete_todo_form")) {

      deleteTaskForm();
      removeTodoList();
      displayEachTaskForm();

    } 

    //DELETE TASK - DAY

    else if (currentId.includes("delete_output")) {

      deleteTaskDay();
    }

    //TASK COMPLETED - DAY

    else if (currentId.includes("completed")) {

      taskComepletedDay();

    } 

    //ADD TASK - FORM

    else if (currentId.includes("enter")) {


      if (document.getElementById("input_list").value.length > 0) {


        removeTodoList();
        addTheTaskForm();
        view.emptyInputForm();
        view.displayDeleteForm();

      }
    } 

    //ADD TASK - DAY

    else if (currentId.includes("add")) {


      if (document.getElementById("input_list_output").value.length > 0) {

        removeTodoListDay();
        addTheTaskDay();
        view.emptyInputDay();   
      }
    }


    //FILTERING

    else if (currentId.includes('filtered')) {

          
      removeTodoListDay();
      filteringTodos(currentHtml, currentId);

    }
  
}



export const renderingDayandFormBoxClick = (currentId, currentStyle, dayNameAttribute) => {

//SUBMIT NEW DAY

if (currentId.includes("submit_")) {

  view.undisplayForm();
  view.displayCalendar();
  view.displayWelcome();
  submitTheNewDay(dayNameAttribute);
  view.removeSubmitButton();
  view.clearTodo();
  SignRegister.updateProfileTodos();

} 


//ADD DAY OR OPEN DAY

else if (currentId.includes("calendar")) {

    view.undisplayCalendar();

    if (!currentStyle.borderRadius) {

      view.displayForm();
      view.undisplayWelcome();
      const numberAdd = currentId.slice(-9);
      view.displaySubmitButton(numberAdd);
      view.createGreenCircle(currentStyle);
      closeBtnPreviousIds.push(currentId);
    
    } 
    
    else {

      view.displayDay();
      view.undisplayForm();
      view.undisplayWelcome();
      Stats.countAllTodos();
      numberSave = currentId.slice(-9);
      displaySaveExitButton(numberSave);
      view.calcDateforDay(currentId)
      openTheDay( dayNameAttribute);  
      view.clearInputFieldDay();

    }

  } 

  //CLOSE DAY

  else if (currentId.includes("close-day")) {

    updateTheDay(dayNameAttribute);
    SignRegister.updateProfileTodos();
    Stats.countAllTodos();
    view.displayCalendar();
    view.displayWelcome();
    view.undisplayDay();
    view.todoListRemove();
    Progress.clearProgress();

  } 

  //CLOSE FORM

  else if (currentId.includes("close-form")) {

    view.displayCalendar();
    view.clearTodo();
    view.removeGreenCircle(closeBtnPreviousIds);
    view.displayWelcome();
    view.undisplayForm();
    view.removeSubmitButton();
    
  } 


}


  

  