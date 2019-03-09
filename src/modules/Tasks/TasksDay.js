import { view } from '../View';
import * as Progress from '../Progress';
import {
    mainArray,
    numberSave
} from '../Days';

import {
  isIndexEven,
  typeDayBackground,
  typeDayIcon,
  doneTaskStyleIcon,
  doneTaskStyleCross
} from './TasksStyle'


export class Task {

    constructor(type, text) {
      this.type = type;
      this.done = false;
      this.text = text;
      this.g = Math.random()
    }
}
  
  
export const addTheTaskDay = () => {
  
    for (var i = 0; i < mainArray.length; i++) {
      
      if (mainArray[i].a.includes(numberSave)) {
       
        let inputTodoDay = document.getElementById("input_list_output").value;
        let types = document.getElementById("todo-type-selected-2").innerHTML;
        const taskObj2 = new Task(types, inputTodoDay);
        mainArray[i].z.push(taskObj2);
        displayEachTaskDay(i);
        Progress.calculateProgress(i);
       
      }
    }
  }
        
  
  export const taskComepletedDay = () => {
  
      const allTodos3 = document.getElementsByName("todoscb");
      const allTodos3Array = Array.prototype.slice.call(allTodos3);
    
       
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
              reloadTasksDay(y);
            }
          }
    }
    
    
    
    export const deleteTaskDay = () => {
    
      const allTodos2 = document.getElementsByName("todoscb");
    
      const allTodos2Array = Array.prototype.slice.call(allTodos2);
    
    
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
          reloadTasksDay(y);
        }
      }
    }

    const reloadTasksDay = (y) => {

      removeTodoListDay();
      displayEachTaskDay(y);
      Progress.calculateProgress(y);

    }

      
      export const removeTodoListDay = () => {
      
        const listDay = document.getElementById("task_list_output");
        while (listDay.hasChildNodes()) {
          listDay.removeChild(listDay.firstChild);
        }
      }
      
      /*
      
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
      */
      
    
      export const displayEachTaskDay = (i) => {
      
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
      
      
      
      const displaySelectedTaskDay = (i, currentHtml) => {
      
        const mappedArraySelectedDay = mainArray[i].z.map( (el, ind) => {
      
          if (el.type == currentHtml) {
            
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
    
    
    
      export const filteringTodos = (currentHtml, currentId) => {
    
        for (var i = 0; i < mainArray.length; i++) {
    
          if (mainArray[i].a.includes(numberSave)) {
    
            if (currentId === "filtered-all" ) {
    
              displayEachTaskDay(i);
    
            } else {
    
              displaySelectedTaskDay(i, currentHtml);
    
            }
          }
        }
      }
    
    

    //EVENT LISTENER
    
    export const handlingTasksRendering = (currentId, currentHtml) => {
    
        //DELETE TASK - DAY
    
        if (currentId.includes("delete_output")) {
    
          deleteTaskDay();
        }
    
        //TASK COMPLETED - DAY
    
        if (currentId.includes("completed")) {
    
          taskComepletedDay();
    
        } 
    

        //ADD TASK - DAY
    
        if (currentId.includes("add")) {
    
          if (document.getElementById("input_list_output").value.length > 0) {
    
            removeTodoListDay();
            addTheTaskDay();
            view.emptyInputDay();   
          }
        }
    
        //FILTERING
    
        if (currentId.includes('filtered')) {
        
          removeTodoListDay();
          filteringTodos(currentHtml, currentId);
    
        }
    }