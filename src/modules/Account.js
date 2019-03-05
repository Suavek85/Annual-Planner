export const logBoxHtml = `<div id='logbox' class='login-box'>

<label for="username">Email:</label>
<input type="username" id="email-input-2" name="username">

<label for="pass">Password:</label>
<input type="password" id="password-input-2" name="password">

<input id="signin-button" type="submit" value="Sign in">


</div>`

export const registerBoxHtml = `<div id='regbox' class='register-box'>

<label type="username" for="username">Email:</label>
<input type="username" id="email-input" name="email">

<label for="pass">Password:</label>
<input type="password" id="password-input" name="password">

<label for="pass">Name:</label>
<input type="name" id="name-input" name="password" required>

<input id="register-button" type="submit" value="Register">


</div>`


export const removeLogOrRegisterBoxResponsive = () => {

    if (document.getElementById("signorregister_form").hasChildNodes()) {
        document.getElementById("signorregister_form").removeChild(document.getElementById("signorregister_form").childNodes[0]);
    }
}

export const insertLogBoxResponsive = () => {

    document.getElementById("signorregister_form").insertAdjacentHTML("afterbegin", logBoxHtml);

}

export const insertRegisterBoxResponsive = () => {

    document.getElementById("signorregister_form").insertAdjacentHTML("afterbegin", registerBoxHtml);

}


export const displayRegisterWrapperDesktop = () => {

    document.getElementById('register-wrapper').style.display = "flex";
}


export const insertRegisterWrapperDesktop = () => {
    document.getElementById("register-wrapper").insertAdjacentHTML("afterbegin", registerBoxHtml);

}
  

export const displayLoginWrapperDesktop = () => {

    document.getElementById("login-wrapper").style.display = "flex";
}

export const insertLoginWrapperDesktop = () => {

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


export const focusSigninResponsive = () => {

    document.getElementById("btn-login-txt-responsive").style.fontWeight = "900";
    document.getElementById("btn-login-txt-responsive").style.transform = "scale(1.1)";
    document.getElementById("btn-register-txt-responsive").style.transform = "scale(1)";
    document.getElementById("btn-register-txt-responsive").style.fontWeight = "normal";

}

export const unfocusRegisterResponsive = () => {

    document.getElementById("btn-register-txt-responsive").style.transform = "scale(1)";
    document.getElementById("btn-register-txt-responsive").style.fontWeight = "normal";

}


export const focusRegisterResponsive = () => {

    document.getElementById("btn-register-txt-responsive").style.fontWeight = "900";
    document.getElementById("btn-register-txt-responsive").style.transform = "scale(1.1)";
    document.getElementById("btn-login-txt-responsive").style.transform = "scale(1)";
    document.getElementById("btn-login-txt-responsive").style.fontWeight = "normal";

}

export const unfocusSigninResponsive = () => {

    document.getElementById("btn-login-txt-responsive").style.transform = "scale(1)";
    document.getElementById("btn-login-txt-responsive").style.fontWeight = "normal";

}

export const undisplayAccountPopupResp = () => {

    document.getElementById("credentials-pop-up").style.display = "none";

}

export const displayAccountPopupResp = () => {

    document.getElementById("credentials-pop-up").style.display = "flex";

}

export const undisplayProfileBoxResposive = () => {
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