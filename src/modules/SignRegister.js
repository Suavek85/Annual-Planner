import {
    view
  } from './View';

import {
    mainArray,
    Day
} from './Days';
import * as MenuAccount from './MenuAccount';
import * as Calendar from './Calendar';
import * as Stats from './Stats';


let signedIn = false;
let userId;


 const onSignInButton = () => {

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
  
              const savedDayFull = new Day(data.entries[i].a, data.entries[i].f,  data.entries[i].z);
  
              mainArray.push(savedDayFull);
  
            }
            Stats.countAllTodos();
          }
          
          Calendar.clearAndLoadCurrentCalendar();
          MenuAccount.removeLoginWrapperDesktop();
          MenuAccount.undisplayAccountPopupResp();
          view.displaySignOut();
          document.getElementById("top-welcome-message").innerHTML = `${nameSignin}!`;
  
        } else {
          view.removeSigninWarning();
          view.displayWrongCredentials();
        }
      }
      )
   }

   const onRegisterButton = () => {

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
          Calendar.clearAndLoadCurrentCalendar();
          Stats.countAllTodos();
          document.getElementById("btn-login-txt").innerHTML = 'Sign out';
          MenuAccount.removeRegisterWrapperDesktop();
          MenuAccount.undisplayAccountPopupResp();
          document.getElementById("top-welcome-message").innerHTML = `${nameRegister}`;
  
        }
  
        Stats.countAllTodos();
  
      })
  
   }


const onSignOut = () => {

    signedIn = false;
    mainArray.splice(0, mainArray.length);
    Stats.countAllTodos();
    Calendar.clearAndLoadCurrentCalendar();
    Stats.countAllTodos();
    view.displayHelloGuest();   
}


const updateProfileTodos = () => {

    if (signedIn) {
  
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
  
      }
    )
  }
}


const renderingSigninClick = (currentId) => {

    //ON SIGN IN BUTTON
    if (currentId === "signin-button") {

      view.removeSigninWarning();
      view.displayLoading();
      onSignInButton();

    }
}


const renderingRegisterClick = (currentId) => {

  //ON REGISTER BUTTON
  if (currentId === "register-button") {

    view.removeRegisterWarning();
    view.displayCreatingProfile();
    onRegisterButton();
  }
}

export  { renderingRegisterClick, renderingSigninClick, updateProfileTodos, onSignOut };
  