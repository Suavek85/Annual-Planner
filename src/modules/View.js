const undisplayItem = el => {
  el.style.display = 'none';
}

const displayItemFlex = el => {
  el.style.display = 'flex';
}

const displayItemBlock = el => {
  el.style.display = 'block';
}

const clearItemValue = el => {
  el.value = '';
}

const view = {
  
    todoListRemove: function() {
      const todolist = document.getElementById("todolist");
      todolist.remove();
    },

    displayForm: function() {
      document.getElementById("work").checked = true;
      document.getElementById("form-main-wrapper").style.display = "flex";
      document.querySelector(".day-wrapper").style.display = "none";
      document.getElementById("task_list").innerHTML = "";
    },
  
    clearTodo: function() {
      document.getElementById("task_list").innerHTML = "";
    },
  
    undisplayForm: function() {
      const formCloseBtnWrapper = document.getElementById("form-main-wrapper");
      if (formCloseBtnWrapper.style.display == "flex") {
        undisplayItem(formCloseBtnWrapper);
      }  
    },
  
    displaySubmit: function(el) {
      document.getElementById("submit_" + el).style.display = "block";
    },

    displaySubmitButton: function(numberAdd) {
      const submitBtnWrapper = document.getElementById("submit-btns");
      let submitBtnGen = `<button day-name="dayname${numberAdd}" class="form-submit-wrapper__buttons__item__submit" style="width: 90%" id="submit_${numberAdd}">Submit</button>`;
      submitBtnWrapper.insertAdjacentHTML('afterbegin', submitBtnGen);
    },

    removeSubmitButton: function() {
      const submitBtnWrapper = document.getElementById("submit-btns");
      submitBtnWrapper.removeChild(submitBtnWrapper.childNodes[0]);
    },

    undisplayDay: function() {
      const dayWrapper = document.querySelector(".day-wrapper");
      if(dayWrapper.style.display == 'flex') {
        undisplayItem(dayWrapper);
      }
      const closeDayWrapper = document.getElementById('close-day-wrapper');
      if(closeDayWrapper.hasChildNodes()) {
        closeDayWrapper.removeChild(closeDayWrapper.childNodes[0]);
      }
    },
  
    displayDay: function() {
      const dayWrapper = document.querySelector(".day-wrapper");
      displayItemFlex(dayWrapper);
    },
  
    startFromToday: function(number) {
      document.getElementById("name" + number).innerHTML = "TODAY";
    },

    undisplayWelcome: function() {
      const quotes = document.querySelector(".quotes");
      undisplayItem(quotes);
    },
  
    displayWelcome: function() {
      const quotes = document.querySelector(".quotes");
      displayItemBlock(quotes);
    },

    removeSigninWarning: function() {
      const signinNote = document.getElementById('signin-note');
      if (signinNote) {
        signinNote.remove();
      }
    },

    removeRegisterWarning: function() {
      const registerNote = document.getElementById('register-note');
      if (registerNote ) {
        registerNote.remove();
      }
    },

    emptyRegisterForm: function() {
      const nameInputReg = document.getElementById('name-input');
      const passInputReg = document.getElementById('password-input');
      const emailInputReg = document.getElementById('email-input');
      [nameInputReg, passInputReg, emailInputReg].forEach = el => clearItemValue(el);
    },

    emptySigninForm: function() {
      const passInputSign= document.getElementById('password-input-2');
      const emailInputSign = document.getElementById('email-input-2');
      [passInputSign, emailInputSign].forEach = el => clearItemValue(el);
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

    displayCreatingProfile: function() {
      document.getElementById('register-button').insertAdjacentHTML('afterend', '<p style="color: blue" id="register-note">Creating profile...</p>');
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
      return checkedRadio;
    },

    takeDailyNotes: function() {
      return document.getElementById("notes").value;
    },

    displayCalendar: function() {
      document.getElementById("calendar-main").style.display = 'grid';
    },

    undisplayCalendar: function() {
      const calendarMain = document.getElementById("calendar-main");
      undisplayItem(calendarMain);
    },

    displayQuickAddForm: function() {
      const quickAddForm = document.getElementById("quick-add-form-wrapper");
      displayItemFlex(quickAddForm);
    },

    undisplayQuickAddForm: function() {
      const quickAddForm = document.getElementById("quick-add-form-wrapper");
      undisplayItem(quickAddForm);
    },

    displayDeleteForm: function() {
      const deleteForm = document.getElementById("delete_todo_form");
      displayItemBlock(deleteForm);
    },

    emptyInputForm: function() {

      document.getElementById("input_list").value = '';
    },

    emptyInputDay: function() {
      const inputListDay = document.getElementById("input_list_output");
      clearItemValue(inputListDay);
    },

    displayStatsBox: function() {
      const statsBox = document.getElementById("stats-main");
      displayItemFlex(statsBox);
    },

    undisplayStatsBox: function() {
      const statsBox = document.getElementById("stats-main");
      undisplayItem(statsBox);
    },

    toggleDropdownQuick: function() {
      const quickDropdown = document.getElementById("quick-drp-list-2");
      if ( quickDropdown.style.display == "none") {
        displayItemBlock(quickDropdown);
      }  else {
        undisplayItem(quickDropdown);
      }
    },

    undisplayDropdownQuick: function() {
      const quickDropdown = document.getElementById("quick-drp-list-2");
      undisplayItem(quickDropdown);
    },

    clearInputFieldDay: function() {
      const inputFieldDay = document.getElementById("input_list_output");
      clearItemValue(inputFieldDay);
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