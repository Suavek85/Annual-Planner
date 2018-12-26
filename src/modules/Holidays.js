export const updateNextHolidays = () => {

  const date = new Date();
  const todaysTS = date.getTime()

  const keyHols = 'b26794657e7d4906b15d868c3bb0a5f2abe5f74e'
  let urlHols = `https://www.calendarindex.com/api/v1/holidays?country=GB&year=2019&api_key=${keyHols}`;


  fetch(urlHols)
    .then(data => {
      return data.json()
    })

    .then(res => {

        let collapsibleHols = `<img src='images/expand.png' id='expand'  alt="Expand"><div style="display:none" id='collapsible_holidays'><p id='secondHol' class='collapibleText' >second holiday</p><p id='thirdHol' class='collapibleText'></p><p id='fourthHol' class='collapibleText'></p></div>`

        console.log(res);

        //NEXY HOLIDAY

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
          document.getElementById('next_holidays').innerHTML = `It's ${res.response.holidays[closestHolIndex].name}` + collapsibleHols;
        } else {
          document.getElementById('next_holidays').innerHTML = `${daysLeft} days left till ${res.response.holidays[closestHolIndex].name}` + collapsibleHols;
        }

        //COLLAPSIBLE SECTION

        let i;
        let moreholsArray = [];
        let moreholsDaysLeft = [];

        for (i = 0; i < holidaysArray.length; i++) {
          if (holidaysArray[i] >= 0) {
            moreholsArray.push(i);
            let moredaysleft = Math.ceil(holidaysArray[i] / oneDaySecs);
            console.log(moreholsDaysLeft)
            moreholsDaysLeft.push(moredaysleft);
          }
        }

        if (moreholsArray.length < 2) {
          document.getElementById('expand').style.display = 'none';
        } else if (moreholsArray.length === 2) {
          document.getElementById('secondHol').innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`
        } else if (moreholsArray.length === 3) {
          document.getElementById('secondHol').innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`
          document.getElementById('thirdHol').innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]}  days`
        } else if (moreholsArray.length >= 3) {
          document.getElementById('secondHol').innerHTML = `${res.response.holidays[moreholsArray[1]].name} in ${moreholsDaysLeft[1]} days`
          document.getElementById('thirdHol').innerHTML = `${res.response.holidays[moreholsArray[2]].name} in ${moreholsDaysLeft[2]} days`
          document.getElementById('fourthHol').innerHTML = `${res.response.holidays[moreholsArray[3]].name} in ${moreholsDaysLeft[3]} days`
        }
      }
    )
}