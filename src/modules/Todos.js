import {
  view
} from './View';

import * as Account from './Account';
import * as Calendar from './Calendar';

export let mainArray = [];
export let tasksArray = [];
let signedIn = false;
let userId;


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

  updateDay() {

    this.f = document.getElementById("type-day-icon").src;
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


export const todos = {

    input_todo_form: function() {
      return document.getElementById("input_list");
    },
  
    input_todo_day: function() {
      return document.getElementById("input_list_output");
    },
  
    ul_tasks: function() {
      return document.getElementById("task_list");
    },
  
    ul_tasks_day: function() {
      return document.getElementById("task_list_output");
    },
  
    inputLength: function(element) {
      return element.value.length;
    },


    googChart: function(done, all, intro) {

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
        
        
      function drawChart() {
          var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Done', done],
          ['Not completed', all - done]
        ]);
        
          
      var options = {
      title: intro, 
      titleTextStyle: { 
        fontSize: 24,
        bold: true
      },
       width:450, 
       height:300,
       is3D: true,
        fontName: 'Montserrat',
        colors:['orange','#A4A4A4'],
        fontSize: 16,
        legend: {
          position: 'right',
          alignment: 'center',
          textStyle: { color: 'black' }
        }
      
      };
        
          
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
          chart.draw(data, options);

      }
    },

  
    countAllTodos: function() {
      
      let todosDone = 0;
      let todosAll = 0;
      
      for (let i = 0; i < mainArray.length; i++) {

        for (let j = 0; j < mainArray[i].z.length; j++) {

        todosAll = todosAll + 1;    

        }

        for (let h = 0; h < mainArray[i].z.length; h++) {

              if (mainArray[i].z[h].done == true) {

              todosDone = todosDone + 1;

              }
  
          }

        if (todosDone == 0 && todosAll == 0 ) {

          document.getElementById('tooltip_statistics').innerHTML = "You've no outstanding tasks.";
          document.getElementById('outstanding_tasks').innerHTML = "You've no outstanding tasks.";

        } 
        
        else {

          document.getElementById('outstanding_tasks').innerHTML = "";
          document.getElementById('tooltip_statistics').innerHTML = todosDone + " out of " + todosAll + " tasks done.";
  
          const introStatsInfo = todosDone + " out of " + todosAll + " tasks done."

          this.googChart(todosDone, todosAll, introStatsInfo);
          
        }
      }
    },
  };


export const submitTheNewDay = (dayNameAttribute) => {

  const typeOfDay = view.takeTypeOfDay();
  const dayfull = new Day(dayNameAttribute, typeOfDay, tasksArray);
  mainArray.push(dayfull);
  todos.countAllTodos();
  tasksArray = [];
}

export const openTheDay = (numberSave, dayNameAttribute) => {

  let dayIndexforOpen = mainArray.findIndex(element => {
    return element.a === dayNameAttribute;
  });

  mainArray[dayIndexforOpen].createDayOnCard();

  for (var i = 0; i < mainArray.length; i++) {

  if (mainArray[i].a.includes(numberSave)) {

    displayEachTaskDay(i);
    view.calculateProgress(i);
    
    }
  }
}
  

export const updateTheDay = (dayNameAttribute) => {

  let dayIndex = mainArray.findIndex(element => {
    return element.a === dayNameAttribute;
  });

  mainArray[dayIndex].updateDay();
}



export const addTheTaskForm = () => {

  let inputTodoForm = document.getElementById("input_list").value;
  let typesTodo = document.getElementById("todo-type-selected").innerHTML;
  const taskObj = new Task(typesTodo, inputTodoForm);
  tasksArray.push(taskObj);
  displayEachTaskForm();

}


export const addTheTaskDay = (numberSave) => {

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
}
      

  export const taskComepletedDay = (numberSave) => {


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
  
  
  
  
  export const deleteTaskDay = (numberSave) => {
  
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
  
  
  
  
  export const deleteTaskForm = () => {
  
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
  }
  
  
  export const removeTodoList = () => {
  
    const list = document.getElementById("task_list");
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  }
  
  export const removeTodoListDay = () => {
  
    const listDay = document.getElementById("task_list_output");
    while (listDay.hasChildNodes()) {
      listDay.removeChild(listDay.firstChild);
    }
  }
  
  
  export const doneTaskStyleCross = (el) => {
  
    if ( el.done === true ) {
  
    return 'text-decoration: line-through; color: grey;';
  
    } else {
  
      return '';
  
    }
  }
  
  
  export const doneTaskStyleIcon = (el) => {
  
    if ( el.done === true) {
    return 'display: inline-block;';
    } 
    
    else {
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
  
  
  
  export const displayEachTaskForm = () => {
  
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
  
      <div style="display: inline-block; width: 45px; height: 45px; background-color: ${typeDayBackground(el)}; margin: 5px 10px 5px 5px;">
      <img src=${typeDayIcon(el)} style='width:35px; height: 35px; padding: 5px;'>
      </div>
      
      <div style="${doneTaskStyleCross(el)}" >${el.text}
      </div>
  
      <img src="images/completed.png" alt="logo done" class="icons_done" margin-left="12px" height="30px" width="30px" style="${doneTaskStyleIcon(el)}">
  
      </div>
  
      <div style="display: flex; align-items: center; justify-content: center; width: 60px; height: 55px; background-color: #E8E8E8;">
  
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
    
        <div style="display: inline-block; width: 45px; height: 45px; background-color: ${typeDayBackground(el)}; margin: 5px 10px 5px 5px;">
        <img src=${typeDayIcon(el)} style='width:35px; height: 35px; padding: 5px;'>
        </div>
        
        <div style="${doneTaskStyleCross(el)}" >${el.text}
        </div>
    
        <img src="images/completed.png" alt="logo done" class="icons_done" margin-left="12px" height="30px" width="30px" style="${doneTaskStyleIcon(el)}">
    
        </div>
    
        <div style="display: flex; align-items: center; justify-content: center; width: 60px; height: 55px; background-color: #E8E8E8;">
    
        <input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb">
    
        </div>
    
        </div>
    
        `
  
        } 
        
      else {
  
        return;
  
        }
      }
    )
  
    const joinmappedtasksArrayDay3 = mappedArraySelectedDay.join("");
  
    document.getElementById("task_list_output").insertAdjacentHTML('afterbegin', joinmappedtasksArrayDay3);
  
  }



  export const filteringTodos = (filteredType, filteredId, numberSave) => {

    for (var i = 0; i < mainArray.length; i++) {

      if (mainArray[i].a.includes(numberSave)) {

        if (filteredId === "filtered-all" ) {

          displayEachTaskDay(i);

        } else {

          displaySelectedTaskDay(i, filteredType);

        }
      }
    }
  }



  export const updateProfileTodos = () => {

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




 export const onRegisterButton = () => {

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
        todos.countAllTodos();
        document.getElementById("btn-login-txt").innerHTML = 'Sign out';
        Account.removeRegisterWrapperDesktop();
        Account.undisplayAccountPopupResp();
        document.getElementById("top-welcome-message").innerHTML = `${nameRegister}`;

      }

      todos.countAllTodos();

    })

 }



 export const onSignInButton = () => {

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

            mainArray.push(savedDayFull);

          }
          todos.countAllTodos();
        }

        Calendar.removeMonthHtml();
        Calendar.loadCurrentYear();
        Calendar.loadCurrentMonthHtml();
        Account.removeLoginWrapperDesktop();
        Account.undisplayAccountPopupResp();
        view.displaySignOut();
        document.getElementById("top-welcome-message").innerHTML = `${nameSignin}!`;

      } 
      
      else {
        view.removeSigninWarning();
        view.displayWrongCredentials();
      }

    }
    )
 }


 export const onSignOut = () => {

  signedIn = false;
  mainArray.splice(0, mainArray.length);
  Calendar.removeMonthHtml();
  Calendar.loadCurrentYear();
  Calendar.loadCurrentMonthHtml();
  todos.countAllTodos();
  view.displayHelloGuest();
  
 }

        

      
      

      
  
  
  