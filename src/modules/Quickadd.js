import { Task } from './Tasks/TasksDay';
import { Day , mainArray } from './Days';
import * as Calendar from './Calendar';
import * as Stats from './Stats';
import { view } from './View';


//QUICK ADD

const whichMonth = (n) => {

  const shortMonthArr = [
      {no: 0, short: 'jan'},
      {no: 1, short: 'feb'},
      {no: 2, short: 'mar'},
      {no: 3, short: 'apr'},
      {no: 4, short: 'may'},
      {no: 5, short: 'jun'},
      {no: 6, short: 'jul'},
      {no: 7, short: 'aug'},
      {no: 8, short: 'sep'},
      {no: 9, short: 'oct'},
      {no: 10, short: 'nov'},
      {no: 11, short: 'dec'}
  ]

    for (let i = 0; i < shortMonthArr.length; i++) { 
      
      if (n == shortMonthArr[i].no) {
      return shortMonthArr[i].short;
      }
    }
}
  
  const makeTwoDigit = (no) => {
    if (no < 10) {
      no = '0' + no;
    }
    return no;
  }
  
  export const daysFromDateRange = () => {
  
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
  
    //CONVERT QUICK-ADD DATES ARRAY TO DATA-ATTRIBUTE DATES ARRAY
  
    const quickDatesArray =  new Array();
  
    for (let i = 0; i < dateArr.length; i++) { 
  
      const toDataAttrFormat = `dayname${makeTwoDigit(dateArr[i].getDate())}${whichMonth(dateArr[i].getMonth())}${dateArr[i].getFullYear()}`;
  
      quickDatesArray.push(toDataAttrFormat);
    
    }
  
  
    //EXISTING DAYS - ADD NEW TASK
  
    for (let j = 0; j < quickDatesArray.length; j++) {
  
      for (let h = 0; h < mainArray.length; h++)  {
  
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
    
  
    //NEW DAYS - CREATE NEW DAY WITH NEW TASK
  
    for (let n = 0; n < quickDatesArray.length; n++) {
  
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
    Calendar.clearAndLoadNewCalendar();
  }


  export const handleQuickAddClick = (currentId, currentHtml) => {

    if (currentId === "fast-increase")  {
      view.undisplayCalendar();
      view.displayQuickAddForm();
    }
    
    //SELECT TODO TYPE DROPDOWN
    
    if (currentId == 'quick-dropdown-area' || currentId == 'quick-drp-inside'){
    view.toggleDropdownQuick();
    }
    
    //SELECT TODO TYPE
    
    if (currentId.includes("qck"))  {
    
      document.getElementById("quick-todo-selected-2").innerHTML = currentHtml;
      view.undisplayDropdownQuick();
    }
    
    //CLOSE QUICK ADD FORM
    
    if (currentId.includes("btn-close-quick"))  {
    
      view.undisplayQuickAddForm();
      view.displayCalendar();
    }
    
    //SUBMIT
    
    if (currentId == 'btn-sbn-quick') {
    
      const inputQuickTask = document.getElementById('quick_input_list').value;
      const fromDate = document.getElementById("quick-from-date").value;
      const untilDate = document.getElementById("quick-until-date").value;
    
      if (inputQuickTask && fromDate <= untilDate && fromDate.length != 0 
        && untilDate.length != 0  ) {
        
        daysFromDateRange();
        view.undisplayQuickAddForm();
        view.displayCalendar();
        Stats.countAllTodos();
      } else {
        console.log('wrong selections or empty input field');
      }
    }
  }