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



const removeLogOrRegisterBoxResponsive = () => {

    if (profileRespBox.hasChildNodes()) {
        profileRespBox.removeChild(profileRespBox.childNodes[0]);
    }
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

    if (registerWrapper.hasChildNodes()) {
    registerWrapper.removeChild(registerWrapper.childNodes[0]);
    }
    registerWrapper.style.display = "none";
}
  

export const removeLoginWrapperDesktop = () => {

    if (loginWrapper.hasChildNodes()) {
        loginWrapper.removeChild(loginWrapper.childNodes[0]);
    }
    loginWrapper.style.display = "none";
}


const focusSigninResponsive = () => {

    loginBtnResp.style.fontWeight = "900";
    loginBtnResp.style.transform = "scale(1.1)";
    unfocusRegisterResponsive()
}

const unfocusRegisterResponsive = () => {

    registernBtnResp.style.transform = "scale(1)";
    registernBtnResp.style.fontWeight = "normal";
}


const focusRegisterResponsive = () => {

    registernBtnResp.style.fontWeight = "900";
    registernBtnResp.style.transform = "scale(1.1)";
    unfocusSigninResponsive();
}

const unfocusSigninResponsive = () => {

    loginBtnResp.style.transform = "scale(1)";
    loginBtnResp.style.fontWeight = "normal";
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

            if (document.getElementById('register-wrapper').style.display === "none") {
        
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

        //ON BACKGROUND CLICK

        if (currentId === "main_pic") {

            onBackgroundClick();
        }

        //ON ACCOUNT DIV CLOSE CLICK - RESPONSIVE

        if (currentId === "credentials-pop-up-close") {

            undisplayProfileBoxResposive();
            removeLogOrRegisterBoxResponsive();
        }

        //ON ACCOUNT DIV CLICK - RESPONSIVE

        if (currentId === 'credentials-wrapper-icon' || currentId === 'credentials-wrapper-text') {

            displayAccountPopupResp();
            removeLogOrRegisterBoxResponsive();
            insertLogBoxResponsive();
            focusSigninResponsive();
            unfocusRegisterResponsive();
    
        }
  
        //ON SIGN IN CLICK - RESPONSIVE
    
        if (currentId === 'btn-login-txt-responsive') {
    
            removeLogOrRegisterBoxResponsive();
            insertLogBoxResponsive();
            focusSigninResponsive();
            unfocusRegisterResponsive();
        }
  
        //ON REGISTER CLICK - RESPONSIVE
    
        if (currentId === 'btn-register-txt-responsive') {
    
            removeLogOrRegisterBoxResponsive();
            insertRegisterBoxResponsive();
            focusRegisterResponsive();
            unfocusSigninResponsive();
            Stats.countAllTodos();
    
        }
}

