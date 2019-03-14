import * as SignRegister from './SignRegister';
import * as Stats from './Stats';


const logBoxHtml = `<div id='logbox' class='login-box'>

    <label for="username">Email:</label>
    <input type="username" id="email-input-2" name="username">

    <label for="pass">Password:</label>
    <input type="password" id="password-input-2" name="password">

    <input id="signin-button" type="submit" value="Sign in">

</div>`

const registerBoxHtml = `<div id='regbox' class='register-box'>

    <label type="username" for="username">Email:</label>
    <input type="username" id="email-input" name="email">

    <label for="pass">Password:</label>
    <input type="password" id="password-input" name="password">

    <label for="pass">Name:</label>
    <input type="name" id="name-input" name="password" required>

    <input id="register-button" type="submit" value="Register">

</div>`

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

