export const updateNextHolidays = () => {

  const date = new Date();
  const todaysTS = date.getTime()

  const keyHols = 'b26794657e7d4906b15d868c3bb0a5f2abe5f74e';
  let urlHols = `https://cors-anywhere.herokuapp.com/https://www.calendarindex.com/api/v1/holidays?country=GB&year=2019&api_key=${keyHols}`; 

 /*const urlHols = `https://dry-crag-50254.herokuapp.com/https://www.calendarindex.com/api/v1/holidays?country=GB&year=2019&api_key=${keyHols}`; */

  
  fetch(urlHols, {   
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      'Origin': 'https://www.calendarindex.com/api/v1/holidays?'
     }
  })
  
    .then(data => {
      
      console.log(data);
      return data.json()
      
    })

    .then(res => {

      let collapsibleHols = `<img src='images/expand.png' id='expand-holidays'  alt="expand"><div style="display:none" id='collapsible_holidays'><p id='secondHol' class='collapsible_holidays-text' >second holiday</p><p id='thirdHol' class='collapsible_holidays-text'></p><p id='fourthHol' class='collapsible_holidays-text'></p></div>`;


      let collapsibleHolsResp = `<div style="display:none" id='collapsible_holidays_responsive'>
      <p id='firstHolResp' class='collapsible_holidays-text'></p>
      <p id='secondHolResp' class='collapsible_holidays-text'></p>
      <p id='thirdHolResp' class='collapsible_holidays-text'></p>
      <p id='fourthHolResp' class='collapsible_holidays-text'></p>
      <div id='collapsible_holidays_responsive_close'>X</div>
      </div>`;

      //NEXT HOLIDAY

      const holidaysArray = res.response.holidays.map(el => {
        return Date.parse(el.date) - todaysTS;
      });

      const closestHolIndex = holidaysArray.findIndex(el => {
        return el >= 0;
      })

      const closestHolTS = holidaysArray.find(el => {
        return el >= 0;
      })

      const oneDaySecs = 86400000;

      const daysLeft = Math.ceil(closestHolTS / oneDaySecs)


        if (daysLeft === 0) {
          
          document.getElementById('next_holidays').insertAdjacentHTML("afterbegin", `It's ${res.response.holidays[closestHolIndex].name}` + collapsibleHols);
         

        } else {
          
          document.getElementById('next_holidays').insertAdjacentHTML("afterbegin", `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}` + collapsibleHols);
          document.getElementById('expand-holidays-responsive').insertAdjacentHTML("afterend", collapsibleHolsResp);
        }

    
      //COLLAPSIBLE SECTION

      let moreholsArray = [];
      let moreholsDaysLeft = [];

      for (let i = 0; i < holidaysArray.length; i++) {
        if (holidaysArray[i] >= 0) {
          moreholsArray.push(i);
          let moredaysleft = Math.ceil(holidaysArray[i] / oneDaySecs);
          moreholsDaysLeft.push(moredaysleft);
        }
      }

      if (moreholsArray.length < 2) {
        document.getElementById('expand-holidays').style.display = 'none';
      } else if (moreholsArray.length === 2) {
        document.getElementById('secondHol').innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`;
      } else if (moreholsArray.length === 3) {
        document.getElementById('secondHol').innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`
        document.getElementById('thirdHol').innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]}  days`
      } else if (moreholsArray.length >= 3) {
        document.getElementById('secondHol').innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`
        document.getElementById('thirdHol').innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]} days`
        document.getElementById('fourthHol').innerHTML = `${res.response.holidays[moreholsArray[3]].name} in ${moreholsDaysLeft[3]} days`
      }

   
      if (moreholsArray.length < 2) {
        document.getElementById('firstHolResp').innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`;
      } else if (moreholsArray.length === 2) {
        document.getElementById('firstHolResp').innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`;
        document.getElementById('secondHolResp').innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`;
      } else if (moreholsArray.length === 3) {
        document.getElementById('firstHolResp').innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`;
        document.getElementById('secondHolResp').innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`
        document.getElementById('thirdHolResp').innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]}  days`
      } else if (moreholsArray.length >= 3) {
        document.getElementById('firstHolResp').innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`;
        document.getElementById('secondHolResp').innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`
        document.getElementById('thirdHolResp').innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]} days`
        document.getElementById('fourthHolResp').innerHTML = `${res.response.holidays[moreholsArray[3]].name} in ${moreholsDaysLeft[3]} days`
      }
    })
}