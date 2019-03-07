import {
    todos,
    onSignOut
    
  } from './Todos';


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


const removeLogOrRegisterBoxResponsive = () => {

    if (document.getElementById("signorregister_form").hasChildNodes()) {
        document.getElementById("signorregister_form").removeChild(document.getElementById("signorregister_form").childNodes[0]);
    }
}

const insertLogBoxResponsive = () => {

    document.getElementById("signorregister_form").insertAdjacentHTML("afterbegin", logBoxHtml);

}

const insertRegisterBoxResponsive = () => {

    document.getElementById("signorregister_form").insertAdjacentHTML("afterbegin", registerBoxHtml);

}


const displayRegisterWrapperDesktop = () => {

    document.getElementById('register-wrapper').style.display = "flex";
}


const insertRegisterWrapperDesktop = () => {
    document.getElementById("register-wrapper").insertAdjacentHTML("afterbegin", registerBoxHtml);

}
  

const displayLoginWrapperDesktop = () => {

    document.getElementById("login-wrapper").style.display = "flex";
}

const insertLoginWrapperDesktop = () => {

    document.getElementById("login-wrapper").insertAdjacentHTML("afterbegin", logBoxHtml);

}

export const removeRegisterWrapperDesktop = () => {

    if (document.getElementById("register-wrapper").hasChildNodes()) {
    document.getElementById("register-wrapper").removeChild(document.getElementById("register-wrapper").childNodes[0]);
    }
    document.getElementById("register-wrapper").style.display = "none";

}
  

export const removeLoginWrapperDesktop = () => {

    if (document.getElementById("login-wrapper").hasChildNodes()) {
    document.getElementById("login-wrapper").removeChild(document.getElementById("login-wrapper").childNodes[0]);
    }
    document.getElementById("login-wrapper").style.display = "none";
}


const focusSigninResponsive = () => {

    document.getElementById("btn-login-txt-responsive").style.fontWeight = "900";
    document.getElementById("btn-login-txt-responsive").style.transform = "scale(1.1)";
    document.getElementById("btn-register-txt-responsive").style.transform = "scale(1)";
    document.getElementById("btn-register-txt-responsive").style.fontWeight = "normal";

}

const unfocusRegisterResponsive = () => {

    document.getElementById("btn-register-txt-responsive").style.transform = "scale(1)";
    document.getElementById("btn-register-txt-responsive").style.fontWeight = "normal";

}


const focusRegisterResponsive = () => {

    document.getElementById("btn-register-txt-responsive").style.fontWeight = "900";
    document.getElementById("btn-register-txt-responsive").style.transform = "scale(1.1)";
    document.getElementById("btn-login-txt-responsive").style.transform = "scale(1)";
    document.getElementById("btn-login-txt-responsive").style.fontWeight = "normal";

}

const unfocusSigninResponsive = () => {

    document.getElementById("btn-login-txt-responsive").style.transform = "scale(1)";
    document.getElementById("btn-login-txt-responsive").style.fontWeight = "normal";

}

export const undisplayAccountPopupResp = () => {

    document.getElementById("credentials-pop-up").style.display = "none";

}

const displayAccountPopupResp = () => {

    document.getElementById("credentials-pop-up").style.display = "flex";

}

const undisplayProfileBoxResposive = () => {
      if (document.getElementById('credentials-pop-up').style.display === 'flex') {
        document.getElementById('credentials-pop-up').style.display = 'none';
      }
}

export const undisplayOnWindowResize = () => {

    if (window.innerWidth > 980) {
        undisplayProfileBoxResposive();
        removeLogOrRegisterBoxResponsive();
    }
      
    else {
        removeLoginWrapperDesktop();
        removeRegisterWrapperDesktop()
    }
}


const onBackgroundClick = () => {

      if (document.getElementById('login-wrapper').style.display === "flex") {

        removeLoginWrapperDesktop();
      } 
      
      else if (document.getElementById('register-wrapper').style.display === "flex") {
        removeRegisterWrapperDesktop();
      }

}


export const handleAccountClick = (event, currentId) => {


        //TOGGLE DISPLAYING DESKTOP REGISTER SECTION


        if (currentId === "btn-register-txt") {


        if (document.getElementById('register-wrapper').style.display === "none") {
    
          displayRegisterWrapperDesktop();
          insertRegisterWrapperDesktop();
          removeLoginWrapperDesktop();
          
        } 
        
        else {
    
          removeRegisterWrapperDesktop();
        }
      }

        //TOGGLE DISPLAYING SIGN IN SECTION

            

        else if (currentId === "btn-login-txt") {

            if (event.target.innerHTML === 'Sign out') {

            onSignOut();
            
            event.target.innerHTML = 'Sign in';
            } 
            
            else {

            if (document.getElementById('login-wrapper').style.display === "none") {

                displayLoginWrapperDesktop();
                insertLoginWrapperDesktop();

                if (document.getElementById("register-wrapper").style.display === "flex") {
                removeRegisterWrapperDesktop();
                }
            } 
            
            else {

                removeLoginWrapperDesktop();

            }
            }
        }

        //ON BACKGROUND CLICK

        else if (currentId === "main_pic") {

            onBackgroundClick();
        }


        //ON ACCOUNT DIV CLOSE CLICK - RESPONSIVE

        else if (currentId === "credentials-pop-up-close") {

        undisplayProfileBoxResposive();
        removeLogOrRegisterBoxResponsive();
      }

        //ON ACCOUNT DIV CLICK - RESPONSIVE

        else if (currentId === 'credentials-wrapper-icon' || currentId === 'credentials-wrapper-text') {

            displayAccountPopupResp();
            removeLogOrRegisterBoxResponsive();
            insertLogBoxResponsive();
            focusSigninResponsive();
            unfocusRegisterResponsive();
    
        }
  
      //ON SIGN IN CLICK - RESPONSIVE
  
      else if (currentId === 'btn-login-txt-responsive') {
  
        removeLogOrRegisterBoxResponsive();
        insertLogBoxResponsive();
        focusSigninResponsive();
        unfocusRegisterResponsive();
  
      }
  
      //ON REGISTER CLICK - RESPONSIVE
  
      else if (currentId === 'btn-register-txt-responsive') {
  
        removeLogOrRegisterBoxResponsive();
        insertRegisterBoxResponsive();
        focusRegisterResponsive();
        unfocusSigninResponsive();
        todos.countAllTodos();
  
      }

}

