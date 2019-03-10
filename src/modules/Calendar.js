import {
  mainArray
} from './Days';

let selectedYear;
let selectedMonth;
let monthNumber;
let daysInMonthNumber;


const monthsArray = [
  {a: 'January', b: 1},
  {a: 'February', b: 2},
  {a: 'March', b: 3},
  {a: 'April', b: 4},
  {a: 'May', b: 5},
  {a: 'June', b: 6},
  {a: 'July', b: 7},
  {a: 'August', b: 8},
  {a: 'September', b: 9},
  {a: 'October', b: 10},
  {a: 'November', b: 11},
  {a: 'December', b: 12}
]

//GET CURRENT YEAR

export const loadCurrentYear = () => {
  let currentTime = new Date()
  let year = currentTime.getFullYear()
  document.getElementById("selected_year").innerHTML = year;
}

//GET CURRENT MONTH LENGTH

const currentMonthLenghtCalc = () => {
  
  let currentMonthName = document.getElementById("selected_month").innerHTML;
  let currentYearTake = parseFloat(document.getElementById("selected_year").innerHTML)

  let i;
  for (i = 0; i < monthsArray.length; i++) { 

     if (currentMonthName === monthsArray[i].a) {

      monthNumber = monthsArray[i].b;
      break;
    
    }  
  }
  daysInMonth(monthNumber, currentYearTake);
}

//GET CURRENT TIMESTAMP

const currentTimestamp = () => {
  const newD = new Date();
  const fullYear = newD.getFullYear();
  const fullMonth = newD.getMonth() 
  const fullDay = newD.getDate()
  const fullDate = new Date(fullYear,fullMonth,fullDay);
  return fullDate.getTime()/1000;
 }

 //MAKE MONTH NUMBER TWO DIGIT

 const makeTwoDigitMonthNumber = () => {

  if (monthNumber < 10  ){
    if (typeof monthNumber !== 'string') {
      monthNumber = '0' + monthNumber;
    }
  }
  return monthNumber;
}

//GET NUMBER OF DAYS IN MONTH

const daysInMonth = (month, year) => {
  daysInMonthNumber = new Date(year, month, 0).getDate();
}


//ADD STYLE FOR PAST DAYS

const addPastDaysStyle = (el) => {

  const daysToOneDigit = el => {  

    let startsWithZero = el.startsWith("0"); 
    let slicedEl;

    if (startsWithZero == true) { 
      slicedEl = el.slice(1); 
    } else { slicedEl = el;}

    return slicedEl;
  }

  const toTimestamp = (el) => {
    const fullDate = new Date(selectedYear, monthNumber - 1, daysToOneDigit(el), '23', '59', '59');
    return fullDate.getTime()/1000;
  }

  if (toTimestamp(el) < currentTimestamp()) { 
    return 'color: darkgray;';
  }
  
  else { return ''}
}

//ADD SUBMITTED STYLE

const addSubmittedStyle = el => {

  const doneDaysArray = mainArray.filter(el => el.a.includes(selectedMonth + selectedYear));
  const slicedDoneDaysArray = doneDaysArray.map(el => { return el.a.slice(7,9) })
  

  if (slicedDoneDaysArray.includes(el)) {
    return 'border-radius: 5px; background-color: green;';
  }   
  else {
    return '';
  }  
};

//CALCULATE EMPTY DAYS 

const calcEmptyDays = () => {

  let monthStartDay = (new Date(selectedYear + "-" + makeTwoDigitMonthNumber() + "-01").getDay());
  if (monthStartDay === 0) {
  monthStartDay = 7
  }
  return `<div style='padding: 5px;'>&nbsp</div>`.repeat(monthStartDay - 1);
}



//REMOVE MONTH HTML

export const removeMonthHtml = () => {
  const fullMonthHtml = document.getElementById("fullcalhtml");
  fullMonthHtml.remove();
}


//LOAD ANY MONTH  HTML

export const loadMonthHtml = () => {

    selectedYear = document.getElementById("selected_year").innerHTML;
    selectedMonth = document.getElementById("selected_month").innerHTML.slice(0,3).toLowerCase();

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

    const addHtmlToDaysArray = daysInMonthArray.map( el => {

    return `<div style="${addPastDaysStyle(el)} ${addSubmittedStyle(el)}" day-name='dayname${el}${selectedMonth}${selectedYear}' id='calendar${el}${selectedMonth}${selectedYear}' class='day_in_month_item'>${el}</div>`

    });

    const joinHtmlArray = addHtmlToDaysArray.join("");
    
    const fullCalendarHtml = `
    <div id="fullcalhtml" class="month_days_gen">
    ${calcEmptyDays()}
    ${joinHtmlArray}
    </div>
    `
    document.getElementById("weekdaysid").insertAdjacentHTML('afterend', fullCalendarHtml);
  
}


//LOAD CURRENT MONTH 

export const loadCurrentMonthHtml = () => {
  
  const currentDate = new Date();
  selectedMonth = monthsArray[currentDate.getMonth()].a;
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

  let i;
  for (i = 0; i < monthsArray.length; i++) { 

     if (selectedMo.innerHTML === monthsArray[i].a) {

      if (selectedMo.innerHTML === 'December') {

        selectedMo.innerHTML = monthsArray[0].a;
        selectedYe.innerHTML = parseFloat(selectedYe.innerHTML) + 1;
        monthNumber = monthsArray[0].b;

      } else  {

        selectedMo.innerHTML = monthsArray[i + 1].a;
        monthNumber = monthsArray[i].b + 1;
      } 
     break;
    
    }  
  }
}


const calculateBackMont = (selectedMoBack, selectedYeBack) => {

  let i;
  for (i = 0; i < monthsArray.length; i++) { 

     if (selectedMoBack.innerHTML === monthsArray[i].a) {

      console.log(monthsArray[i].a)

      if (selectedMoBack.innerHTML === 'January') {
        
        selectedMoBack.innerHTML = "December";
        selectedYeBack.innerHTML = parseFloat(selectedYeBack.innerHTML) - 1;
        monthNumber = 12;

      } else  {

        selectedMoBack.innerHTML = monthsArray[i - 1].a;
        monthNumber = monthsArray[i - 1].b;
      } 
     break;
    
    }  
  }
}


export const clearAndLoadNewCalendar = () => {
  removeMonthHtml();
  loadMonthHtml();
}

export const loadCurrentCalendar = () => {
  loadCurrentYear();
  loadCurrentMonthHtml();
}

export const clearAndLoadCurrentCalendar = () => {
  removeMonthHtml();
  loadCurrentCalendar();
}

export const handleRenderingCalendar = (currentId) => {

  if (currentId === "nextarrow") {
    newMonthsForward();
  }

  if (currentId === "backarrow") {
    newMonthsBackward();
  }
}

