import * as Calendar from './modules/Calendar';
import {
  view
} from './modules/View';
import {
  todos,
  mainArray
} from './modules/Todos';
import {
  welcome
} from './modules/Welcome';
import * as Weather from './modules/Weather';
import * as Holidays from './modules/Holidays';



export default class Day {

  constructor(a) {
    this.a = a;
    this.b = document.getElementById("notes").value;
    const radios = document.getElementsByName("day");
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        var checkedRadio = radios[i].value;
        break;
      }
    }
    this.f = checkedRadio;
    this.g = todos.ul_tasks().innerHTML;
  }

  createDayOnCard(dayNumber) {
    document.querySelector("#output8").innerHTML = this.b;
    const word = this.g;
    let todoHtml = `<div id='todolist' class='notes-item'>My tasks:<ul id='task_list_output'>${word}</ul>
    <img src='images/completed.png' class='button_day' id='completed'>
    </img><img src='images/trash.png' class='button_day' id='delete_output'></img></div>`;
    mynotes.insertAdjacentHTML("afterend", todoHtml);
    document.getElementById("notes_day_background").style.backgroundImage = this.f;
  }

  updateDay() {
    const ul_tasks_output = document.getElementById("task_list_output").innerHTML;
    this.g = ul_tasks_output;
    this.b = document.querySelector("#output8").innerHTML;
  }
}

let closeBtnPreviousIds = [];

document.addEventListener(
  "click",
  event => {

    const day_name = event.target.getAttribute("day-name");
    let dayIndex;
    
    let currentId = event.target.id;

    if (event.target.id.includes("submit_")) {
      
      view.undisplayForm();
      view.displayCalendar();
      view.displayWelcome();
     
      const dayfull = new Day(day_name);
      mainArray.push(dayfull);
      console.log(mainArray);
      todos.countWeeklyTodos();
      dayIndex = mainArray.findIndex(element => {
        return element.a === event.target.getAttribute("day-name");
      });
     
      view.removeSubmitButton();
      view.clearTodo();
    } 
    
else if (event.target.id.includes("calendar")) {  

  view.undisplayCalendar();

  if (!event.target.style.borderRadius) {
  view.displayForm();
  view.undisplayWelcome();
  view.displaySubmitButton();
  event.target.style.borderRadius = "5px";
  event.target.style.backgroundColor = 'green';
  closeBtnPreviousIds.push(currentId);
  
} 

  else {
    view.displayDay();
    view.undisplayForm();
    view.undisplayWelcome();
    todos.countWeeklyTodos();
    view.displaySaveExitButton();

    let dayIndex2 = mainArray.findIndex(element => {
    return element.a === event.target.getAttribute("day-name");
    });

    let numberOpen = event.target.id.slice(-9);
    mainArray[dayIndex2].createDayOnCard(numberOpen);
    view.calculateProgress();

} }

  
else if (event.target.id.includes("close-day")) {
      dayIndex = mainArray.findIndex(element => {
        return element.a === day_name;
      });
      mainArray[dayIndex].updateDay();
      todos.countWeeklyTodos();
      view.displayCalendar();
      view.displayWelcome();
      view.undisplayDay();
      view.todoListRemove();
      view.clearProgress();

    } 
    


else if (event.target.id.includes("close-form")) {
      
      view.displayCalendar();

      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.borderRadius = null;
      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.backgroundColor = null;
    
      view.displayWelcome();
      view.undisplayForm();
      view.removeSubmitButton();  
    } 

    
else if (event.target.id.includes("delete_todo_form")) {
      let allTodos = document.getElementsByName("todoscb");
      for (let i = 0, length = allTodos.length; i < length; i++) {
        if (allTodos[i].checked) {
          allTodos[i].nextSibling.remove();
          allTodos[i].nextSibling.remove();
          allTodos[i].nextSibling.remove();
          allTodos[i].remove();
          i--;
        }
      }
    } 
    
else if (event.target.id.includes("delete_output")) {
      var allTodos = document.getElementsByName("todoscb");
      for (var i = 0, length = allTodos.length; i < length; i++) {
      if (allTodos[i].checked) {
          allTodos[i].nextSibling.remove();
          allTodos[i].nextSibling.remove();
          allTodos[i].nextSibling.remove();
          allTodos[i].remove();
          i--;
        }
        view.calculateProgress();
      }
    } 
    
else if (event.target.id.includes("completed")) {
      var allTodos = document.getElementsByName("todoscb");
      for (var i = 0, length = allTodos.length; i < length; i++) {
      if (allTodos[i].checked) {
          allTodos[i].nextSibling.style.textDecoration = "line-through";
          allTodos[i].nextSibling.style.color = "grey";
          allTodos[i].checked = false;
          allTodos[i].nextSibling.nextSibling.style.display = "inline-block";
        }
      }
      view.calculateProgress();
    } 
    
else if (event.target.id.includes("enter")) {
      if (todos.inputLength(todos.input_todo_form()) > 0) {
        todos.createListForm();
      }
    } 
    
else if (event.target.id.includes("enter")) {
    if (todos.inputLength(todos.input_todo_form()) > 0) {
        todos.createListForm();
      }
    } 
    
else if (event.target.id.includes("add")) {
    if (todos.inputLength(todos.input_todo_day()) > 0) {
        todos.createListDay();
        view.calculateProgress();
      }
    } 
    
else if (event.target.id.includes("expand")) {
    var showMoreHols = document.getElementById("collapsible_holidays");
    if(showMoreHols.style.display === "block") {

        document.getElementById("collapsible_holidays").style.display = 'none';
        event.target.src ="images/expand.png";

      } else {
        document.getElementById("collapsible_holidays").style.display = 'block';
        event.target.src ="images/collapse.png";

      } 
    }
    
else if (event.target.id.includes("showmore")) {
    const showMoreWeather = document.getElementById("collapsible_weather");
    if(showMoreWeather.style.display === "flex") {
        document.getElementById("collapsible_weather").style.display = 'none';
        event.target.src ="images/expand.png";} 
    else { 
      document.getElementById("collapsible_weather").style.display = 'flex';
      event.target.src ="images/collapse.png";
      }    
}

else if (event.target.id === "nextarrow") {
    Calendar.newMonthsForward();
}

else if (event.target.id === "backarrow") {
    Calendar.newMonthsBackward();
  
}

},
  false
);


document.addEventListener(
  "keypress",
  function (event) {
    if (event.target.id.includes("input_list")) {
      if (
        todos.inputLength(todos.input_todo_day()) > 0 &&
        event.keyCode === 13
      ) {
        todos.createListForm();
        view.calculateProgress();
      }
    }
  },
  false
);

window.onload = function () {
  Calendar.loadCurrentYear();
  Calendar.loadCurrentMonthHtml();
  Holidays.updateNextHolidays()
  Weather.locationWeather();
  welcome.nowTime();
  todos.countWeeklyTodos();
};





