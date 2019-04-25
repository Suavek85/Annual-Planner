import { view } from "../View";
import * as Progress from "../Progress";
import { mainArray, numberSave } from "../Days";
import { displayEachTaskDay, displaySelectedTaskDay } from "./RenderTasks";

export class Task {
  constructor(type, text) {
    this.type = type;
    this.done = false;
    this.text = text;
    this.g = Math.random();
  }
}

export const addTheTaskDay = () => {
  for (let i = 0; i < mainArray.length; i++) {
    if (mainArray[i].a.includes(numberSave)) {
      let inputTodoDay = document.getElementById("input_list_output").value;
      let types = document.getElementById("todo-type-selected-2").innerHTML;
      const taskObj2 = new Task(types, inputTodoDay);
      mainArray[i].z.push(taskObj2);
      displayEachTaskDay(i);
      Progress.calculateProgress(i);
    }
  }
};

export const taskComepletedDay = () => {
  const allTodos3 = document.getElementsByName("todoscb");
  const allTodos3Array = Array.prototype.slice.call(allTodos3);

  for (let y = 0; y < mainArray.length; y++) {
    if (mainArray[y].a.includes(numberSave)) {
      for (let i = 0; i < allTodos3Array.length; i++) {
        if (allTodos3Array[i].checked == true) {
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
};

export const deleteTaskDay = () => {
  const allTodos2 = document.getElementsByName("todoscb");
  const allTodos2Array = Array.prototype.slice.call(allTodos2);

  for (var y = 0; y < mainArray.length; y++) {
    if (mainArray[y].a.includes(numberSave)) {
      for (let i = 0; i < allTodos2Array.length; i++) {
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
};

const reloadTasksDay = y => {
  removeTodoListDay();
  displayEachTaskDay(y);
  Progress.calculateProgress(y);
};

export const removeTodoListDay = () => {
  const listDay = document.getElementById("task_list_output");
  while (listDay.hasChildNodes()) {
    listDay.removeChild(listDay.firstChild);
  }
};

export const filteringTodos = (currentHtml, currentId) => {
  for (let i = 0; i < mainArray.length; i++) {
    if (mainArray[i].a.includes(numberSave)) {
      if (currentId === "filtered-all") {
        displayEachTaskDay(i);
      } else {
        displaySelectedTaskDay(i, currentHtml);
      }
    }
  }
};

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

  if (currentId.includes("filtered")) {
    removeTodoListDay();
    filteringTodos(currentHtml, currentId);
  }
};
