import {
  todos,
  taskComepletedDay,
  deleteTaskDay,
  deleteTaskForm,
  displayEachTaskForm,
  removeTodoList ,
  removeTodoListDay,
  submitTheNewDay,
  openTheDay,
  updateTheDay,
  addTheTaskForm,
  addTheTaskDay,
  filteringTodos,
  onSignInButton,
  onRegisterButton,
  onSignOut,
  updateProfileTodos
  
} from './modules/Todos';
import {
  welcome
} from './modules/Welcome';
import {
  view
} from './modules/View';
import * as Weather from './modules/Weather';
import * as Holidays from './modules/Holidays';
import * as Account from './modules/Account';
import * as Quickadd from './modules/Quickadd';
import * as Calendar from './modules/Calendar';


let closeBtnPreviousIds = [];
let numberSave;

//CLICK EVENT LISTENER

document.addEventListener(
  "click",
  event => {

    const dayNameAttribute = event.target.getAttribute("day-name");
    const currentId = event.target.id;
  
    //SUBMIT NEW DAY

    if (event.target.id.includes("submit_")) {

      view.undisplayForm();
      view.displayCalendar();
      view.displayWelcome();
      submitTheNewDay(dayNameAttribute);
      view.removeSubmitButton();
      view.clearTodo();
      updateProfileTodos();
    
    } 
    

    //ADD DAY OR OPEN DAY
    
    else if (event.target.id.includes("calendar")) {

      view.undisplayCalendar();

      if (!event.target.style.borderRadius) {

        view.displayForm();
        view.undisplayWelcome();
        const numberAdd = event.target.id.slice(-9);

        view.displaySubmitButton(numberAdd);
        const elementStyle = event.target.style;
        view.createGreenCircle(elementStyle);

        //refact
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


        //refact
        const c = " ";
        const currentDate = [event.target.id.slice(8, 10), c, event.target.id.slice(10, 11).toUpperCase(), event.target.id.slice(11, 13), c, event.target.id.slice(13)].join('');
        document.getElementById("notes-box-top-right-text").innerHTML = currentDate;



        openTheDay( numberSave, dayNameAttribute);  

        view.clearInputFieldDay();

      }

    } 
    
    //CLOSE DAY
    
    else if (event.target.id.includes("close-day")) {

      updateTheDay(dayNameAttribute);
      updateProfileTodos();
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

      //refact      
      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.borderRadius = null;
      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.backgroundColor = null;

      view.displayWelcome();
      view.undisplayForm();
      view.removeSubmitButton();

    } 
    
    //DELETE TASK - FORM
    
    else if (event.target.id.includes("delete_todo_form")) {

      deleteTaskForm();
      removeTodoList();
      displayEachTaskForm();

    } 

    //DELETE TASK - DAY
    
    else if (event.target.id.includes("delete_output")) {

      deleteTaskDay(numberSave);
    }
    
    //TASK COMPLETED - DAY
    
    else if (event.target.id.includes("completed")) {

      taskComepletedDay(numberSave);

    } 
    
    //ADD TASK - FORM

    else if (event.target.id.includes("enter")) {


      if (todos.inputLength(todos.input_todo_form()) > 0) {

        removeTodoList();
        addTheTaskForm();
        view.emptyInputForm();
        view.displayDeleteForm();

      }
    } 
    
    //ADD TASK - DAY
    
    else if (event.target.id.includes("add")) {


      if (todos.inputLength(todos.input_todo_day()) > 0) {

        removeTodoListDay();
        addTheTaskDay(numberSave);
        view.emptyInputDay();   
      }
    }

    //TOGGLE SHOWING MORE BANK HOLS

    else if (event.target.id === "expand-holidays") {

      const evtSource = event.target.src;
      view.displayMoreWeather(evtSource);
    }

    //TOGGLE SHOWING MORE WEATHER - DESKTOP

    else if (event.target.id === 'showmore-weather') {

      const evtSource = event.target.src;
      view.displayMoreWeather(evtSource);
      
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

        Account.displayRegisterWrapperDesktop();
        Account.insertRegisterWrapperDesktop();
        Account.removeLoginWrapperDesktop();
        
      } 
      
      else {

        Account.removeRegisterWrapperDesktop();
      }
    }



    //ON REGISTER BUTTON
    
    else if (event.target.id === "register-button") {

      view.removeRegisterWarning();
      onRegisterButton();
    }

    //TOGGLE DISPLAYING SIGN IN SECTION

    else if (event.target.id === "btn-login-txt") {

      if (event.target.innerHTML === 'Sign out') {

        onSignOut();
        event.target.innerHTML = 'Sign in';
      } 
      
      else {

        if (document.getElementById('login-wrapper').style.display === "none") {

          Account.displayLoginWrapperDesktop();
          Account.insertLoginWrapperDesktop();

          if (document.getElementById("register-wrapper").style.display === "flex") {
            Account.removeRegisterWrapperDesktop();
          }
        } 
        
        else {

          Account.removeLoginWrapperDesktop();

        }
      }
    }


    //ON SIGN IN BUTTON

    else if (event.target.id === "signin-button") {

      view.removeSigninWarning();
      view.displayLoading();
      onSignInButton();

    }

    //ON BACKGROUND CLICK

    else if (event.target.id === "main_pic") {

      if (document.getElementById('login-wrapper').style.display === "flex") {

        Account.removeLoginWrapperDesktop();
      } 
      
      else if (document.getElementById('register-wrapper').style.display === "flex") {
        Account.removeRegisterWrapperDesktop();
      }
    }


    //SHOW WEATHER RESPONSIVE

    else if (event.target.id === "showmore-weather-resp-icon" || event.target.id === "showmore-weather-resp-text") {

      view.displayMoreWeatherResp();

    }

    //CLOSE WEATHER RESPONSIVE

    else if (event.target.id === "collapsible_weather_close") {

      view.undisplayMoreWeatherResp();

    }

    //SHOW HOLIDAYS RESPONSIVE

    else if (event.target.id === "expand-holidays-resp-logo" || event.target.id === "expand-holidays-resp-text") {

      view.displayMoreHolidaysResp();

    }

    //CLOSE HOLIDAYS RESPONSIVE
    else if (event.target.id === "collapsible_holidays_responsive_close") {

      view.undisplayMoreHolidaysrResp();
    }

    //ON ACCOUNT DIV CLOSE CLICK - RESPONSIVE

    else if (event.target.id === "credentials-pop-up-close") {

      Account.undisplayProfileBoxResposive();
      Account.removeLogOrRegisterBoxResponsive();
    }

    //ON ACCOUNT DIV CLICK - RESPONSIVE

    else if (event.target.id === 'credentials-wrapper-icon' || event.target.id === 'credentials-wrapper-text') {

      Account.displayAccountPopupResp();
      Account.removeLogOrRegisterBoxResponsive();
      Account.insertLogBoxResponsive();
      Account.focusSigninResponsive();
      Account.unfocusRegisterResponsive();

    }

    //ON SIGN IN CLICK - RESPONSIVE

    else if (event.target.id === 'btn-login-txt-responsive') {

      Account.removeLogOrRegisterBoxResponsive();
      Account.insertLogBoxResponsive();
      Account.focusSigninResponsive();
      Account.unfocusRegisterResponsive();

    }

    //ON REGISTER CLICK - RESPONSIVE

    else if (event.target.id === 'btn-register-txt-responsive') {

      Account.removeLogOrRegisterBoxResponsive();
      Account.insertRegisterBoxResponsive();
      Account.focusRegisterResponsive();
      Account.unfocusSigninResponsive();
      todos.countAllTodos();

    }


    //ON STATS CLICK

    else if (event.target.id === 'stats_main_logo' || event.target.id === 'stats_main_text') {

      view.displayStatsBox();
      todos.countAllTodos();
      view.undisplayCalendar();

    }

    //CLOSE STATS

    else if (event.target.id === 'close_stats') {

      view.undisplayStatsBox();
      view.displayCalendar();
    }

    //TOGGLE FORM DROPDOWN MENU

    else if (event.target.id === 'btn-form-dropdown' || event.target.id === 'wrap-drpdn-area' ) {
      view.toggleDropdownForm();
    }

    //ON DROPDOWN ITEM CLICK - FORM

    else if (event.target.id.includes("drop-down-"))  {

      document.getElementById("todo-type-selected").innerHTML = event.target.innerHTML;
      view.toggleShowTasksDropdownForm();
    }

    //TOGGLE DAY DROPDOWN MENU

    else if (event.target.id === 'todo-day-dropdown-area' || event.target.id === 'todo-day-dropdown-area-2' ) {
      view.toggleShowTasksDropdownDay();
    }

    //ON DROPDOWN ITEM CLICK - DAY

    else if (event.target.id.includes("day-down"))  {

      document.getElementById("todo-type-selected-2").innerHTML = event.target.innerHTML;
      view.toggleDropdownDay();
    }

    //FILTERING

    else if (event.target.id.includes('filtered')) {

      let filteredType = event.target.innerHTML;
      let filteredId = event.target.id;
      removeTodoListDay();
      filteringTodos(filteredType, filteredId, numberSave);

    }

// QUICK ADD


//CHOOSE QUICK ADD FORM


else if (event.target.id === "fast-increase")  {
  view.undisplayCalendar();
  view.displayQuickAddForm();
}


//SELECT TODO TYPE DROPDOWN

else if (event.target.id == 'quick-dropdown-area' || event.target.id == 'quick-drp-inside'){
view.toggleDropdownQuick();
  }

//SELECT TODO TYPE

else if (event.target.id.includes("qck"))  {

  document.getElementById("quick-todo-selected-2").innerHTML = event.target.innerHTML;
  view.undisplayDropdownQuick();
}

//CLOSE QUICK ADD FORM

else if (event.target.id.includes("btn-close-quick"))  {

  view.undisplayQuickAddForm();
  view.displayCalendar();
}

//SUBMIT

else if (event.target.id == 'btn-sbn-quick') {

  const inputQuickTask = document.getElementById('quick_input_list').value;
  const fromDate = document.getElementById("quick-from-date").value;
  const untilDate = document.getElementById("quick-until-date").value;

  if (inputQuickTask && fromDate <= untilDate && fromDate.length != 0 
    && untilDate.length != 0  ) {
    
    Quickadd.daysFromDateRange();
    view.undisplayQuickAddForm();
    view.displayCalendar();
  } 
    
  else {
    console.log('wrong selections or empty input field');
  }
}

  //CHANGE DAY TYPE- RIGHT ARROW

else if (event.target.id === 'right-change-day') {

    const dayTypesArray = ["images/work_icon.png", "images/dayoff_icon.png", "images/holidays_icon.png"]

    view.rotateDayTypes(dayTypesArray);

} 
  
//CHANGE DAY TYPE- LEFT ARROW


else if (event.target.id == 'left-change-day') {

  const dayTypesArray = ["images/holidays_icon.png", "images/dayoff_icon.png", "images/work_icon.png"  ]

  view.rotateDayTypes(dayTypesArray);

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

//ON WINDOW RESIZE

window.onresize = function() {
  Account.undisplayOnWindowResize();
};