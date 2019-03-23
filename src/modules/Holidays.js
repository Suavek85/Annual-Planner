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

      let collapsibleHols = `<img src='images/expand.png' id='expand-holidays'  alt="expand"><div style="display:none" class='collapsible-hols' id='collapsible_holidays'><p id='secondHol' class='collapsible-hols__text'></p><p id='thirdHol' class='collapsible-hols__text'></p><p id='fourthHol' class='collapsible-hols__text'></p></div>`;


      let collapsibleHolsResp = `<div style="display:none" class='collapsible-hols-resp' id='collapsible_holidays_responsive'>
      <p id='firstHolResp' class='collapsible-hols-resp__text'></p>
      <p id='secondHolResp' class='collapsible-hols-resp__text'></p>
      <p id='thirdHolResp' class='collapsible-hols-resp__text'></p>
      <p id='fourthHolResp' class='collapsible-hols-resp__text'></p>
      <div class='collapsible-hols-resp__close' id='collapsible_holidays_responsive_close'>X</div>
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
      const daysLeft = Math.ceil(closestHolTS / oneDaySecs);

      const nextHolidays = document.getElementById('next_holidays');
      const nextHolidaysResp = document.getElementById('expand-holidays-responsive');
      const nowHolText = `It's ${res.response.holidays[closestHolIndex].name}`;
      const closestHolText = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`


        if (daysLeft === 0) {
          
          nextHolidays.insertAdjacentHTML("afterbegin", nowHolText + collapsibleHols);
         
        } else {
          
          nextHolidays.insertAdjacentHTML("afterbegin", closestHolText + collapsibleHols);
          nextHolidaysResp.insertAdjacentHTML("afterend", collapsibleHolsResp);
        }

    
      //COLLAPSIBLE SECTION
      
      let moreholsArray = [];
      let moreholsDaysLeft = [];
      const secHol = document.getElementById('secondHol');
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

      let x = 1;
      const addExtraHolsText = (el) => {
        el.innerHTML = `${res.response.holidays[moreholsArray[x]].name} in ${moreholsDaysLeft[x]} days`;
        x++;
      }
    
      
      if (moreholsArray.length < 2) {
        document.getElementById('expand-holidays').style.display = 'none';
      } else {
        switch(moreholsArray.length) {
          case 2:
            addExtraHolsText(secHol);
            break;
          case 3: 
            [secHol, thirdHol].forEach(el => { addExtraHolsText(el); })
            break;
          default:
            [secHol, thirdHol, fourthHol].forEach(el => { addExtraHolsText(el); })
            break;
        }
      }

      x = 1;
     
      if (moreholsArray.length < 2) {
        firstHolResp.innerHTML = closestHolText;
      } else {
        switch(moreholsArray.length) {
          case 2:
            firstHolRes.innerHTML = closestHolText;
            addExtraHolsText(secHolResp);
            break;
          case 3:
            firstHolResp.innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}`;
            [secHolResp, thirdHolResp].forEach(el => { addExtraHolsText(el); })
            break;
          default:
            firstHolResp.innerHTML = closestHolText;
            [secHolResp, thirdHolResp, fourthHolResp].forEach(el => { addExtraHolsText(el); })
            break;
        }
      }
    })
}
