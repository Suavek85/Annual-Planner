else if (event.target.id === 'btn-login-txt-responsive') {

      const regboxExist = document.getElementById("regbox");

      if (regboxExist) {
        document.getElementById("signorregister_form").removeChild(document.getElementById("signorregister_form").childNodes[0]);
      }

       //remove it from standard view as well in order for server to work

      document.getElementById("signorregister_form").insertAdjacentHTML("afterbegin", logBoxHtml);

      document.getElementById("btn-login-txt-responsive").style.fontWeight = "900";
      document.getElementById("btn-login-txt-responsive").style.transform = "scale(1.1)";
      document.getElementById("btn-register-txt-responsive").style.transform = "scale(1)";
      document.getElementById("btn-register-txt-responsive").style.fontWeight = "normal";

    } 
    
    
    
    
    
    
    else if (event.target.id === 'btn-register-txt-responsive') {

      const logboxExist = document.getElementById("logbox");

      if (logboxExist) {
        console.log("logbox exist");
        document.getElementById("signorregister_form").removeChild(document.getElementById("signorregister_form").childNodes[0]);
      }

      //remove it from standard view as well in order for server to work

      document.getElementById("signorregister_form").insertAdjacentHTML("afterbegin", registerBoxHtml);

      document.getElementById("btn-register-txt-responsive").style.fontWeight = "900";
      document.getElementById("btn-register-txt-responsive").style.transform = "scale(1.1)";
      document.getElementById("btn-login-txt-responsive").style.transform = "scale(1)";
      document.getElementById("btn-login-txt-responsive").style.fontWeight = "normal";

    }



    else if (event.target.id === 'btn-login-txt-responsive') {

        const regboxExist = document.getElementById("regbox");
  
        if (regboxExist) {
          document.getElementById("signorregister_form").removeChild(document.getElementById("signorregister_form").childNodes[0]);
        }
  
         //remove it from standard view as well in order for server to work
  
        document.getElementById("signorregister_form").insertAdjacentHTML("afterbegin", logBoxHtml);
  
        document.getElementById("btn-login-txt-responsive").style.fontWeight = "900";
        document.getElementById("btn-login-txt-responsive").style.transform = "scale(1.1)";
        document.getElementById("btn-register-txt-responsive").style.transform = "scale(1)";
        document.getElementById("btn-register-txt-responsive").style.fontWeight = "normal";
  
      } else if (event.target.id === 'btn-register-txt-responsive') {
  
        ;
  
        if (logboxExist || regboxExist) {
          console.log("logbox exist");
          document.getElementById("signorregister_form").removeChild(document.getElementById("signorregister_form").childNodes[0]);
        }
  
        //remove it from standard view as well in order for server to work
  
        document.getElementById("signorregister_form").insertAdjacentHTML("afterbegin", registerBoxHtml);
  
        document.getElementById("btn-register-txt-responsive").style.fontWeight = "900";
        document.getElementById("btn-register-txt-responsive").style.transform = "scale(1.1)";
        document.getElementById("btn-login-txt-responsive").style.transform = "scale(1)";
        document.getElementById("btn-login-txt-responsive").style.fontWeight = "normal";
  
      }



