import { view } from '../View';
import { Task } from './TasksDay';
import { tasksArray } from '../Days';
import {
  doneTaskStyleIcon,
  doneTaskStyleCross
} from './TasksStyle'
  
export const addTheTaskForm = () => {
  
    let inputTodoForm = document.getElementById("input_list").value;
    let typesTodo = document.getElementById("todo-type-selected").innerHTML;
    const taskObj = new Task(typesTodo, inputTodoForm);
    tasksArray.push(taskObj);
    displayEachTaskForm();
  
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
      
     
      
export const displayEachTaskForm = () => {
      
    const mappedtasksArray = tasksArray.map(el => {
      
        return  `<input type="checkbox" id="checkbox_todo" value="${el.g}" name="todoscb"><li style=${doneTaskStyleCross(el)} >${el.text} (${el.type})</li><img src="images/completed.png" alt="logo done" class="icons_done" height="16px" width="16px" style=${doneTaskStyleIcon(el)}><br>`
      
        }
    )
      
    const joinmappedtasksArray = mappedtasksArray.join("");
      
    document.getElementById("task_list").insertAdjacentHTML('afterbegin', joinmappedtasksArray);
      
}
      
      

//EVENT LISTENER
    
export const handlingTasksRenderingForm = (currentId) => {
    
        //DELETE TASK - FORM
            
        if (currentId.includes("delete_todo_form")) {
    
          deleteTaskForm();
          removeTodoList();
          displayEachTaskForm();
    
        } 
        
        //ADD TASK - FORM
    
        if (currentId.includes("enter")) {
    
          if (document.getElementById("input_list").value.length > 0) {
    
            removeTodoList();
            addTheTaskForm();
            view.emptyInputForm();
            view.displayDeleteForm();
    
        }
    } 
}