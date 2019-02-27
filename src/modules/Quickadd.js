import * as Main from './Todos';
import * as Calendar from './Calendar';
import {
    todos,
    mainArray
  } from './Todos';


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
  
  export const pickRangeDate = () => {
  
  
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
  
          const taskQuick = new Main.Task (one, two);
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
      const taskQuick = new Main.Task(one, two);
      temporaryArr.push(taskQuick);
      let imageicon = 'images/work_icon.png';
      const quickday = new Main.Day (quickDatesArray[n], imageicon, temporaryArr);
      mainArray.push(quickday);
      temporaryArr = [];
     
    }
  
    Calendar.removeMonthHtml();
    Calendar.loadMonthHtml();
  
  
  }