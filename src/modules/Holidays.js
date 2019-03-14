export const updateNextHolidays = () => {

  const date = new Date();
  const todaysTS = date.getTime()
  const keyHols = 'b26794657e7d4906b15d868c3bb0a5f2abe5f74e';
  const urlHols = `https://calendarific.com/api/v2/holidays?country=UK&year=2019&api_key=${keyHols}`;
 
  fetch(urlHols)
  
    .then(data => {
      
      return data.json()
      
    })

    .then(res => {

      let collapsibleHols = `<img src='images/expand.png' id='expand-holidays'  alt="expand"><div style="display:none" id='collapsible_holidays'><p id='secondHol' class='collapsible_holidays-text'></p><p id='thirdHol' class='collapsible_holidays-text'></p><p id='fourthHol' class='collapsible_holidays-text'></p></div>`;


      let collapsibleHolsResp = `<div style="display:none" id='collapsible_holidays_responsive'>
      <p id='firstHolResp' class='collapsible_holidays-text'></p>
      <p id='secondHolResp' class='collapsible_holidays-text'></p>
      <p id='thirdHolResp' class='collapsible_holidays-text'></p>
      <p id='fourthHolResp' class='collapsible_holidays-text'></p>
      <div id='collapsible_holidays_responsive_close'>X</div>
      </div>`;

      //NEXT HOLIDAY

      const holidaysArray = res.response.holidays.map(el => {
        return Date.parse(el.date.iso) - todaysTS;
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
      const secHols = document.getElementById('secondHol');
      const thirdHol = document.getElementById('thirdHol');
      const fourthHol = document.getElementById('fourthHol');

      const firstHolResp = document.getElementById('firstHolResp');
      const secHolResp = document.getElementById('secondHolResp');
      const thirdHolResp = document.getElementById('thirdHolResp');
      const fourthHolResp = document.getElementById('fourthHolResp');

      for (let i = 0; i < holidaysArray.length; i++) {
        if (holidaysArray[i] >= 0) {
          moreholsArray.push(i);
          let moredaysleft = Math.ceil(holidaysArray[i] / oneDaySecs);
          moreholsDaysLeft.push(moredaysleft);
        }
      }
    

      if (moreholsArray.length < 2) {
        document.getElementById('expand-holidays').style.display = 'none';
      } else {
        switch(moreholsArray.length) {
          case 2:
            secHol.innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`;
            break;
          case 3:
            secHol.innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`;
            thirdHol.innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]} days`;
            break;
          default:
            secHols.innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`;
            thirdHol.innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]} days`;
            fourthHol.innerHTML = `${res.response.holidays[moreholsArray[3]].name} in ${moreholsDaysLeft[3]} days`;
            break;
        }
      }
     
      if (moreholsArray.length < 2) {
        firstHolResp.innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`;
      } else {
        switch(moreholsArray.length) {
          case 2:
            firstHolRes.innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`;
            secHolResp.innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`;
            break;
          case 3:
            firstHolResp.innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`;
            secHolResp.innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`
            thirdHolResp.innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]}  days`
            break;
          default:
            firstHolResp.innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`;
            secHolResp.innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`;
            thirdHolResp.innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]} days`;
            fourthHolResp.innerHTML = `${res.response.holidays[moreholsArray[3]].name} in ${moreholsDaysLeft[3]} days`;
            break;
        }
      }
    })
}
