import {todos} from './Todos';

const view = {
  
    todoListRemove: function() {
      var todolist = document.getElementById("todolist");
      todolist.remove();
    },

    displayForm: function() {
      document.getElementById("notes").value = "";
      document.getElementById("work").checked = true;
      document.getElementById("form-container").style.display = "flex";
      document.querySelector(".notes-box").style.display = "none";
      todos.ul_tasks().innerHTML = "";
    },
  
    clearTodo: function() {
      todos.ul_tasks().innerHTML = "";
    },
  
    undisplayForm: function() {
      document.getElementById("form-container").style.display = "none"; 
    },
  
    displaySubmit: function(el) {
      document.getElementById("submit_" + el).style.display = "block";
    },

    displaySubmitButton: function() {
      const numberAdd = event.target.id.slice(-9);
      let submitBtnGen = `<button day-name="dayname${numberAdd}" class="submit-btn" id="submit_${numberAdd}">Submit</button>`;
      document.getElementById("submit-btns").insertAdjacentHTML('afterbegin', submitBtnGen);
    },

    removeSubmitButton: function() {
      const submitBtnsWrapper = document.getElementById("submit-btns");
      submitBtnsWrapper.removeChild(submitBtnsWrapper.childNodes[0]);
    },

    displaySaveExitButton: function() {
      const numberSave = event.target.id.slice(-9);
      let saveexitBtnGen = `<img day-name="dayname${numberSave}" src="images\\white-saves.png" class='close-save'id='close-day-${numberSave}'></img>`
      document.getElementById("close-day-wrapper").insertAdjacentHTML('afterbegin', saveexitBtnGen);

    },
  
    undisplayDay: function() {
      document.querySelector(".notes-box").style.display = "none";
      const closeDayWrapper = document.getElementById('close-day-wrapper');
      closeDayWrapper.removeChild(closeDayWrapper.childNodes[0]);

    },
  
    displayDay: function() {
      document.querySelector(".notes-box").style.display = "flex";
    },
  
    startFromToday: function(number) {
      document.getElementById("name" + number).innerHTML = "TODAY";
    },
  
    calculateProgress: function() {
      var allTodosOutput = Array.prototype.slice.call(
        document.getElementsByName("todoscb")
      );
  
      var todosCompletedCount = 0;
      var progressBar = document.getElementById("progressbar");
  
      for (var i = 0, length = allTodosOutput.length; i < length; i++) {
        if (
          allTodosOutput[i].nextSibling.style.textDecoration === "line-through"
        ) {
          var todosCompletedCount = todosCompletedCount + 1;
        }
      }
  
      var widthPercentage = Math.round(
        (todosCompletedCount / allTodosOutput.length) * 100
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
        progressBar.style.width = widthPercentage * 2.1;
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
      welcome.style.display = "none";
      quotes.style.display = "none";
    },
  
    displayWelcome: function() {
      var welcome = document.querySelector(".welcome");
      var quotes = document.querySelector(".quotes");
      welcome.style.display = "block";
      quotes.style.display = "block";
    },

    undisplayCalendar: function() {
      document.getElementById("full_year_wrapper").style.display = 'none';
    },
      
    displayCalendar: function() {
      document.getElementById("full_year_wrapper").style.display = 'grid'; 
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

    undisplayLoginWrapper: function() {

      const loginWrapper = document.getElementById('login-wrapper');
      loginWrapper.style.display = "none" ;

    },

    undisplayRegisterWrapper: function() {

      const registerWrapper = document.getElementById('register-wrapper');
      registerWrapper.style.display = "none" ;

    },

    displayLoginWrapper: function() {

      const logWrapper = document.getElementById('login-wrapper');
      logWrapper.style.display = "block" ;

    },

    displayRegisterWrapper: function() {

      const regWrapper = document.getElementById('register-wrapper');
      regWrapper.style.display = "block" ;

    },

    emptyRegisterForm: function() {

      document.getElementById('name-input').value = '';
      document.getElementById('password-input').value = '';
      document.getElementById('email-input').value = '';

    },

    emptySigninForm: function() {

      document.getElementById('password-input-2').value = '';
      document.getElementById('email-input-2').value = '';

    }


    
  
    
  };

  export {view};