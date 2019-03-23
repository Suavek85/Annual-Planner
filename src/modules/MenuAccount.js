import * as SignRegister from './SignRegister';
import * as Stats from './Stats';


const logBoxHtml = `<form id='logbox' class='login-box'>

    <label for="email">Email:</label>
    <input type="email" id="email-input-2" name="email">

    <label for="pass">Password:</label>
    <input type="password" id="password-input-2" name="pass">

    <input class="profile-button profile-button--signin" id="signin-button" type="button" value="Sign in">

</form>`

const registerBoxHtml = `<form id='regbox' class='register-box'>

    <label type="email" for="username">Email:</label>
    <input type="email" id="email-input" name="email" required>

    <label for="pass">Password:</label>
    <input type="password" id="password-input" name="pass"required>

    <label for="name">Name:</label>
    <input type="name" id="name-input" name="name" required>

    <input class="profile-button profile-button--register" id="register-button" type="button" value="Register">

</form>`

const profileRespBox = document.getElementById("signorregister_form");
const registerWrapper = document.getElementById('register-wrapper');
const loginWrapper = document.getElementById("login-wrapper");
const loginBtnResp = document.getElementById("btn-login-txt-responsive");
const registernBtnResp = document.getElementById("btn-register-txt-responsive");

const removeItemContents = el => {
    if (el.hasChildNodes()) {
        el.removeChild(el.childNodes[0]);
        }
}

const unfocusItem = el => {
    el.style.transform = "scale(1)";
    el.style.fontWeight = "normal";
}

const focusItem = el => {
    el.style.fontWeight = "900";
    el.style.transform = "scale(1.1)";
}

const removeLogOrRegisterBoxResponsive = () => {
    removeItemContents(profileRespBox);
}

const insertLogBoxResponsive = () => {
    profileRespBox.insertAdjacentHTML("afterbegin", logBoxHtml);
}

const insertRegisterBoxResponsive = () => {
    profileRespBox.insertAdjacentHTML("afterbegin", registerBoxHtml);
}

const displayRegisterWrapperDesktop = () => {
    registerWrapper.style.display = "flex";
}

const insertRegisterWrapperDesktop = () => {
    registerWrapper.insertAdjacentHTML("afterbegin", registerBoxHtml);
}
  
const displayLoginWrapperDesktop = () => {
    loginWrapper.style.display = "flex";
}

const insertLoginWrapperDesktop = () => {
    loginWrapper.insertAdjacentHTML("afterbegin", logBoxHtml);
}

export const removeRegisterWrapperDesktop = () => {
    removeItemContents(registerWrapper);
    registerWrapper.style.display = "none";
}
  
export const removeLoginWrapperDesktop = () => {
    removeItemContents(loginWrapper);
    loginWrapper.style.display = "none";
}

const focusSigninResponsive = () => {
    focusItem(loginBtnResp);
    unfocusItem(registernBtnResp);
}

const unfocusRegisterResponsive = () => {
    unfocusItem(registernBtnResp);
}

const focusRegisterResponsive = () => {
    focusItem(registernBtnResp);
    unfocusItem(loginBtnResp);
}

const unfocusSigninResponsive = () => {
    unfocusItem(loginBtnResp);
}

export const undisplayAccountPopupResp = () => {
    const profilePopUp = document.getElementById("credentials-pop-up");
    profilePopUp.style.display = "none";
}

const displayAccountPopupResp = () => {
    const profilePopUp = document.getElementById("credentials-pop-up");
    profilePopUp.style.display = "flex";
}

const undisplayProfileBoxResposive = () => {
    const profilePopUp = document.getElementById("credentials-pop-up");
    if (profilePopUp.style.display === 'flex') {
        profilePopUp.style.display = 'none';
    }
}

export const undisplayOnWindowResize = () => {

    if (window.innerWidth > 980) {
        undisplayProfileBoxResposive();
        removeLogOrRegisterBoxResponsive();
    } else {
        removeLoginWrapperDesktop();
        removeRegisterWrapperDesktop()
    }
}

const onBackgroundClick = () => {

      if (loginWrapper.style.display === "flex") {
        removeLoginWrapperDesktop();
      }  
      
      if (registerWrapper.style.display === "flex") {
        removeRegisterWrapperDesktop();
      }
}

export const handleAccountClick = (event, currentId, currentHtml) => {

        //TOGGLE DISPLAYING DESKTOP REGISTER SECTION

        if (currentId === "btn-register-txt") {

            if (registerWrapper.style.display === "none") {
        
            displayRegisterWrapperDesktop();
            insertRegisterWrapperDesktop();
            removeLoginWrapperDesktop();
            
            } else {
        
            removeRegisterWrapperDesktop();
            }
        }

        //TOGGLE DISPLAYING SIGN IN SECTION

        if (currentId === "btn-login-txt") {

            if (currentHtml === 'Sign out') {

            SignRegister.onSignOut();
            event.target.innerHTML = 'Sign in';

            } else {

                if (loginWrapper.style.display === "none") {

                    displayLoginWrapperDesktop();
                    insertLoginWrapperDesktop();

                    if (registerWrapper.style.display === "flex") {
                    removeRegisterWrapperDesktop();
                    }
                    
                } else {
                    removeLoginWrapperDesktop();
                }
            }
        }

        switch(currentId) {
            //ON BACKGROUND CLICK
            case "main_pic":
                onBackgroundClick();
                break;
            //ON ACCOUNT DIV CLOSE CLICK - RESPONSIVE
            case "credentials-pop-up-close":
                undisplayProfileBoxResposive();
                removeLogOrRegisterBoxResponsive();
                break;
            //ON ACCOUNT DIV CLOSE CLICK - RESPONSIVE
            case 'credentials-wrapper-icon':
            case 'credentials-wrapper-text':
                displayAccountPopupResp();
                removeLogOrRegisterBoxResponsive();
                insertLogBoxResponsive();
                focusSigninResponsive();
                unfocusRegisterResponsive();
                break;
            //ON SIGN IN CLICK - RESPONSIVE
            case 'btn-login-txt-responsive':
                removeLogOrRegisterBoxResponsive();
                insertLogBoxResponsive();
                focusSigninResponsive();
                unfocusRegisterResponsive();
                break;
            //ON REGISTER  CLICK - RESPONSIVE
            case 'btn-register-txt-responsive':
                removeLogOrRegisterBoxResponsive();
                insertRegisterBoxResponsive();
                focusRegisterResponsive();
                unfocusSigninResponsive();
                Stats.countAllTodos();
                break;
          }

}

