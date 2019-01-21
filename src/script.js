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
let closeBtnPreviousIds = [];

const updateProfileTodos = () => {

  fetch('https://morning-wave-83831.herokuapp.com/todos', {

      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        id: userId,
        entries: mainArray

      })
    })

    .then(response => response.json()).then(data => {

      console.log('All good updating entries');

    })
}


export class Day {
  constructor(a) {
    this.a = a;
    this.b = view.takeDailyNotes();
    this.f = view.takeTypeOfDay();
    this.g = todos.ul_tasks().innerHTML;
  }

  createDayOnCard() {
    document.querySelector("#daily-notes").innerHTML = this.b;
    const allTodoListItems = this.g;
    const todosListHtml = `<div id='todolist' class='mynotes-gen'>My tasks:<ul id='task_list_output'>${allTodoListItems}</ul>
    <img src='images/completed.png' class='button_day' id='completed'>
    </img><img src='images/trash.png' class='button_day' id='delete_output'></img></div>`;
    mynotes.insertAdjacentHTML("afterend", todosListHtml);
    document.getElementById("notes-box-top").style.backgroundImage = this.f;
  }

  updateDay() {
    const ul_tasks_output = document.getElementById("task_list_output").innerHTML;
    this.g = ul_tasks_output;
    this.b = document.querySelector("#daily-notes").innerHTML;
  }
}


export class SavedDay extends Day {

  constructor(a, b, f, g) {
    super();
    this.a = a;
    this.b = b;
    this.f = f;
    this.g = g;
  }

}


document.addEventListener(
  "click",
  event => {

    const dayNameAttribute = event.target.getAttribute("day-name");
    let dayIndex;
    let dayIndexforOpen;
    const currentId = event.target.id;

    if (event.target.id.includes("submit_")) {

      view.undisplayForm();
      view.displayCalendar();
      view.displayWelcome();

      const dayfull = new Day(dayNameAttribute);
      mainArray.push(dayfull);
      todos.countWeeklyTodos();
      dayIndex = mainArray.findIndex(element => {
        return element.a === event.target.getAttribute("day-name");
      });

      view.removeSubmitButton();
      view.clearTodo();

      if (signedIn) {
        updateProfileTodos();
      }

    } 
    
    else if (event.target.id.includes("calendar")) {

      view.undisplayCalendar();
      

      if (!event.target.style.borderRadius) {
        view.displayForm();
        view.undisplayWelcome();
        const numberAdd = event.target.id.slice(-9);
        view.displaySubmitButton(numberAdd);
        const elementStyle = event.target.style;
        view.createGreenCircle(elementStyle);

        const b = " ";
        const currentDate = [currentId.slice(8, 10), b, currentId.slice(10, 11).toUpperCase(), currentId.slice(11, 13), b, currentId.slice(13)].join('');
        closeBtnPreviousIds.push(currentId);
        document.getElementById('your-notes-date').innerHTML = `${currentDate} notes `;

      } 
      
      else {
        view.displayDay();
        view.undisplayForm();
        view.undisplayWelcome();
        todos.countWeeklyTodos();
        const numberSave = event.target.id.slice(-9);
        view.displaySaveExitButton(numberSave);
        const c = " ";
        const currentDate2 = [event.target.id.slice(8, 10), c, event.target.id.slice(10, 11).toUpperCase(), event.target.id.slice(11, 13), c, event.target.id.slice(13)].join('');
        document.getElementById("notes-box-top-right-text").innerHTML = currentDate2;

        dayIndexforOpen = mainArray.findIndex(element => {
          return element.a === event.target.getAttribute("day-name");
        });

        mainArray[dayIndexforOpen].createDayOnCard();
        view.calculateProgress();

        }
      } 
      
      else if (event.target.id.includes("close-day")) {

      dayIndex = mainArray.findIndex(element => {
        return element.a === dayNameAttribute;
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
      todos.removeTodo();
    } 
    
    else if (event.target.id.includes("delete_output")) {
      todos.removeTodo();
    } 
    
    else if (event.target.id.includes("completed")) {
      todos.completedTodo();
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

    //TOGGLE SHOWING MORE BANK HOLS
    
    else if (event.target.id.includes("expand-holidays")) {
      var showMoreHols = document.getElementById("collapsible_holidays");
      if (showMoreHols.style.display === "block") {

        document.getElementById("collapsible_holidays").style.display = 'none';
        event.target.src = "images/expand.png";

      } else {
        document.getElementById("collapsible_holidays").style.display = 'block';
        event.target.src = "images/collapse.png";

      }
    } 
    
    //TOGGLE SHOWING MORE WEATHER

    else if (event.target.id.includes("showmore")) {
      const showMoreWeather = document.getElementById("collapsible_weather");
      if (showMoreWeather.style.display === "flex") {
        document.getElementById("collapsible_weather").style.display = 'none';
        event.target.src = "images/expand.png";
      } else {
        document.getElementById("collapsible_weather").style.display = 'flex';
        event.target.src = "images/collapse.png";
      }
    } 

    //DISPLAY NEXT MONTH
    
    else if (event.target.id === "nextarrow") {
      Calendar.newMonthsForward();
    } 
    
    //DISPLAY PREVIOUS MONTH

    else if (event.target.id === "backarrow") {
      Calendar.newMonthsBackward();
    }

    //TOGGLE DISPLAYING REGISTER SECTION

    else if (event.target.id === "btn-register-txt") {

      if (document.getElementById('register-wrapper').style.display === "none") {
        view.displayRegisterWrapper();
        view.undisplayLoginWrapper();
      } else {
        view.undisplayRegisterWrapper();
      }
    }

    //ON REGISTER BUTTON

    else if (event.target.id === "register-button") {

      view.removeRegisterWarning();
      const nameRegister = document.getElementById('name-input').value;
      const passwordRegister = document.getElementById('password-input').value;
      const emailRegister = document.getElementById('email-input').value;

      fetch('https://morning-wave-83831.herokuapp.com/register', {

          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({

            name: nameRegister,
            email: emailRegister,
            password: passwordRegister

          })

        })

        .then(response => response.json()).then(data => {

          if (data === 'Incorrect form submission') {

            view.removeRegisterWarning();
            view.displayNoBlankFields();

          } else if (data === 'Unable to register') {

            view.removeRegisterWarning();
            view.displayUserExists();

          } else {

            signedIn = true;
            userId = data.id;
            mainArray.splice(0, mainArray.length);
            Calendar.removeMonthHtml();
            Calendar.loadCurrentYear();
            Calendar.loadCurrentMonthHtml();
            todos.countWeeklyTodos();
            document.getElementById("btn-login-txt").innerHTML = 'Sign out';
            view.undisplayRegisterWrapper();
            document.getElementById("top-welcome-message").innerHTML = `Welcome  ${nameRegister}`;
            view.emptyRegisterForm();

          }

        })

    }

    //TOGGLE DISPLAYING SIGN IN SECTION

    else if (event.target.id === "btn-login-txt") {

      if (event.target.innerHTML === 'Sign out') {

        signedIn = false;
        mainArray.splice(0, mainArray.length);
        Calendar.removeMonthHtml();
        Calendar.loadCurrentYear();
        Calendar.loadCurrentMonthHtml();
        todos.countWeeklyTodos();
        view.displayHelloGuest(); 
        event.target.innerHTML = "Sign in";
      } 
      
      else {

        if (document.getElementById('login-wrapper').style.display === "none") {
          view.displayLoginWrapper();
          view.undisplayRegisterWrapper();
        } else {
          view.undisplayLoginWrapper();
        }

      }

    }


    //ON SIGN IN BUTTON

    else if (event.target.id === "signin-button") {

      view.removeSigninWarning();
      view.displayLoading();

      const passwordSignin = document.getElementById('password-input-2').value;
      const emailSignin = document.getElementById('email-input-2').value;

      fetch('https://morning-wave-83831.herokuapp.com/signin', {

          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({

            email: emailSignin,
            password: passwordSignin

          })

        })

        .then(response => response.json())
        .then((data) => {

          if (data !== 'wrong credentials') {

            view.removeSigninWarning();
            signedIn = true;
            userId = data.id;
            mainArray.splice(0, mainArray.length);
            const nameSignin = data.name;

            if (data.entries.length > 0) {

              for (let i = 0; i < data.entries.length; i++) {

                const savedDayFull = new SavedDay(data.entries[i].a, data.entries[i].b, data.entries[i].f, data.entries[i].g);
                mainArray.push(savedDayFull);

              }
              todos.countWeeklyTodos();
            }

            Calendar.removeMonthHtml();
            Calendar.loadCurrentYear();
            Calendar.loadCurrentMonthHtml();
            view.undisplayLoginWrapper();
            view.emptySigninForm();
            view.displaySignOut();
            document.getElementById("top-welcome-message").innerHTML = `Welcome back ${nameSignin}`;
            
          } else {

            view.removeSigninWarning();
            view.displayWrongCredentials();

          }

        })

    } 
    
    //ON BACKGROUND CLICK

    else if (event.target.id === "main_pic") {

      if (document.getElementById('login-wrapper').style.display === "block") {
        view.undisplayLoginWrapper();
        view.emptySigninForm();
        view.removeSigninWarning();
      } else if (document.getElementById('register-wrapper').style.display === "block") {
        view.undisplayRegisterWrapper();
        view.emptyRegisterForm();
        view.removeRegisterWarning();
      }

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

