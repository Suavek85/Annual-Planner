import {
  mainArray
} from './Days';


let selectedYear;
let selectedMonth;
let monthNumber;
let daysInMonthNumber;
let monthStartDay;


export const loadCurrentYear = () => {
  let currentTime = new Date()
  let year = currentTime.getFullYear()
  document.getElementById("selected_year").innerHTML = year;
}


const daysInMonth = (month, year) => {
  daysInMonthNumber = new Date(year, month, 0).getDate();
}


//CURRENT MONTH LENGTH

const currentMonthLenghtCalc = () => {
  
  let currentMonthName = document.getElementById("selected_month").innerHTML;
  let currentYearTake = parseFloat(document.getElementById("selected_year").innerHTML)

  switch(currentMonthName ) {
    case "December":
     monthNumber = 12;
    break;
    case "January":
    monthNumber = 1;
    break;
    case "February":
    monthNumber = 2;
    break;
    case "March":
    monthNumber = 3;
    break;
    case "April":
    monthNumber = 4;
    break;
    case "May":
    monthNumber = 5;
    break;
    case "June":
    monthNumber = 6;
    break;
    case "July":
    monthNumber = 7;
    break;
    case "August":
    monthNumber = 8;
    break;
    case "September":
    monthNumber = 9;
    break;
    case "November":
    monthNumber = 11;
    break;
    default:
    monthNumber = 12;
  }
  daysInMonth(monthNumber, currentYearTake);
}


const currentTimestamp = () => {
  const newD = new Date();
  const fullYear = newD.getFullYear();
  const fullMonth = newD.getMonth() 
  const fullDay = newD.getDate()
  const fullDate = new Date(fullYear,fullMonth,fullDay);
  return fullDate.getTime()/1000;
 }


export const removeMonthHtml = () => {
  const fullMonthHtml = document.getElementById("fullcalhtml");
  fullMonthHtml.remove();
}


//LOAD ANY MONTH - HTML


export const loadMonthHtml = () => {

  selectedYear = document.getElementById("selected_year").innerHTML;
  selectedMonth = document.getElementById("selected_month").innerHTML.slice(0,3).toLowerCase();


    const addPastDaysStyle = (el) => {

        const toOneDigit = el => {  
      
          let startsWithZero = el.startsWith("0"); 
          let slicedEl;

          if (startsWithZero == true) { 
            slicedEl = el.slice(1); 
          } else { slicedEl = el;}

          return slicedEl;
        }

        const toTimestamp = (el) => {
          const fullDate = new Date(selectedYear, monthNumber - 1, toOneDigit(el), '23', '59', '59');
          return fullDate.getTime()/1000;
        }
      
        if (toTimestamp(el) < currentTimestamp()) { 
          return 'color: darkgray;';
        }
        
        else { return ''}
    }


    const calcMonthNumber = () => {

      if (monthNumber < 10  ){
        if (typeof monthNumber !== 'string') {
          monthNumber = '0' + monthNumber;
        }
      }
      return monthNumber;
    }


    monthStartDay = (new Date(selectedYear + "-" + calcMonthNumber() + "-01").getDay());
    if (monthStartDay === 0) {
    monthStartDay = 7
    }
    
  
    let i;
    let daysInMonthArray = [];

    for (i = 1; i <= daysInMonthNumber; i++) {
      if(i < 10) {

      let oneDigitDays = '0' + i.toString();
      daysInMonthArray.push(oneDigitDays);
      }
      else {
      let twoDigitDays = i.toString();
      daysInMonthArray.push(twoDigitDays);
      }
    
    }

    const doneDaysArray = mainArray.filter(el => el.a.includes(selectedMonth + selectedYear));
    const slicedDoneDaysArray = doneDaysArray.map(el => { return el.a.slice(7,9) })
    
    const addSubmittedStyle = el => {
      if (slicedDoneDaysArray.includes(el)) {
        return 'border-radius: 5px; background-color: green;';
      }   
      else {
        return '';
      }  
    };


    const addHtmlToDaysArray = daysInMonthArray.map( el => {

    return `<div style="${addPastDaysStyle(el)} ${addSubmittedStyle(el)}" day-name='dayname${el}${selectedMonth}${selectedYear}' id='calendar${el}${selectedMonth}${selectedYear}' class='day_in_month_item'>${el}</div>`

    });

    const joinHtmlArray = addHtmlToDaysArray.join("");
    
    const emptyDays = `<div style='padding: 5px;'>&nbsp</div>`.repeat(monthStartDay - 1);

   
    
    const fullCalendarHtml = `
    <div id="fullcalhtml" class="month_days_gen">
    ${emptyDays}
    ${joinHtmlArray}
    </div>
    `
    document.getElementById("weekdaysid").insertAdjacentHTML('afterend', fullCalendarHtml);
  
}


//LOAD CURRENT MONTH 

export const loadCurrentMonthHtml = () => {
  
  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  const newD = new Date();
  selectedMonth = month[newD.getMonth()];
  document.getElementById("selected_month").innerHTML = selectedMonth;

  currentMonthLenghtCalc();
  loadMonthHtml();
}




//LOAD MONTH FORWRD AND BACKWARDS

export const newMonthsForward = () => {

  let selectedMo = document.getElementById("selected_month");
  let selectedYe = document.getElementById("selected_year");
  calculateNextMont(selectedMo, selectedYe);
  daysInMonth (monthNumber, selectedYe.innerHTML); 
  selectedYear = document.getElementById("selected_year").innerHTML;
  selectedMonth = document.getElementById("selected_month").innerHTML.slice(0,3).toLowerCase();
  clearAndLoadNewCalendar(); 

}


export const newMonthsBackward = () => {

  let selectedMoBack = document.getElementById("selected_month");
  let selectedYeBack = document.getElementById("selected_year");
  calculateBackMont(selectedMoBack, selectedYeBack);
  daysInMonth (monthNumber, selectedYeBack.innerHTML); 
  selectedYear = document.getElementById("selected_year").innerHTML;
  selectedMonth = document.getElementById("selected_month").innerHTML.slice(0,3).toLowerCase();
  clearAndLoadNewCalendar(); 

}


const calculateNextMont = (selectedMo, selectedYe) => {

  switch(selectedMo.innerHTML) {
      case "December":
      selectedMo.innerHTML = "January";
      selectedYe.innerHTML = parseFloat(selectedYe.innerHTML) + 1;
      monthNumber = 1;
      break;
      case "January":
      selectedMo.innerHTML = "February";
      monthNumber = 2;
      break;
      case "February":
      selectedMo.innerHTML = "March"; 
      monthNumber = 3;
      break;
      case "March":
      selectedMo.innerHTML = "April";
      monthNumber = 4
      break;
      case "April":
      selectedMo.innerHTML = "May";
      monthNumber = 5 
      break;
      case "May":
      selectedMo.innerHTML = "June";
      monthNumber = 6
      break;
      case "June":
      selectedMo.innerHTML = "July";
      monthNumber = 7
      break;
      case "July":
      selectedMo.innerHTML = "August";
      monthNumber = 8
      break;
      case "August":
      selectedMo.innerHTML = "September";
      monthNumber = 9
      break;
      case "September":
      selectedMo.innerHTML = "October";
      monthNumber = 10 
      break;
      case "October":
      selectedMo.innerHTML = "November";
      monthNumber = 11
      break;
      case "November":
      selectedMo.innerHTML = "December";
      monthNumber = 12
      break;
      default:
      selectedMo.innerHTML = "December";
      monthNumber = 12
    }

}


const calculateBackMont = (selectedMoBack, selectedYeBack) => {

    switch(selectedMoBack.innerHTML) {
      case "December":
      selectedMoBack.innerHTML = "November";
      monthNumber = 11;
      break;
      case "January":
      selectedMoBack.innerHTML = "December";
      selectedYeBack.innerHTML = parseFloat(selectedYeBack.innerHTML) - 1;
      monthNumber = 12;
      break;
      case "February":
      selectedMoBack.innerHTML = "January"; 
      monthNumber = 1;
      break;
      case "March":
      selectedMoBack.innerHTML = "February";
      monthNumber = 2;
      break;
      case "April":
      selectedMoBack.innerHTML = "March";
      monthNumber = 3;
      break;
      case "May":
      selectedMoBack.innerHTML = "April";
      monthNumber = 4;
      break;
      case "June":
      selectedMoBack.innerHTML = "May";
      monthNumber = 5;
      break;
      case "July":
      selectedMoBack.innerHTML = "June";
      monthNumber = 6;
      break;
      case "August":
      selectedMoBack.innerHTML = "July";
      monthNumber = 7;
      break;
      case "September":
      selectedMoBack.innerHTML = "August";
      monthNumber = 8;
      break;
      case "October":
      selectedMoBack.innerHTML = "September";
      monthNumber = 9;
      break;
      case "November":
      selectedMoBack.innerHTML = "October";
      monthNumber = 10;
      break;
      default:
      selectedMoBack.innerHTML = "October";
      monthNumber = 10;
  }

}


export const clearAndLoadNewCalendar = () => {
  removeMonthHtml();
  loadMonthHtml();
}

export const clearAndLoadCurrentCalendar = () => {
  removeMonthHtml();
  loadCurrentYear();
  loadCurrentMonthHtml();
}


export const handleRenderingCalendar = (currentId) => {

  //DISPLAY NEXT MONTH
  if (currentId === "nextarrow") {
    newMonthsForward();
  }

  //DISPLAY PREVIOUS MONTH
  if (currentId === "backarrow") {
    newMonthsBackward();
  }
}








