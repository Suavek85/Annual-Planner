import {todos, mainArray} from './Todos';

const view = {
  
    todoListRemove: function() {
      var todolist = document.getElementById("todolist");
      todolist.remove();
    },

    displayForm: function() {
      //document.getElementById("notes").value = "";
      document.getElementById("work").checked = true;
      document.getElementById("form-main-wrapper").style.display = "flex";
      document.querySelector(".notes-box-wrapper").style.display = "none";
      todos.ul_tasks().innerHTML = "";
    },
  
    clearTodo: function() {
      todos.ul_tasks().innerHTML = "";
    },
  
    undisplayForm: function() {
      document.getElementById("form-main-wrapper").style.display = "none"; 
    },
  
    displaySubmit: function(el) {
      document.getElementById("submit_" + el).style.display = "block";
    },

    displaySubmitButton: function(numberAdd) {
      
      let submitBtnGen = `<button day-name="dayname${numberAdd}" class="submit-btn highlight" style="width: 90%" id="submit_${numberAdd}">Submit</button>`;
      document.getElementById("submit-btns").insertAdjacentHTML('afterbegin', submitBtnGen);
    },

    removeSubmitButton: function() {
      const submitBtnsWrapper = document.getElementById("submit-btns");
      submitBtnsWrapper.removeChild(submitBtnsWrapper.childNodes[0]);
    },

   
  
    undisplayDay: function() {
      document.querySelector(".notes-box-wrapper").style.display = "none";
      const closeDayWrapper = document.getElementById('close-day-wrapper');
      closeDayWrapper.removeChild(closeDayWrapper.childNodes[0]);

    },
  
    displayDay: function() {
      document.querySelector(".notes-box-wrapper").style.display = "flex";
    },
  
    startFromToday: function(number) {
      document.getElementById("name" + number).innerHTML = "TODAY";
    },


  
    calculateProgress: function(i) {

        var currentTasksCount = mainArray[i].z.length;
        var currentTaskDone = 0;
        var progressBar = document.getElementById("progressbar");

        for (var k = 0; k < mainArray[i].z.length; k++) {

          if (mainArray[i].z[k].done == true) {

            currentTaskDone = currentTaskDone + 1;      

          }

        }


          var widthPercentage = Math.round(
            (currentTaskDone /currentTasksCount) * 100
          );
      
          if (
            isNaN(widthPercentage) ||
            widthPercentage === 0 ||
            widthPercentage === undefined
          ) {
            progressBar.style.width = "100%";
            progressBar.innerHTML = "0% completed";
            progressBar.style.backgroundColor = "#A4A4A4";
          } else {
            progressBar.style.width = widthPercentage + '%';
            progressBar.style.backgroundColor = "orange";
            if (widthPercentage > 40) {
              progressBar.innerHTML = widthPercentage + "% done";
            } else {
              progressBar.innerHTML = widthPercentage + "%";
            }
          }
    },


    clearProgress: function() {
      var progressBar = document.getElementById("progressbar");
      progressBar.style.width = "100%";
      progressBar.innerHTML = "0% completed";
      progressBar.style.backgroundColor = "#A4A4A4";
    },
  
    undisplayWelcome: function() {
      var welcome = document.querySelector(".welcome");
      var quotes = document.querySelector(".quotes");
      //welcome.style.display = "none";
      quotes.style.display = "none";
    },
  
    displayWelcome: function() {
      var welcome = document.querySelector(".welcome");
      var quotes = document.querySelector(".quotes");
      //welcome.style.display = "block";
      quotes.style.display = "block";
    },


    removeSigninWarning: function() {

      const signinNote = document.getElementById('signin-note');

      if  (signinNote ) {
        signinNote.remove();
      }

    },

    removeRegisterWarning: function() {

      const registerNote = document.getElementById('register-note');

      if  (registerNote ) {
        registerNote.remove();
      }

    },

    emptyRegisterForm: function() {

      document.getElementById('name-input').value = '';
      document.getElementById('password-input').value = '';
      document.getElementById('email-input').value = '';

    },

    emptySigninForm: function() {

      document.getElementById('password-input-2').value = '';
      document.getElementById('email-input-2').value = '';

    },

    displaySignOut: function() {

      document.getElementById("btn-login-txt").innerHTML = 'Sign out';

    },

    
    displayWrongCredentials: function() {

      document.getElementById('signin-button').insertAdjacentHTML('afterend', '<p id="signin-note">Wrong credentials</p>');

    },

    displayLoading: function() {

      document.getElementById('signin-button').insertAdjacentHTML('afterend', '<p style="color: orange" id="signin-note">Loading...</p>');

    },

    displayHelloGuest: function() {

      document.getElementById("top-welcome-message").innerHTML = 'guest!';

    },

    displayNoBlankFields: function() {

      document.getElementById('register-button').insertAdjacentHTML('afterend', '<p id="register-note">Field cannot be left blank</p>');

    },

    displayUserExists: function() {

      document.getElementById('register-button').insertAdjacentHTML('afterend', '<p id="register-note">User already exists</p>');

    },

    createGreenCircle: function(elementStyle) {

      elementStyle.borderRadius = "5px";
      elementStyle.backgroundColor = 'green';

    },

    takeTypeOfDay: function() {

      const radios = document.getElementsByName("day");
      for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          var checkedRadio = radios[i].value;
          break;
        }
      }
      return checkedRadio
    },

    takeDailyNotes: function() {
      return document.getElementById("notes").value;
    },

    rotateDayTypes: function(dayTypesArray) {

      let i;

      for (i = 0; i < dayTypesArray.length; i++) {

        if ( document.getElementById('type-day-icon').src.includes(dayTypesArray[i]))  {
  
          if (i ===  dayTypesArray.length -1)  {
            document.getElementById('type-day-icon').src = dayTypesArray[0];
          } 
            
          else {
            document.getElementById('type-day-icon').src = dayTypesArray[i + 1];
   
          } 
  
          break;
  
        } 
      }
    },


    displayCalendar: function() {

      document.getElementById("calendar-main").style.display = 'grid';

    },

    undisplayCalendar: function() {

      document.getElementById("calendar-main").style.display = 'none';

    },

    displayQuickAddForm: function() {

      document.getElementById("quick-add-form-wrapper").style.display = 'flex';

    },

    undisplayQuickAddForm: function() {

      document.getElementById("quick-add-form-wrapper").style.display = 'none';

    },

    toggleShowTasksDropdownDay: function(){

      document.getElementById("myDropdown-2").classList.toggle("show");
    },

    toggleShowTasksDropdownForm: function(){

      document.getElementById("myDropdown").classList.toggle("show");
    },

    displayDeleteForm: function() {

      document.getElementById("delete_todo_form").style.display = "block";
    },

    emptyInputForm: function() {

      document.getElementById("input_list").value = '';
    },

    emptyInputDay: function() {

      document.getElementById("input_list_output").value = '';
    },

    displayMoreWeather: function(evtSource) {

      const showMoreWeather = document.getElementById("collapsible_weather");
      
      if (showMoreWeather.style.transform == "scaleY(1)") {
        showMoreWeather.style.transform = "scaleY(0)";
        evtSource = "images/expand.png";
      } 
      
      else {
        showMoreWeather.style.transform = "scaleY(1)";
        evtSource = "images/collapse.png";
      }

    },

    displayMoreHolidays: function(evtSource) {

      const showMoreHols = document.getElementById("collapsible_holidays");

      if (showMoreHols.style.display === "block") {

        document.getElementById("collapsible_holidays").style.display = 'none';
        evtSource = "images/expand.png";

      } else {
        document.getElementById("collapsible_holidays").style.display = 'block';
        evtSource= "images/collapse.png";

      }

    },

    displayMoreWeatherResp: function() {
      document.getElementById("collapsible_weather_responsive").style.display = "flex";
    },

    undisplayMoreWeatherResp: function() {
      document.getElementById("collapsible_weather_responsive").style.display = "none";
    },

    displayMoreHolidaysResp: function() {
      document.getElementById("collapsible_holidays_responsive").style.display = "flex";
    },

    undisplayMoreHolidaysrResp: function() {
      document.getElementById("collapsible_holidays_responsive").style.display = "none";
    },

    displayStatsBox: function() {
      document.getElementById("stats-main").style.display = 'flex';
    },

    undisplayStatsBox: function() {
      document.getElementById("stats-main").style.display = 'none';
    },

    toggleDropdownForm: function() {
      document.getElementById("myDropdown").classList.toggle("show");
    },

    toggleDropdownDay: function() {
      document.getElementById("myDropdown-2").classList.toggle("show");
    },

    toggleDropdownQuick: function() {
      if ( document.getElementById("quick-drp-list-2").style.display == "none") {
        document.getElementById("quick-drp-list-2").style.display = "block";
      }  else {
        document.getElementById("quick-drp-list-2").style.display = "none";
      }
    },

    undisplayDropdownQuick: function() {
      document.getElementById("quick-drp-list-2").style.display = "none";
    },

    clearInputFieldDay: function() {
      document.getElementById("input_list_output").value = '';
    },

    calcDateforDay: function(evTarId) {
      const c = " ";
      const currentDate = [evTarId.slice(8, 10), c, evTarId.slice(10, 11).toUpperCase(), evTarId.slice(11, 13), c, evTarId.slice(13)].join('');
      document.getElementById("notes-box-top-right-text").innerHTML = currentDate;
    },

    removeGreenCircle: function(closeBtnPreviousIds) {
      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.borderRadius = null;
    document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.backgroundColor = null;

    }



  };


const handleWeatherAndHolidaysClick = (currentId, currentSrc) => {

    //TOGGLE SHOWING MORE BANK HOLS

    if (currentId === "expand-holidays") {

      view.displayMoreWeather(currentSrc);
    }

    //TOGGLE SHOWING MORE WEATHER - DESKTOP

    else if (currentId === 'showmore-weather') {

      view.displayMoreWeather(currentSrc);
      
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


}



const handleDropdownsForTasks = (currentId, currentHtml) => {

    //TOGGLE FORM DROPDOWN MENU

    if (currentId === 'btn-form-dropdown' || currentId === 'wrap-drpdn-area' ) {
      view.toggleDropdownForm();
    }

    //ON DROPDOWN ITEM CLICK - FORM

    else if (currentId.includes("drop-down-"))  {

      document.getElementById("todo-type-selected").innerHTML = currentHtml;
      view.toggleShowTasksDropdownForm();
    }

    //TOGGLE DAY DROPDOWN MENU

    else if (currentId === 'todo-day-dropdown-area' || currentId === 'todo-day-dropdown-area-2' ) {
      view.toggleShowTasksDropdownDay();
    }

    //ON DROPDOWN ITEM CLICK - DAY

    else if (currentId.includes("day-down"))  {

      document.getElementById("todo-type-selected-2").innerHTML = currentHtml;
      view.toggleDropdownDay();
    }

}

const handleRotatingDayTypes = (currentId) => {

  //CHANGE DAY TYPE- RIGHT ARROW

  if (currentId === 'right-change-day') {

    const dayTypesArray = ["images/work_icon.png", "images/dayoff_icon.png", "images/holidays_icon.png"]

    view.rotateDayTypes(dayTypesArray);

  } 

  //CHANGE DAY TYPE- LEFT ARROW


  else if (currentId == 'left-change-day') {

  const dayTypesArray = ["images/holidays_icon.png", "images/dayoff_icon.png", "images/work_icon.png"  ]

  view.rotateDayTypes(dayTypesArray);

}


}




  export {view, handleWeatherAndHolidaysClick, handleDropdownsForTasks, handleRotatingDayTypes};