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
import * as Account from './modules/Account';

let signedIn = false;
let userId;
let closeBtnPreviousIds = [];
var transArray = [];
let numberSave;


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
  constructor(a, z) {
    this.a = a;
    this.f = view.takeTypeOfDay();
    this.g = todos.ul_tasks().innerHTML;
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

}


export class SavedDay extends Day {

  constructor(a, f, g, z) {
    super();
    this.a = a;
    this.f = f;
    this.g = g;
    this.z = z;
  }

}


export class Task {

  constructor(text) {
    this.type = document.getElementById("todo-type-selected").innerHTML;
    this.done = false;
    this.text = text;
    this.g = new Date().getTime();
  }

}


export class TaskDay {

  constructor(text) {
    this.type = document.getElementById("todo-type-selected-2").innerHTML;
    this.done = false;
    this.text = text;
    this.g = new Date().getTime();
  }

}


const removeTodoList = () => {

  const list = document.getElementById("task_list");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }

}

const removeTodoListDay = () => {

  const listDay = document.getElementById("task_list_output");
  while (listDay.hasChildNodes()) {
    listDay.removeChild(listDay.firstChild);
  }

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
  
  } else {
  
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



const displayEachTaskForm = () => {

  const mappedtransArray = transArray.map(el => {

    return  `<input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb"><li style=${doneTaskStyleCross(el)} >${el.text} (${el.type})</li><img src="images/completed.png" alt="logo done" class="icons_done" height="16px" width="16px" style=${doneTaskStyleIcon(el)}><br>`

    }
  )

  const joinmappedtransArray = mappedtransArray.join("");

  document.getElementById("task_list").insertAdjacentHTML('afterbegin', joinmappedtransArray);

}




const displayEachTaskDay = (i) => {

  const mappedtransArrayDay = mainArray[i].z.map( (el, ind) => {

    return `
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;background-color:${isIndexEven(ind)}">

    <div style="display: flex; flex-direction: row; align-items: center;" >

    <div style="display: inline-block; width: 50px; height: 50px; background-color: ${typeDayBackground(el)}; margin-right: 10px;">
    <img src=${typeDayIcon(el)} style='width:38px; height: 38px; padding: 5px;'>
    </div>
    
    <div style="${doneTaskStyleCross(el)}" >${el.text}
    </div>

    <img src="images/completed.png" alt="logo done" class="icons_done" margin-left="12px" height="30px" width="30px" style="${doneTaskStyleIcon(el)}">

    </div>

    <div style="display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; background-color: #E8E8E8;">

    <input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb">

    </div>

    </div>

    `
    }
  )

  const joinmappedtransArrayDay = mappedtransArrayDay.join("");

  document.getElementById("task_list_output").insertAdjacentHTML('afterbegin', joinmappedtransArrayDay);

}


//CLICK EVENT LISTENER

document.addEventListener(
  "click",
  event => {

    const dayNameAttribute = event.target.getAttribute("day-name");
    let dayIndex;
    let dayIndexforOpen;
    const currentId = event.target.id;

    //SUBMIT NEW DAY

    if (event.target.id.includes("submit_")) {

      view.undisplayForm();
      view.displayCalendar();
      view.displayWelcome();
      const dayfull = new Day(dayNameAttribute, transArray);
      mainArray.push(dayfull);
      todos.countAllTodos();
      transArray = [];
     
      dayIndex = mainArray.findIndex(element => {
        return element.a === event.target.getAttribute("day-name");
      });

      view.removeSubmitButton();
      view.clearTodo();

      if (signedIn) {
        updateProfileTodos();
      }


    //ADD DAY OR OPEN DAY


    } else if (event.target.id.includes("calendar")) {

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
      
      } 
      
      else {

        view.displayDay();
        view.undisplayForm();
        view.undisplayWelcome();
        todos.countAllTodos();
        numberSave = event.target.id.slice(-9);
        view.displaySaveExitButton(numberSave);
        const c = " ";
        const currentDate2 = [event.target.id.slice(8, 10), c, event.target.id.slice(10, 11).toUpperCase(), event.target.id.slice(11, 13), c, event.target.id.slice(13)].join('');
        document.getElementById("notes-box-top-right-text").innerHTML = currentDate2;

        dayIndexforOpen = mainArray.findIndex(element => {
          return element.a === event.target.getAttribute("day-name");
        });

        mainArray[dayIndexforOpen].createDayOnCard();


        for (var i = 0; i < mainArray.length; i++) {

        if (mainArray[i].a.includes(numberSave)) {

          displayEachTaskDay(i);
          view.calculateProgress(i);
          
          }

        }

        document.getElementById("input_list_output").value = '';


      }


    } 
    
    //CLOSE DAY
    
    else if (event.target.id.includes("close-day")) {

      //dayIndex = mainArray.findIndex(element => {
        //return element.a === dayNameAttribute;
      //});

      //mainArray[dayIndex].updateDay();

      if (signedIn) {
        updateProfileTodos();
      }

      todos.countAllTodos();
      view.displayCalendar();
      view.displayWelcome();
      view.undisplayDay();
      view.todoListRemove();
      view.clearProgress();

    } 
    
    //CLOSE FORM

    else if (event.target.id.includes("close-form")) {

      view.displayCalendar();

      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.borderRadius = null;
      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.backgroundColor = null;

      view.displayWelcome();
      view.undisplayForm();
      view.removeSubmitButton();

    } 
    
    //DELETE TASK - FORM
    
    else if (event.target.id.includes("delete_todo_form")) {

    
      const allTodos = document.getElementsByName("todoscb");

      for (let i = 0, length = allTodos.length - 1; i <= length; i++) {
        
        if (allTodos[i].checked) {

          for (var p = 0; p < transArray.length; p++) {

            if (transArray[p].g == allTodos[i].value) {

              transArray.splice(p, 1);
              p--;

            }

          }

        }

      }

      removeTodoList();
      displayEachTaskForm();

    } 

    //DELETE TASK - DAY
    
    else if (event.target.id.includes("delete_output")) {

    
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

        }

        removeTodoListDay();
        displayEachTaskDay(y);
        view.calculateProgress(y);
    

      }

    }
    
    //TASK COMPLETED - DAY
    
    else if (event.target.id.includes("completed")) {


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

        }

        removeTodoListDay();
        displayEachTaskDay(y);
        view.calculateProgress(y);

      }

    } 
    
    //ADD TASK - FORM

    else if (event.target.id.includes("enter")) {


      if (todos.inputLength(todos.input_todo_form()) > 0) {

        removeTodoList();

        let inputTodoForm = document.getElementById("input_list").value;
        const taskObj = new Task(inputTodoForm);
        transArray.push(taskObj);
       
        displayEachTaskForm();

        document.getElementById("input_list").value = '';

        document.getElementById("delete_todo_form").style.display = "block";


      }

    } 
    
    //ADD TASK - DAY
    
    else if (event.target.id.includes("add")) {


      if (todos.inputLength(todos.input_todo_day()) > 0) {


        removeTodoListDay();
      
        for (var i = 0; i < mainArray.length; i++) {

          if (mainArray[i].a.includes(numberSave)) {

            let inputTodoDay = document.getElementById("input_list_output").value;
            const taskObj2 = new TaskDay(inputTodoDay);
            mainArray[i].z.push(taskObj2);
            displayEachTaskDay(i);
            view.calculateProgress(i);
           
          }
        }

        document.getElementById("input_list_output").value = '';


      }
    }

    //TOGGLE SHOWING MORE BANK HOLS

    else if (event.target.id === "expand-holidays") {

      var showMoreHols = document.getElementById("collapsible_holidays");

      if (showMoreHols.style.display === "block") {

        document.getElementById("collapsible_holidays").style.display = 'none';
        event.target.src = "images/expand.png";

      } else {
        document.getElementById("collapsible_holidays").style.display = 'block';
        event.target.src = "images/collapse.png";

      }
    }

    //TOGGLE SHOWING MORE WEATHER - DESKTOP

    else if (event.target.id === 'showmore-weather') {

      const showMoreWeather = document.getElementById("collapsible_weather");
      

      if (showMoreWeather.style.transform == "scaleY(1)") {
        showMoreWeather.style.transform = "scaleY(0)";
        event.target.src = "images/expand.png";
      } else {
        showMoreWeather.style.transform = "scaleY(1)";
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


    //TOGGLE DISPLAYING DESKTOP REGISTER SECTION

    else if (event.target.id === "btn-register-txt") {


      if (document.getElementById('register-wrapper').style.display === "none") {

        document.getElementById('register-wrapper').style.display = "flex";

        Account.insertRegisterWrapperDesktop();


        if (document.getElementById("login-wrapper").style.display === "flex") {
          document.getElementById("login-wrapper").removeChild(document.getElementById("login-wrapper").childNodes[0]);
          document.getElementById("login-wrapper").style.display = "none";
        }

      } else {

        document.getElementById("register-wrapper").removeChild(document.getElementById("register-wrapper").childNodes[0]);
        document.getElementById("register-wrapper").style.display = "none";
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
            console.log(mainArray);
            todos.countAllTodos();
            document.getElementById("btn-login-txt").innerHTML = 'Sign out';
            Account.removeRegisterWrapperDesktop();
            document.getElementById("top-welcome-message").innerHTML = `${nameRegister}`;

          }

          todos.countAllTodos();

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
        todos.countAllTodos();
        view.displayHelloGuest();

        event.target.innerHTML = "Sign in";
      } else {

        if (document.getElementById('login-wrapper').style.display === "none") {

          document.getElementById("login-wrapper").style.display = "flex";
          Account.insertLoginWrapperDesktop();

          if (document.getElementById("register-wrapper").style.display === "flex") {
            Account.removeRegisterWrapperDesktop();
          }

        } else {

          Account.removeLoginWrapperDesktop();

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

            console.log(data);

            view.removeSigninWarning();
            signedIn = true;
            userId = data.id;
            mainArray.splice(0, mainArray.length);
            const nameSignin = data.name;

            if (data.entries.length > 0) {

              for (let i = 0; i < data.entries.length; i++) {

                const savedDayFull = new SavedDay(data.entries[i].a, data.entries[i].f, data.entries[i].g, data.entries[i].z);

                console.log(savedDayFull);

                mainArray.push(savedDayFull);

              }
              todos.countAllTodos();
            }

            Calendar.removeMonthHtml();
            Calendar.loadCurrentYear();
            Calendar.loadCurrentMonthHtml();

            document.getElementById("login-wrapper").removeChild(document.getElementById("login-wrapper").childNodes[0]);
            document.getElementById("login-wrapper").style.display = "none";

            view.displaySignOut();
            document.getElementById("top-welcome-message").innerHTML = `${nameSignin}!`;


          } else {

            view.removeSigninWarning();
            view.displayWrongCredentials();

          }

        })

    }

    //ON BACKGROUND CLICK

    else if (event.target.id === "main_pic") {

      if (document.getElementById('login-wrapper').style.display === "flex") {

        Account.removeLoginWrapperDesktop();


      } else if (document.getElementById('register-wrapper').style.display === "flex") {

        Account.removeRegisterWrapperDesktop();

      }

    }


    //SHOW WEATHER RESPONSIVE

    else if (event.target.id === "showmore-weather-resp-icon" || event.target.id === "showmore-weather-resp-text") {

      document.getElementById("collapsible_weather_responsive").style.display = "flex";

    }

    //CLOSE WEATHER RESPONSIVE

    else if (event.target.id === "collapsible_weather_close") {

      document.getElementById("collapsible_weather_responsive").style.display = "none";

    }

    //SHOW HOLIDAYS RESPONSIVE

    else if (event.target.id === "expand-holidays-resp-logo" || event.target.id === "expand-holidays-resp-text") {
      document.getElementById("collapsible_holidays_responsive").style.display = "flex";

    }

    //CLOSE HOLIDAYS RESPOSIVE
    else if (event.target.id === "collapsible_holidays_responsive_close") {

      document.getElementById("collapsible_holidays_responsive").style.display = "none";
    }

    //ON ACCOUNT DIV CLOSE CLICK - RESPONSIVE

    else if (event.target.id === "credentials-pop-up-close") {

      Account.undisplayAccountPopupResp();
      Account.removeLogbox();
      Account.removeRegisterBox();


    }

    //ON ACCOUNT DIV CLICK - RESPONSIVE

    else if (event.target.id === 'credentials-wrapper-icon' || event.target.id === 'credentials-wrapper-text') {

      document.getElementById("credentials-pop-up").style.display = "flex";
      Account.removeLogbox();
      Account.insertLogBox();
      Account.focusSigninResponsive();
      Account.unfocusRegisterResponsive();

    }

    //ON SIGN IN CLICK - RESPONSIVE

    else if (event.target.id === 'btn-login-txt-responsive') {

      Account.removeLogbox();
      Account.removeRegisterBox();
      Account.insertLogBox();
      Account.focusSigninResponsive();
      Account.unfocusRegisterResponsive();

    }

    //ON REGISTER CLICK - RESPONSIVE

    else if (event.target.id === 'btn-register-txt-responsive') {

      Account.removeLogbox();
      Account.removeRegisterBox();
      Account.insertRegisterBox();
      Account.focusRegisterResponsive();
      Account.unfocusSigninResponsive();
      todos.countAllTodos();

    }


    //ON STATS CLICK

    else if (event.target.id === 'stats_main_logo' || event.target.id === 'stats_main_text') {

      document.getElementById("stats-main").style.display = 'flex';
      todos.countAllTodos();
      document.getElementById("calendar-main").style.display = 'none'

    }

    //CLOSE STATS

    else if (event.target.id === 'close_stats') {

      document.getElementById("stats-main").style.display = 'none';
      document.getElementById("calendar-main").style.display = 'grid'
    }

    //TOGGLE FORM DROPDOWN MENU

    else if (event.target.id === 'btn-form-dropdown') {
      document.getElementById("myDropdown").classList.toggle("show");
    }

    //ON DROPDOWN ITEM CLICK - FORM

    else if (event.target.id.includes("drop-down-"))  {

      document.getElementById("todo-type-selected").innerHTML = event.target.innerHTML;
      document.getElementById("myDropdown").classList.toggle("show");
    }

    //TOGGLE DAY DROPDOWN MENU

    else if (event.target.id === 'todo-day-dropdown-area' || event.target.id === 'todo-day-dropdown-area-2' ) {
      document.getElementById("myDropdown-2").classList.toggle("show");
    }

    //ON DROPDOWN ITEM CLICK - DAY

    else if (event.target.id.includes("day-down"))  {

      document.getElementById("todo-type-selected-2").innerHTML = event.target.innerHTML;
      document.getElementById("myDropdown-2").classList.toggle("show");
    }





  },
  false
);

//ON WINDOW LOAD

window.onload = function () {
  Calendar.loadCurrentYear();
  Calendar.loadCurrentMonthHtml();
  Holidays.updateNextHolidays()
  Weather.locationWeather();
  welcome.nowTime();
  todos.countAllTodos();
};