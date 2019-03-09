const view = {
  
    todoListRemove: function() {
      var todolist = document.getElementById("todolist");
      todolist.remove();
    },

    displayForm: function() {
      document.getElementById("work").checked = true;
      document.getElementById("form-main-wrapper").style.display = "flex";
      document.querySelector(".notes-box-wrapper").style.display = "none";
      document.getElementById("task_list").innerHTML = "";
    },
  
    clearTodo: function() {
      document.getElementById("task_list").innerHTML = "";
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

    
    undisplayWelcome: function() {
      const quotes = document.querySelector(".quotes");
      quotes.style.display = "none";
    },
  
    displayWelcome: function() {
      const quotes = document.querySelector(".quotes");
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

    displayDeleteForm: function() {

      document.getElementById("delete_todo_form").style.display = "block";
    },

    emptyInputForm: function() {

      document.getElementById("input_list").value = '';
    },

    emptyInputDay: function() {

      document.getElementById("input_list_output").value = '';
    },

    displayStatsBox: function() {
      document.getElementById("stats-main").style.display = 'flex';
    },

    undisplayStatsBox: function() {
      document.getElementById("stats-main").style.display = 'none';
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

  export { view };