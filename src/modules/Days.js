import { view } from './View';
import { displayEachTaskDay } from './Tasks/RenderTasks';
import * as Progress from './Progress';
import * as Stats from './Stats';
import * as SignRegister from './SignRegister';

export let mainArray = [];
export let tasksArray = [];
export let numberSave;
let closeBtnPreviousIds = [];


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


const submitTheNewDay = (dayNameAttribute) => {

  const typeOfDay = view.takeTypeOfDay();
  const dayfull = new Day ( dayNameAttribute, typeOfDay, tasksArray );
  mainArray.push(dayfull);
  Stats.countAllTodos();
  tasksArray = [];
}

const openTheDay = (dayNameAttribute) => {

  let dayIndexforOpen = mainArray.findIndex(element => {
    return element.a === dayNameAttribute;
  });

  mainArray[dayIndexforOpen].createDayOnCard();

  for (var i = 0; i < mainArray.length; i++) {

  if (mainArray[i].a.includes(numberSave)) {

    displayEachTaskDay(i);
    Progress.calculateProgress(i);
    
    }
  }
}
  

const updateTheDay = (dayNameAttribute) => {

  let dayIndex = mainArray.findIndex(element => {
    return element.a === dayNameAttribute;
  });
  
  mainArray[dayIndex].updateDay();
}


const displaySaveExitButton = () => {
      
    let saveexitBtnGen = `<div day-name="dayname${numberSave}" class='close-save' id='close-day-${numberSave}'>Close</div>`
    document.getElementById("close-day-wrapper").insertAdjacentHTML('afterbegin', saveexitBtnGen);
}


export const renderingDayandFormBoxClick = (currentId, currentStyle, dayNameAttribute) => {

//SUBMIT NEW DAY

if (currentId.includes("submit_")) {

  view.undisplayForm();
  view.displayCalendar();
  view.displayWelcome();
  submitTheNewDay(dayNameAttribute);
  view.removeSubmitButton();
  view.clearTodo();
  SignRegister.updateProfileTodos();

} 


//ADD DAY OR OPEN DAY

if (currentId.includes("calendar")) {

    view.undisplayCalendar();

    if (!currentStyle.borderRadius) {

      view.displayForm();
      view.undisplayWelcome();
      const numberAdd = currentId.slice(-9);
      view.displaySubmitButton(numberAdd);
      view.createGreenCircle(currentStyle);
      closeBtnPreviousIds.push(currentId);
    
    } 
    
    else {

      view.displayDay();
      view.undisplayWelcome();
      view.undisplayForm();
      Stats.countAllTodos();
      numberSave = currentId.slice(-9);
      displaySaveExitButton(numberSave);
      view.calcDateforDay(currentId)
      openTheDay( dayNameAttribute);  
      view.clearInputFieldDay();

    }

  } 

  //CLOSE DAY

  if (currentId.includes("close-day")) {

    updateTheDay(dayNameAttribute);
    SignRegister.updateProfileTodos();
    Stats.countAllTodos();
    view.displayCalendar();
    view.displayWelcome();
    view.undisplayDay();
    view.todoListRemove();
    Progress.clearProgress();

  } 

  //CLOSE FORM

  if (currentId.includes("close-form")) {

    view.displayCalendar();
    view.clearTodo();
    view.removeGreenCircle(closeBtnPreviousIds);
    view.displayWelcome();
    view.undisplayForm();
    view.removeSubmitButton();
    
  } 
}


  

  