import * as Calendar from './modules/Calendar';
import {
  view
} from './modules/View';
import {
  todos,
  mainArray
} from './modules/Todos';
import {
  welcome
} from './modules/Welcome';
import * as Weather from './modules/Weather';
import * as Holidays from './modules/Holidays';
import * as Account from './modules/Account';

let signedIn = false;
let userId;
let closeBtnPreviousIds = [];
let tasksArray = [];
let numberSave;



const updateProfileTodos = () => {

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

    })
}


export class Day {
  constructor(a, f, z) {
    this.a = a;
    this.f = f;
    this.z = z;
  }

  createDayOnCard() {
    const todosListHtml = `
    <div style="flex-basis: 4" id='todolist' class='mynotes-gen'>
    <div style="display: flex; flex-direction: column; min-height: 100px;" id='task_list_output'></div>
    </div>`;
   document.getElementById("notes-box-top").insertAdjacentHTML("afterend", todosListHtml);
   document.getElementById("type-day-icon").src = this.f;
  }

}


export class Task {

  constructor(type, text) {
    this.type = type;
    this.done = false;
    this.text = text;
    this.g = Math.random()
  }

}


//QUICK ADD


const whichMonth = (n) => {

  switch(n) {
    case 0:
    return 'jan';
    break;
    case 1:
    return 'feb';
    break;
    case 2:
    return 'mar';
    break;
    case 3:
    return 'apr';
    break;
    case 4:
    return 'may';
    break;
    case 5:
    return 'jun';
    break;
    case 6:
    return 'jul';
    break;
    case 7:
    return 'aug';
    break;
    case 8:
    return 'sep';
    break;
    case 9:
    return 'oct';
    break;
    case 10:
    return 'nov';
    break;
    case 11:
    return 'dec';
    break;
    default:
    return '#6B5B95';
  }

}

const makeTwoDigit = (no) => {

  if (no < 10) {no = '0' + no;}

return no;

}

const pickRangeDate = () => {


  //GET QUICK-ADD DATES SEPERATELY INTO ARRAY FROM DATE RANGE INPUT FIELD

  const fromDate = document.getElementById("quick-from-date").value;
  const untilDate = document.getElementById("quick-until-date").value;

  const startDate = new Date(fromDate);
  const endDate = new Date(untilDate);


  const getDateArray = (start, end) => {
      const arr = new Array();
      const dt = new Date(start);
      while (dt <= end) {
          arr.push(new Date(dt));
          dt.setDate(dt.getDate() + 1);
      }
      return arr;
  }
  
  const dateArr = getDateArray(startDate, endDate);

  let i, j, h, n;
 

  //CONVERT QUICK-ADD DATES ARRAY TO DATA-ATTRIBUTE DATES ARRAY

  const quickDatesArray =  new Array();

  for (i = 0; i < dateArr.length; i++) { 

    const toDataAttrFormat = `dayname${makeTwoDigit(dateArr[i].getDate())}${whichMonth(dateArr[i].getMonth())}${dateArr[i].getFullYear()}`;

    quickDatesArray.push(toDataAttrFormat);
  
  }



  //EXISTING DAYS - ADD NEW TASK

  for (j = 0; j < quickDatesArray.length; j++) {

    for (h = 0; h < mainArray.length; h++)  {

      if (quickDatesArray[j] == mainArray[h].a) {

        let one = document.getElementById('quick-todo-selected-2').innerHTML;
        let two  = document.getElementById('quick_input_list').value;

        const taskQuick = new Task (one, two);
        mainArray[h].z.push(taskQuick);
        quickDatesArray.splice(j, 1);
        h--;

      }
    }
  }
  
  console.log(quickDatesArray);


  //NEW DAYS - CREATE NEW DAY WITH NEW TASK

  for (n = 0; n < quickDatesArray.length; n++) {

    let temporaryArr = [];
    let one = document.getElementById('quick-todo-selected-2').innerHTML;
    let two  = document.getElementById('quick_input_list').value;
    const taskQuick = new Task(one, two);
    temporaryArr.push(taskQuick);
    let imageicon = 'images/work_icon.png';
    const quickday = new Day (quickDatesArray[n], imageicon, temporaryArr);
    mainArray.push(quickday);
    temporaryArr = [];
   
  }

  Calendar.removeMonthHtml();
  Calendar.loadMonthHtml();


}


//DISPLAYING TODO LIST FROM OBJECTS ARRAY


const removeTodoList = () => {

  const list = document.getElementById("task_list");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }

}

const removeTodoListDay = () => {

  const listDay = document.getElementById("task_list_output");
  while (listDay.hasChildNodes()) {
    listDay.removeChild(listDay.firstChild);
  }

}


const doneTaskStyleCross = (el) => {

  if ( el.done === true ) {

  return 'text-decoration: line-through; color: grey;';

  } else {

    return '';

  }

}


const doneTaskStyleIcon = (el) => {

  if ( el.done === true) {
  
  return 'display: inline-block;';
  
  } else {
  
    return " ";
    
  }
  
}

  

const typeDayIcon = (el) => {

  switch(el.type) {
    case "Home":
    return 'images/home-white.png';
    break;
    case "Sports":
    return 'images/barbell-white.png';
    break;
    case "Shopping":
    return 'images/shopping-white.png';
    break;
    case "Celebration":
    return 'images/celebrate-white.png';
    break;
    case "Learning":
    return 'images/learn-white.png';
    break;
    case "Appointment":
    return 'images/appointment-white.png';
    break;
    case "Health":
    return 'images/health-white.png';
    break;
    default:
    return 'images/home-white.png';
  }

}


const typeDayBackground = (el) => {

  switch(el.type) {
    case "Home":
    return '#6B5B95';
    break;
    case "Sports":
    return '#2E4A62';
    break;
    case "Shopping":
    return '#009B77';
    break;
    case "Celebration":
    return '#BC70A4';
    break;
    case "Learning":
    return '#663399';
    break;
    case "Appointment":
    return '#A9754F';
    break;
    case "Health":
    return '#DC4C46';
    break;
    default:
    return '#6B5B95';
  }

}

const isIndexEven = (value) => {

  if (value % 2 == 0)
      return '#F5F5F5'
  else
      return '#FFFFFF'
}



const displayEachTaskForm = () => {

  const mappedtasksArray = tasksArray.map(el => {

    return  `<input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb"><li style=${doneTaskStyleCross(el)} >${el.text} (${el.type})</li><img src="images/completed.png" alt="logo done" class="icons_done" height="16px" width="16px" style=${doneTaskStyleIcon(el)}><br>`

    }
  )

  const joinmappedtasksArray = mappedtasksArray.join("");

  document.getElementById("task_list").insertAdjacentHTML('afterbegin', joinmappedtasksArray);

}




const displayEachTaskDay = (i) => {

  const mappedtasksArrayDay = mainArray[i].z.map( (el, ind) => {

    return `
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;background-color:${isIndexEven(ind)}">

    <div style="display: flex; flex-direction: row; align-items: center;" >

    <div style="display: inline-block; width: 50px; height: 50px; background-color: ${typeDayBackground(el)}; margin-right: 10px;">
    <img src=${typeDayIcon(el)} style='width:38px; height: 38px; padding: 5px;'>
    </div>
    
    <div style="${doneTaskStyleCross(el)}" >${el.text}
    </div>

    <img src="images/completed.png" alt="logo done" class="icons_done" margin-left="12px" height="30px" width="30px" style="${doneTaskStyleIcon(el)}">

    </div>

    <div style="display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; background-color: #E8E8E8;">

    <input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb">

    </div>

    </div>

    `
    }
  )

  const joinmappedtasksArrayDay = mappedtasksArrayDay.join("");

  document.getElementById("task_list_output").insertAdjacentHTML('afterbegin', joinmappedtasksArrayDay);

}



const displaySelectedTaskDay = (i, filteredType) => {

  const mappedArraySelectedDay = mainArray[i].z.map( (el, ind) => {

    if (el.type == filteredType) {
      
      return `
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;background-color:${isIndexEven(ind)}">

      <div style="display: flex; flex-direction: row; align-items: center;" >

      <div style="display: inline-block; width: 50px; height: 50px; background-color: ${typeDayBackground(el)}; margin-right: 10px;">
      <img src=${typeDayIcon(el)} style='width:38px; height: 38px; padding: 5px;'>
      </div>
      
      <div style="${doneTaskStyleCross(el)}" >${el.text}
      </div>

      <img src="images/completed.png" alt="logo done" class="icons_done" margin-left="12px" height="30px" width="30px" style="${doneTaskStyleIcon(el)}">

      </div>

      <div style="display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; background-color: #E8E8E8;">

      <input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb">

      </div>

      </div>

      `

      } else {

      return;

      }

    }
  )

  const joinmappedtasksArrayDay3 = mappedArraySelectedDay.join("");

  document.getElementById("task_list_output").insertAdjacentHTML('afterbegin', joinmappedtasksArrayDay3);

}









//CLICK EVENT LISTENER

document.addEventListener(
  "click",
  event => {

    const dayNameAttribute = event.target.getAttribute("day-name");
    let dayIndex;
    let dayIndexforOpen;
    const currentId = event.target.id;

    //SUBMIT NEW DAY

    if (event.target.id.includes("submit_")) {

      view.undisplayForm();
      view.displayCalendar();
      view.displayWelcome();
      const typeOfDay = view.takeTypeOfDay();
      const dayfull = new Day(dayNameAttribute, typeOfDay, tasksArray);
      mainArray.push(dayfull);
      console.log(mainArray);
      todos.countAllTodos();
      tasksArray = [];
     
      dayIndex = mainArray.findIndex(element => {
        return element.a === event.target.getAttribute("day-name");
      });

      view.removeSubmitButton();
      view.clearTodo();

      if (signedIn) {
        updateProfileTodos();
      }


    //ADD DAY OR OPEN DAY


    } else if (event.target.id.includes("calendar")) {

      view.undisplayCalendar();


      if (!event.target.style.borderRadius) {

        view.displayForm();
        view.undisplayWelcome();
        const numberAdd = event.target.id.slice(-9);

        view.displaySubmitButton(numberAdd);
        const elementStyle = event.target.style;
        view.createGreenCircle(elementStyle);

        const b = " ";
        const currentDate = [currentId.slice(8, 10), b, currentId.slice(10, 11).toUpperCase(), currentId.slice(11, 13), b, currentId.slice(13)].join('');
        closeBtnPreviousIds.push(currentId);
      
      } 
      
      else {

        view.displayDay();
        view.undisplayForm();
        view.undisplayWelcome();
        todos.countAllTodos();
        numberSave = event.target.id.slice(-9);
        view.displaySaveExitButton(numberSave);
        const c = " ";
        const currentDate2 = [event.target.id.slice(8, 10), c, event.target.id.slice(10, 11).toUpperCase(), event.target.id.slice(11, 13), c, event.target.id.slice(13)].join('');
        document.getElementById("notes-box-top-right-text").innerHTML = currentDate2;

        dayIndexforOpen = mainArray.findIndex(element => {
          return element.a === event.target.getAttribute("day-name");
        });

        mainArray[dayIndexforOpen].createDayOnCard();


        for (var i = 0; i < mainArray.length; i++) {

        if (mainArray[i].a.includes(numberSave)) {

          displayEachTaskDay(i);
          view.calculateProgress(i);
          
          }
        }

        document.getElementById("input_list_output").value = '';

      }

    } 
    
    //CLOSE DAY
    
    else if (event.target.id.includes("close-day")) {

      //dayIndex = mainArray.findIndex(element => {
        //return element.a === dayNameAttribute;
      //});

      //mainArray[dayIndex].updateDay();

      if (signedIn) {
        updateProfileTodos();
      }

      todos.countAllTodos();
      view.displayCalendar();
      view.displayWelcome();
      view.undisplayDay();
      view.todoListRemove();
      view.clearProgress();

    } 
    
    //CLOSE FORM

    else if (event.target.id.includes("close-form")) {

      view.displayCalendar();

      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.borderRadius = null;
      document.getElementById(`${closeBtnPreviousIds[closeBtnPreviousIds.length - 1]}`).style.backgroundColor = null;

      view.displayWelcome();
      view.undisplayForm();
      view.removeSubmitButton();

    } 
    
    //DELETE TASK - FORM
    
    else if (event.target.id.includes("delete_todo_form")) {

    
      const allTodos = document.getElementsByName("todoscb");

      for (let i = 0, length = allTodos.length - 1; i <= length; i++) {
        
        if (allTodos[i].checked) {

          for (var p = 0; p < tasksArray.length; p++) {

            if (tasksArray[p].g == allTodos[i].value) {

              tasksArray.splice(p, 1);
              p--;

            }

          }

        }

      }

      removeTodoList();
      displayEachTaskForm();

    } 

    //DELETE TASK - DAY
    
    else if (event.target.id.includes("delete_output")) {

    
      var allTodos2 = document.getElementsByName("todoscb");

      var allTodos2Array = Array.prototype.slice.call(allTodos2);


      for (var y = 0; y < mainArray.length; y++) {

        if (mainArray[y].a.includes(numberSave)) {

          for (let i = 0;  i < allTodos2Array.length; i++) {

            if (allTodos2Array[i].checked) {

              for (var p = 0; p < mainArray[y].z.length; p++) {

                if (mainArray[y].z[p].g == allTodos2Array[i].value) {

                  mainArray[y].z.splice(p, 1);
                  p--;

                }

              }

            }

          }

          removeTodoListDay();
          displayEachTaskDay(y);
          view.calculateProgress(y);

        }

      }

    }
    
    //TASK COMPLETED - DAY
    
    else if (event.target.id.includes("completed")) {


      var allTodos3 = document.getElementsByName("todoscb");

      var allTodos3Array = Array.prototype.slice.call(allTodos3);

   
      for (let y = 0; y < mainArray.length; y++) {

        if (mainArray[y].a.includes(numberSave)) {

          for (let i = 0;  i < allTodos3Array.length; i++) {
           
            if ( allTodos3Array[i].checked == true ) {

              for (var p = 0; p < mainArray[y].z.length; p++) {

                if (mainArray[y].z[p].g == allTodos3Array[i].value) {

                  mainArray[y].z[p].done = true;
                
                }

              }

            } 

          }

          removeTodoListDay();
          displayEachTaskDay(y);
          view.calculateProgress(y);

        }

      }

    } 
    
    //ADD TASK - FORM

    else if (event.target.id.includes("enter")) {


      if (todos.inputLength(todos.input_todo_form()) > 0) {

        removeTodoList();
        let inputTodoForm = document.getElementById("input_list").value;
        let typesTodo = document.getElementById("todo-type-selected").innerHTML;
        const taskObj = new Task(typesTodo, inputTodoForm);
        tasksArray.push(taskObj);
        displayEachTaskForm();
        document.getElementById("input_list").value = '';
        document.getElementById("delete_todo_form").style.display = "block";

      }

    } 
    
    //ADD TASK - DAY
    
    else if (event.target.id.includes("add")) {


      if (todos.inputLength(todos.input_todo_day()) > 0) {


        removeTodoListDay();
      
        for (var i = 0; i < mainArray.length; i++) {

          if (mainArray[i].a.includes(numberSave)) {

            let inputTodoDay = document.getElementById("input_list_output").value;
            let types = document.getElementById("todo-type-selected-2").innerHTML;
            const taskObj2 = new Task(types, inputTodoDay);
            mainArray[i].z.push(taskObj2);
            displayEachTaskDay(i);
            view.calculateProgress(i);
           
          }
        }

        document.getElementById("input_list_output").value = '';

      }
    }

    //TOGGLE SHOWING MORE BANK HOLS

    else if (event.target.id === "expand-holidays") {

      var showMoreHols = document.getElementById("collapsible_holidays");

      if (showMoreHols.style.display === "block") {

        document.getElementById("collapsible_holidays").style.display = 'none';
        event.target.src = "images/expand.png";

      } else {
        document.getElementById("collapsible_holidays").style.display = 'block';
        event.target.src = "images/collapse.png";

      }
    }

    //TOGGLE SHOWING MORE WEATHER - DESKTOP

    else if (event.target.id === 'showmore-weather') {

      const showMoreWeather = document.getElementById("collapsible_weather");
      

      if (showMoreWeather.style.transform == "scaleY(1)") {
        showMoreWeather.style.transform = "scaleY(0)";
        event.target.src = "images/expand.png";
      } else {
        showMoreWeather.style.transform = "scaleY(1)";
        event.target.src = "images/collapse.png";
      }
      
    }

    //DISPLAY NEXT MONTH

    else if (event.target.id === "nextarrow") {
      Calendar.newMonthsForward();
    }

    //DISPLAY PREVIOUS MONTH

    else if (event.target.id === "backarrow") {
      Calendar.newMonthsBackward();
    }


    //TOGGLE DISPLAYING DESKTOP REGISTER SECTION

    else if (event.target.id === "btn-register-txt") {


      if (document.getElementById('register-wrapper').style.display === "none") {

        document.getElementById('register-wrapper').style.display = "flex";

        Account.insertRegisterWrapperDesktop();


        if (document.getElementById("login-wrapper").style.display === "flex") {
          document.getElementById("login-wrapper").removeChild(document.getElementById("login-wrapper").childNodes[0]);
          document.getElementById("login-wrapper").style.display = "none";
        }

      } else {

        document.getElementById("register-wrapper").removeChild(document.getElementById("register-wrapper").childNodes[0]);
        document.getElementById("register-wrapper").style.display = "none";
      }
    }



    //ON REGISTER BUTTON
    else if (event.target.id === "register-button") {

      view.removeRegisterWarning();
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
            Calendar.removeMonthHtml();
            Calendar.loadCurrentYear();
            Calendar.loadCurrentMonthHtml();
            console.log(mainArray);
            todos.countAllTodos();
            document.getElementById("btn-login-txt").innerHTML = 'Sign out';
            Account.removeRegisterWrapperDesktop();
            document.getElementById("top-welcome-message").innerHTML = `${nameRegister}`;

          }

          todos.countAllTodos();

        })

    }

    //TOGGLE DISPLAYING SIGN IN SECTION

    else if (event.target.id === "btn-login-txt") {

      if (event.target.innerHTML === 'Sign out') {

        signedIn = false;
        mainArray.splice(0, mainArray.length);
        Calendar.removeMonthHtml();
        Calendar.loadCurrentYear();
        Calendar.loadCurrentMonthHtml();
        todos.countAllTodos();
        view.displayHelloGuest();

        event.target.innerHTML = "Sign in";
      } else {

        if (document.getElementById('login-wrapper').style.display === "none") {

          document.getElementById("login-wrapper").style.display = "flex";
          Account.insertLoginWrapperDesktop();

          if (document.getElementById("register-wrapper").style.display === "flex") {
            Account.removeRegisterWrapperDesktop();
          }

        } else {

          Account.removeLoginWrapperDesktop();

        }

      }

    }


    //ON SIGN IN BUTTON

    else if (event.target.id === "signin-button") {

      view.removeSigninWarning();
      view.displayLoading();

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

            console.log(data);

            view.removeSigninWarning();
            signedIn = true;
            userId = data.id;
            mainArray.splice(0, mainArray.length);
            const nameSignin = data.name;

            if (data.entries.length > 0) {

              for (let i = 0; i < data.entries.length; i++) {

                const savedDayFull = new Day(data.entries[i].a, data.entries[i].f,  data.entries[i].z);

                console.log(savedDayFull);

                mainArray.push(savedDayFull);

              }
              todos.countAllTodos();
            }

            Calendar.removeMonthHtml();
            Calendar.loadCurrentYear();
            Calendar.loadCurrentMonthHtml();

            document.getElementById("login-wrapper").removeChild(document.getElementById("login-wrapper").childNodes[0]);
            document.getElementById("login-wrapper").style.display = "none";

            view.displaySignOut();
            document.getElementById("top-welcome-message").innerHTML = `${nameSignin}!`;


          } else {

            view.removeSigninWarning();
            view.displayWrongCredentials();

          }

        })

    }

    //ON BACKGROUND CLICK

    else if (event.target.id === "main_pic") {

      if (document.getElementById('login-wrapper').style.display === "flex") {

        Account.removeLoginWrapperDesktop();


      } else if (document.getElementById('register-wrapper').style.display === "flex") {

        Account.removeRegisterWrapperDesktop();

      }

    }


    //SHOW WEATHER RESPONSIVE

    else if (event.target.id === "showmore-weather-resp-icon" || event.target.id === "showmore-weather-resp-text") {

      document.getElementById("collapsible_weather_responsive").style.display = "flex";

    }

    //CLOSE WEATHER RESPONSIVE

    else if (event.target.id === "collapsible_weather_close") {

      document.getElementById("collapsible_weather_responsive").style.display = "none";

    }

    //SHOW HOLIDAYS RESPONSIVE

    else if (event.target.id === "expand-holidays-resp-logo" || event.target.id === "expand-holidays-resp-text") {
      document.getElementById("collapsible_holidays_responsive").style.display = "flex";

    }

    //CLOSE HOLIDAYS RESPOSIVE
    else if (event.target.id === "collapsible_holidays_responsive_close") {

      document.getElementById("collapsible_holidays_responsive").style.display = "none";
    }

    //ON ACCOUNT DIV CLOSE CLICK - RESPONSIVE

    else if (event.target.id === "credentials-pop-up-close") {

      Account.undisplayAccountPopupResp();
      Account.removeLogbox();
      Account.removeRegisterBox();


    }

    //ON ACCOUNT DIV CLICK - RESPONSIVE

    else if (event.target.id === 'credentials-wrapper-icon' || event.target.id === 'credentials-wrapper-text') {

      document.getElementById("credentials-pop-up").style.display = "flex";
      Account.removeLogbox();
      Account.insertLogBox();
      Account.focusSigninResponsive();
      Account.unfocusRegisterResponsive();

    }

    //ON SIGN IN CLICK - RESPONSIVE

    else if (event.target.id === 'btn-login-txt-responsive') {

      Account.removeLogbox();
      Account.removeRegisterBox();
      Account.insertLogBox();
      Account.focusSigninResponsive();
      Account.unfocusRegisterResponsive();

    }

    //ON REGISTER CLICK - RESPONSIVE

    else if (event.target.id === 'btn-register-txt-responsive') {

      Account.removeLogbox();
      Account.removeRegisterBox();
      Account.insertRegisterBox();
      Account.focusRegisterResponsive();
      Account.unfocusSigninResponsive();
      todos.countAllTodos();

    }


    //ON STATS CLICK

    else if (event.target.id === 'stats_main_logo' || event.target.id === 'stats_main_text') {

      document.getElementById("stats-main").style.display = 'flex';
      todos.countAllTodos();
      document.getElementById("calendar-main").style.display = 'none'

    }

    //CLOSE STATS

    else if (event.target.id === 'close_stats') {

      document.getElementById("stats-main").style.display = 'none';
      document.getElementById("calendar-main").style.display = 'grid'
    }

    //TOGGLE FORM DROPDOWN MENU

    else if (event.target.id === 'btn-form-dropdown') {
      document.getElementById("myDropdown").classList.toggle("show");
    }

    //ON DROPDOWN ITEM CLICK - FORM

    else if (event.target.id.includes("drop-down-"))  {

      document.getElementById("todo-type-selected").innerHTML = event.target.innerHTML;
      document.getElementById("myDropdown").classList.toggle("show");
    }

    //TOGGLE DAY DROPDOWN MENU

    else if (event.target.id === 'todo-day-dropdown-area' || event.target.id === 'todo-day-dropdown-area-2' ) {
      document.getElementById("myDropdown-2").classList.toggle("show");
    }

    //ON DROPDOWN ITEM CLICK - DAY

    else if (event.target.id.includes("day-down"))  {

      document.getElementById("todo-type-selected-2").innerHTML = event.target.innerHTML;
      document.getElementById("myDropdown-2").classList.toggle("show");
    }

    //FILTERING

    else if (event.target.id.includes('filtered')) {

      let filteredType = event.target.innerHTML;

      removeTodoListDay();
      
      for (var i = 0; i < mainArray.length; i++) {

        if (mainArray[i].a.includes(numberSave)) {

          if (event.target.id === "filtered-all" ) {

            displayEachTaskDay(i);

          } else {

            displaySelectedTaskDay(i, filteredType);

          }
          
        }
      }

    }

// QUICK ADD


//CHOOSE QUICK ADD FORM


else if (event.target.id === "fast-increase")  {
  document.getElementById("calendar-main").style.display = 'none';
  document.getElementById("quick-add-form-wrapper").style.display = "flex";
}


//SELECT TODO TYPE DROPDOWN

else if (event.target.id == 'quick-dropdown-area' || event.target.id == 'quick-drp-inside')

{

  if ( document.getElementById("quick-drp-list-2").style.display == "none") {

    document.getElementById("quick-drp-list-2").style.display = "block";

  }  

  else {

    document.getElementById("quick-drp-list-2").style.display = "none";

  }

}

//SELECT TODO TYPE

else if (event.target.id.includes("qck"))  {

  document.getElementById("quick-todo-selected-2").innerHTML = event.target.innerHTML;
  document.getElementById("quick-drp-list-2").style.display = "none";
}

//CLOSE QUICK ADD FORM

else if (event.target.id.includes("btn-close-quick"))  {

  document.getElementById("quick-add-form-wrapper").style.display = "none";
  document.getElementById("calendar-main").style.display = 'grid';
}

//SUBMIT

else if (event.target.id == 'btn-sbn-quick') {

  const inputQuickTask = document.getElementById('quick_input_list').value;

  if (inputQuickTask) {
    
    pickRangeDate();

    document.getElementById("quick-add-form-wrapper").style.display = "none";
    document.getElementById("calendar-main").style.display = 'grid';

    } else {

    console.log('empty input field');

    }

  }



  },
  false
);

//ON WINDOW LOAD

window.onload = function () {
  Calendar.loadCurrentYear();
  Calendar.loadCurrentMonthHtml();
  Holidays.updateNextHolidays()
  Weather.locationWeather();
  welcome.nowTime();
  todos.countAllTodos();
};