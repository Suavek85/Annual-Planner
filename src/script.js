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

    Account.handleAccountClick(event, currentId);
    Calendar.handleRenderingCalendar(currentId);

  
    //SUBMIT NEW DAY

    if (currentId.includes("submit_")) {

      view.undisplayForm();
      view.displayCalendar();
      view.displayWelcome();
      submitTheNewDay(dayNameAttribute);
      view.removeSubmitButton();
      view.clearTodo();
      updateProfileTodos();
    
    } 
    

    //ADD DAY OR OPEN DAY
    
    else if (currentId.includes("calendar")) {

      view.undisplayCalendar();

      if (!event.target.style.borderRadius) {

        view.displayForm();
        view.undisplayWelcome();
        const numberAdd = currentId.slice(-9);
        view.displaySubmitButton(numberAdd);
        const elementStyle = event.target.style;
        view.createGreenCircle(elementStyle);
        closeBtnPreviousIds.push(currentId);
      
      } 
      
      else {

        view.displayDay();
        view.undisplayForm();
        view.undisplayWelcome();
        todos.countAllTodos();
        numberSave = currentId.slice(-9);
        view.displaySaveExitButton(numberSave);
        view.calcDateforDay(currentId)
        openTheDay( numberSave, dayNameAttribute);  
        view.clearInputFieldDay();

      }

    } 
    
    //CLOSE DAY
    
    else if (currentId.includes("close-day")) {

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

    else if (currentId.includes("close-form")) {

      view.displayCalendar();
      view.removeGreenCircle(closeBtnPreviousIds);
      view.displayWelcome();
      view.undisplayForm();
      view.removeSubmitButton();

    } 
    
    //DELETE TASK - FORM
    
    else if (currentId.includes("delete_todo_form")) {

      deleteTaskForm();
      removeTodoList();
      displayEachTaskForm();

    } 

    //DELETE TASK - DAY
    
    else if (currentId.includes("delete_output")) {

      deleteTaskDay(numberSave);
    }
    
    //TASK COMPLETED - DAY
    
    else if (currentId.includes("completed")) {

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
    
    else if (currentId.includes("add")) {


      if (todos.inputLength(todos.input_todo_day()) > 0) {

        removeTodoListDay();
        addTheTaskDay(numberSave);
        view.emptyInputDay();   
      }
    }

    //TOGGLE SHOWING MORE BANK HOLS

    else if (currentId === "expand-holidays") {

      const evtSource = event.target.src;
      view.displayMoreWeather(evtSource);
    }

    //TOGGLE SHOWING MORE WEATHER - DESKTOP

    else if (currentId === 'showmore-weather') {

      const evtSource = event.target.src;
      view.displayMoreWeather(evtSource);
      
    }


    //ON REGISTER BUTTON
    
    else if (currentId === "register-button") {

      view.removeRegisterWarning();
      onRegisterButton();
    }


    //ON SIGN IN BUTTON

    else if (currentId === "signin-button") {

      view.removeSigninWarning();
      view.displayLoading();
      onSignInButton();

    }

    
    //SHOW WEATHER RESPONSIVE

    else if (currentId === "showmore-weather-resp-icon" || currentId === "showmore-weather-resp-text") {

      view.displayMoreWeatherResp();

    }

    //CLOSE WEATHER RESPONSIVE

    else if (currentId === "collapsible_weather_close") {

      view.undisplayMoreWeatherResp();

    }

    //SHOW HOLIDAYS RESPONSIVE

    else if (currentId === "expand-holidays-resp-logo" || currentId === "expand-holidays-resp-text") {

      view.displayMoreHolidaysResp();

    }

    //CLOSE HOLIDAYS RESPONSIVE
    else if (currentId === "collapsible_holidays_responsive_close") {

      view.undisplayMoreHolidaysrResp();
    }


    //ON STATS CLICK

    else if (currentId === 'stats_main_logo' || currentId === 'stats_main_text') {

      view.displayStatsBox();
      todos.countAllTodos();
      view.undisplayCalendar();

    }

    //CLOSE STATS

    else if (currentId === 'close_stats') {

      view.undisplayStatsBox();
      view.displayCalendar();
    }

    //TOGGLE FORM DROPDOWN MENU

    else if (currentId === 'btn-form-dropdown' || currentId === 'wrap-drpdn-area' ) {
      view.toggleDropdownForm();
    }

    //ON DROPDOWN ITEM CLICK - FORM

    else if (currentId.includes("drop-down-"))  {

      document.getElementById("todo-type-selected").innerHTML = event.target.innerHTML;
      view.toggleShowTasksDropdownForm();
    }

    //TOGGLE DAY DROPDOWN MENU

    else if (currentId === 'todo-day-dropdown-area' || currentId === 'todo-day-dropdown-area-2' ) {
      view.toggleShowTasksDropdownDay();
    }

    //ON DROPDOWN ITEM CLICK - DAY

    else if (currentId.includes("day-down"))  {

      document.getElementById("todo-type-selected-2").innerHTML = event.target.innerHTML;
      view.toggleDropdownDay();
    }

    //FILTERING

    else if (currentId.includes('filtered')) {

      let filteredType = event.target.innerHTML;
      removeTodoListDay();
      filteringTodos(filteredType, currentId, numberSave);

    }

// QUICK ADD


//CHOOSE QUICK ADD FORM


else if (currentId === "fast-increase")  {
  view.undisplayCalendar();
  view.displayQuickAddForm();
}


//SELECT TODO TYPE DROPDOWN

else if (currentId == 'quick-dropdown-area' || currentId == 'quick-drp-inside'){
view.toggleDropdownQuick();
  }

//SELECT TODO TYPE

else if (currentId.includes("qck"))  {

  document.getElementById("quick-todo-selected-2").innerHTML = event.target.innerHTML;
  view.undisplayDropdownQuick();
}

//CLOSE QUICK ADD FORM

else if (currentId.includes("btn-close-quick"))  {

  view.undisplayQuickAddForm();
  view.displayCalendar();
}

//SUBMIT

else if (currentId == 'btn-sbn-quick') {

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

else if (currentId === 'right-change-day') {

    const dayTypesArray = ["images/work_icon.png", "images/dayoff_icon.png", "images/holidays_icon.png"]

    view.rotateDayTypes(dayTypesArray);

} 
  
//CHANGE DAY TYPE- LEFT ARROW


else if (currentId == 'left-change-day') {

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