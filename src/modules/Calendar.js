import {
  mainArray
} from './Todos';



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

const currentMonthLenghtCalc = () => {
  
  let currentMonthName = document.getElementById("selected_month").innerHTML;
  let currentYearTake = parseFloat(document.getElementById("selected_year").innerHTML)
  
  if (currentMonthName === "December") {
    monthNumber = 12;
  }
    
  else if (currentMonthName === "January") {
    monthNumber = 1;
  }

  else if (currentMonthName === "February") {
    monthNumber = 2;
  }

  else if (currentMonthName === "March") {
    monthNumber = 3;
  }
  
  else if (currentMonthName === "April") {
    monthNumber = 4;
  }

  else if (currentMonthName === "May") {
    monthNumber = 5;
  }
  
  else if (currentMonthName === "June") {
    monthNumber = 6;
  }
  
  else if (currentMonthName === "July") {
    monthNumber = 7;
  }
    
  else if (currentMonthName === "August") {
    monthNumber = 8;
  }

  else if (currentMonthName === "September") {
    monthNumber = 9;
  }

  else if (currentMonthName === "October") {
    monthNumber = 10;
  }
  
  else if (currentMonthName === "November") {
    monthNumber = 11;
  }
    
  daysInMonth(monthNumber, currentYearTake);
 
}


const currentTimestamp = () => {

  const d = new Date();
  const fullYear = d.getFullYear();
  const fullMonth = d.getMonth() 
  const fullDay = d.getDate()
  const fullDate = new Date(fullYear,fullMonth,fullDay);
  return fullDate.getTime()/1000;
 }


const removeMonthHtml = () => {

  const fullMonthHtml = document.getElementById("fullcalhtml");
  fullMonthHtml.remove();

}

const loadMonthHtml = () => {

  selectedYear = document.getElementById("selected_year").innerHTML;
  selectedMonth = document.getElementById("selected_month").innerHTML.slice(0,3).toLowerCase();


  const addPastDaysStyle = (el) => {

    const toOneDigit = el => {  
  
    let startsWithZero = el.startsWith("0"); 
    let slicedEl;

    if (startsWithZero == true) 
      { slicedEl = el.slice(1); 
    
    } 
      else { slicedEl = el;}
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


    monthStartDay = (new Date(selectedYear + "-" + monthNumber + "-01").getDay());
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
    
    const emptyDays = `<div></div>`.repeat(monthStartDay - 1);
    
    const fullCalendarHtml = `
    <div id="fullcalhtml" class="month_days_gen">
    ${emptyDays}
    ${joinHtmlArray}
    </div>
    `
    document.getElementById("weekdaysid").insertAdjacentHTML('afterend', fullCalendarHtml);
  
}


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


export const newMonthsForward = () => {

let selectedMo = document.getElementById("selected_month");
let selectedYe = document.getElementById("selected_year");

if (selectedMo.innerHTML === "December") 

{ selectedMo.innerHTML = "January";
selectedYe.innerHTML = parseFloat(selectedYe.innerHTML) + 1;
monthNumber = 1;
}

else if (selectedMo.innerHTML === "January") 
{ selectedMo.innerHTML = "February";
 monthNumber = 2;
} 

else if (selectedMo.innerHTML === "February") 
{ selectedMo.innerHTML = "March"; 
monthNumber = 3;
}

else if (selectedMo.innerHTML === "March") 
{  selectedMo.innerHTML = "April";
monthNumber = 4
}

 else if (selectedMo.innerHTML === "April") 
 {  selectedMo.innerHTML = "May";
monthNumber = 5 }

 else if (selectedMo.innerHTML === "May") 
 {  selectedMo.innerHTML = "June";
monthNumber = 6}

 else if (selectedMo.innerHTML === "June") 
 {  selectedMo.innerHTML = "July";
monthNumber = 7}

 else if (selectedMo.innerHTML === "July") 
 {  selectedMo.innerHTML = "August";
monthNumber = 8 }

 else if (selectedMo.innerHTML === "August") 
 {  selectedMo.innerHTML = "September";
monthNumber = 9 }

 else if (selectedMo.innerHTML === "September") 
 {  selectedMo.innerHTML = "October";
monthNumber = 10 }

 else if (selectedMo.innerHTML === "October") 
 {  selectedMo.innerHTML = "November";
monthNumber = 11 }

 else if (selectedMo.innerHTML === "November")
  {  selectedMo.innerHTML = "December";
monthNumber = 12 }

daysInMonth (monthNumber, selectedYe.innerHTML); 
selectedYear = document.getElementById("selected_year").innerHTML;
selectedMonth = document.getElementById("selected_month").innerHTML.slice(0,3).toLowerCase();
removeMonthHtml();
loadMonthHtml();

}


export const newMonthsBackward = () => {

let selectedMoBack = document.getElementById("selected_month");
let selectedYeBack = document.getElementById("selected_year");

if (selectedMoBack.innerHTML === "December") 
{ selectedMoBack.innerHTML = "November";
monthNumber = 11;
}

else if (selectedMoBack.innerHTML === "January") 
{ selectedMoBack.innerHTML = "December";
selectedYeBack.innerHTML = parseFloat(selectedYeBack.innerHTML) - 1;
 monthNumber = 12;
} 

else if (selectedMoBack.innerHTML === "February") 
{ selectedMoBack.innerHTML = "January"; 
monthNumber = 1;
}

else if (selectedMoBack.innerHTML === "March") 
{  selectedMoBack.innerHTML = "February";
monthNumber = 2;
}

 else if (selectedMoBack.innerHTML === "April") 
 {  selectedMoBack.innerHTML = "March";
monthNumber = 3; }

 else if (selectedMoBack.innerHTML === "May") 
 {  selectedMoBack.innerHTML = "April";
monthNumber = 4;}

 else if (selectedMoBack.innerHTML === "June") 
 {  selectedMoBack.innerHTML = "May";
monthNumber = 5;}

 else if (selectedMoBack.innerHTML === "July") 
 {  selectedMoBack.innerHTML = "June";
monthNumber = 6; }

 else if (selectedMoBack.innerHTML === "August") 
 {  selectedMoBack.innerHTML = "July";
monthNumber = 7; }

 else if (selectedMoBack.innerHTML === "September") 
 {  selectedMoBack.innerHTML = "August";
monthNumber = 8; }

 else if (selectedMoBack.innerHTML === "October") 
 {  selectedMoBack.innerHTML = "September";
monthNumber = 9; }

 else if (selectedMoBack.innerHTML === "November")
  {  selectedMoBack.innerHTML = "October";
monthNumber = 10; }

daysInMonth (monthNumber, selectedYeBack.innerHTML); 
selectedYear = document.getElementById("selected_year").innerHTML;
selectedMonth = document.getElementById("selected_month").innerHTML.slice(0,3).toLowerCase();
removeMonthHtml();
loadMonthHtml();

}


/* TODO

- css
- refactoring
- problem with close form btn

*/






