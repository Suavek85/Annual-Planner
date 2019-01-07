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


let signedIn = false;
let userId;

const updateProfileTodos = () => {

    fetch('http://localhost:3000/todos', {
  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        
          id: userId,
          entries: mainArray
  
        }
        ) 
  
        })
        
       .then(response => response.json()).then(data => {
         
        console.log('All good updating entries');
       
      }
      )

}


export class Day 
{
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

  createDayOnCard() {
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


export class SavedDay extends Day {

  constructor(a,b,f,g) {
    super();
    this.a = a;
    this.b = b;
    this.f = f;
    this.g = g;
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

      if (signedIn) {
        updateProfileTodos();
      }
   

     
    } else if (event.target.id.includes("calendar")) {

      view.undisplayCalendar();

      if (!event.target.style.borderRadius) {
        view.displayForm();
        view.undisplayWelcome();
        view.displaySubmitButton();
        event.target.style.borderRadius = "5px";
        event.target.style.backgroundColor = 'green';
        console.log(currentId);
        const b = " ";
        const currentDate = [currentId.slice(8, 10), b, currentId.slice(10, 11).toUpperCase(), currentId.slice(11, 13), b, currentId.slice(13)].join('');
        console.log(currentDate);
        closeBtnPreviousIds.push(currentId);
        document.getElementById('your-notes-date').innerHTML = `${currentDate} notes `;

      } else {
        view.displayDay();
        view.undisplayForm();
        view.undisplayWelcome();
        todos.countWeeklyTodos();
        view.displaySaveExitButton();

        const c = " ";
        const currentDate2 = [event.target.id.slice(8, 10), c, event.target.id.slice(10, 11).toUpperCase(), event.target.id.slice(11, 13), c, event.target.id.slice(13)].join('');
        console.log("open" + currentDate2)
        document.getElementById("background_text").innerHTML = currentDate2;


        let dayIndex2 = mainArray.findIndex(element => {
          return element.a === event.target.getAttribute("day-name");
        });

        mainArray[dayIndex2].createDayOnCard(); 
        view.calculateProgress();

      }
    } else if (event.target.id.includes("close-day")) {
      dayIndex = mainArray.findIndex(element => {
        return element.a === day_name;
      });
      mainArray[dayIndex].updateDay();

      if (signedIn) {
        updateProfileTodos();
      }
      
      todos.countWeeklyTodos();
      view.displayCalendar();
      view.displayWelcome();
      view.undisplayDay();
      view.todoListRemove();
      view.clearProgress();

  

    } else if (event.target.id.includes("close-form")) {

      view.displayCalendar();

      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.borderRadius = null;
      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.backgroundColor = null;

      view.displayWelcome();
      view.undisplayForm();
      view.removeSubmitButton();
    } else if (event.target.id.includes("delete_todo_form")) {
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
    } else if (event.target.id.includes("delete_output")) {
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
    } else if (event.target.id.includes("completed")) {
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
    } else if (event.target.id.includes("enter")) {
      if (todos.inputLength(todos.input_todo_form()) > 0) {
        todos.createListForm();
      }
    } else if (event.target.id.includes("enter")) {
      if (todos.inputLength(todos.input_todo_form()) > 0) {
        todos.createListForm();
      }
    } else if (event.target.id.includes("add")) {
      if (todos.inputLength(todos.input_todo_day()) > 0) {
        todos.createListDay();
        view.calculateProgress();
      }
    } else if (event.target.id.includes("expand")) {
      var showMoreHols = document.getElementById("collapsible_holidays");
      if (showMoreHols.style.display === "block") {

        document.getElementById("collapsible_holidays").style.display = 'none';
        event.target.src = "images/expand.png";

      } else {
        document.getElementById("collapsible_holidays").style.display = 'block';
        event.target.src = "images/collapse.png";

      }
    } else if (event.target.id.includes("showmore")) {
      const showMoreWeather = document.getElementById("collapsible_weather");
      if (showMoreWeather.style.display === "flex") {
        document.getElementById("collapsible_weather").style.display = 'none';
        event.target.src = "images/expand.png";
      } else {
        document.getElementById("collapsible_weather").style.display = 'flex';
        event.target.src = "images/collapse.png";
      }
    } else if (event.target.id === "nextarrow") {
      Calendar.newMonthsForward();
    } else if (event.target.id === "backarrow") {
      Calendar.newMonthsBackward();

    } 
    
    //SIGN IN MENU
    
    else if (event.target.id === "btn-login-txt") {

      if(event.target.innerHTML === 'Sign out') { 

      signedIn = false;
      mainArray.splice(0,mainArray.length);
      Calendar.removeMonthHtml(); 
      Calendar.loadCurrentYear(); 
      Calendar.loadCurrentMonthHtml(); 
      todos.countWeeklyTodos();

      document.getElementById("top-welcome-message").innerHTML = '';
      event.target.innerHTML = "Sign in";
      }

      else {

      if (document.getElementById('login-wrapper').style.display === "none") {
        document.getElementById('login-wrapper').style.display = "block";
        document.getElementById('register-wrapper').style.display = "none";
        
      } else {
        document.getElementById('login-wrapper').style.display = "none"

      }

      }

    }

    //REGISTER IN MENU

    else if (event.target.id === "btn-register-txt") {

      if (document.getElementById('register-wrapper').style.display === "none") {
        document.getElementById('register-wrapper').style.display = "block";
        document.getElementById('login-wrapper').style.display = "none";
      } else {
        document.getElementById('register-wrapper').style.display = "none"
        
      }

    }

    //REGISTER

    else if (event.target.id === "register-button") {

      const newName = document.getElementById('name-input').value;
      const newPassword = document.getElementById('password-input').value;
      const newEmail = document.getElementById('email-input').value;

      fetch('http://localhost:3000/register', {

      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        
        name: newName,
        email: newEmail,
        password: newPassword

      }
      ) 

      })
      
      .then(response => response.json()).then(data => { 

      console.log('Registering okay');
      console.log(data); // PROBLEM
      signedIn = true;
      userId = data.id;
      console.log(userId)
      document.getElementById("btn-login-txt").innerHTML = 'Sign out';
      document.getElementById("regbox").style.display = "none";
      document.getElementById("top-welcome-message").innerHTML = `Welcome  ${newName}`
        
       })

    }

    //SIGN IN

    else if (event.target.id === "signin-button") {

      const newPassword2 = document.getElementById('password-input-2').value;
      const newEmail2 = document.getElementById('email-input-2').value;

      fetch('http://localhost:3000/signin', {

      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        
        //id: '134',
        email: newEmail2,
        password: newPassword2

      }
      ) 

      })
      
     .then(response => response.json()).then( (data) => { 

      console.log('Signing in okay');
      signedIn = true;
      userId = data.id;
      mainArray.splice(0,mainArray.length);
    
     
      if (data.entries.length > 0) {

        //mainArray.push.apply(mainArray, data);
       
        for (i = 0; i < data.entries.length ; i++) {
          
          let savedDayFull = new SavedDay (data.entries[i].a, data.entries[i].b, data.entries[i].f, data.entries[i].g);
          mainArray.push(savedDayFull);
          
        }
        console.log(mainArray);
        todos.countWeeklyTodos();
      }
      
      Calendar.removeMonthHtml(); 
      Calendar.loadCurrentYear(); 
      Calendar.loadCurrentMonthHtml();
      
      document.getElementById("login-wrapper").style.display = "none"; 
      document.getElementById("top-welcome-message").innerHTML = `Welcome back ${data.name}`;
      document.getElementById("btn-login-txt").innerHTML = 'Sign out';
     
     } )


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