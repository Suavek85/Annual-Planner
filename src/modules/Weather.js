const apiKey = '44bec28a349022ede2335eaf35ab8433';

export const locationWeather = () => {

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
    return;
  }

  const mainWeatherText = document.getElementById('weather');
  const mainWeatherCity = document.getElementById('weather-city');
  const mainWeatherIcon = document.getElementById('weather-icon');

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then(data => {
        return data.json()
      })

      .then(res => {
        
        console.log(res);
        mainWeatherText.innerHTML = `${Math.round(res.list[0].main.temp_max)}° in `;
        mainWeatherCity.innerHTML = `${ res.city.name}`;
        mainWeatherIcon.src = `https://openweathermap.org/img/w/${res.list[0].weather[0].icon}.png`;

      //EXPNADABLE DIV

      document.getElementById('showmore').style.display = "block";

      const extraWeatherForArray = [
      {a: 2, b: 3},
      {a: 3, b: 6},
      {a: 4, b: 9},
      {a: 5, b: 12},
      {a: 6, b: 15},
      {a: 7, b: 18},
      {a: 8, b: 21},
      {a: 9, b: 24},
      {a: 10, b: 27},
      {a: 11, b: 30}
      ]

  

      const expandTimes = (el) => {
        var datum = new Date(el * 1000);
        const expandHour = datum.getHours();
        const expandDay = datum.getDate();
        const expandMonthNo = datum.getMonth();
        const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        let expandMonth = months[expandMonthNo];
        return `at ${expandHour}:00 on ${expandDay} ${expandMonth}`
      }

      const extraWeatherHtml = extraWeatherForArray.map( el => {
      return `<div class='moreWeaWrapper'><img id='wea_${el.a}_icon' class='moreWeaIcons' src='https://openweathermap.org/img/w/${res.list[el.b].weather[0].icon}.png'><p id='wea_${el.a}' class='collapibleText_2'>${Math.round(res.list[el.b].main.temp)}° ${expandTimes(res.list[el.b].dt)}
      </p> </div>`

      })


      const extraWeatherHtmltoString = extraWeatherHtml.join("");

      document.getElementById('collapsible_weather').insertAdjacentHTML('afterbegin', extraWeatherHtmltoString);

      })

  }

  function error() {

    console.log("Unable to retrieve your location");

    let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${'London'}&units=metric&appid=${apiKey}`


    fetch(url2)
      .then(data => {
        return data.json()
      })
      .then(res => {

        mainWeatherText.innerHTML = `${Math.round(res.list[0].main.temp_max)}° in `;
        mainWeatherCity.innerHTML = `${ res.city.name}`;
        mainWeatherIcon.src = `https://openweathermap.org/img/w/${res.list[0].weather[0].icon}.png`
        console.log(res);

        //EXPNADABLE DIV

        const showMore = document.getElementById('showmore');
        showMore.style.display = "block";

        const extraWeatherForArray = [
          {a: 2, b: 3},
          {a: 3, b: 6},
          {a: 4, b: 9},
          {a: 5, b: 12},
          {a: 6, b: 15},
          {a: 7, b: 18},
          {a: 8, b: 21},
          {a: 9, b: 24},
          {a: 10, b: 27},
          {a: 11, b: 30}
          ]
    
      
          const expandTimes = (el) => {
            var datum = new Date(el * 1000);
            const expandHour = datum.getHours();
            const expandDay = datum.getDate();
            const expandMonthNo = datum.getMonth();
            const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            let expandMonth = months[expandMonthNo];
            return `at ${expandHour}:00 on ${expandDay} ${expandMonth}`
          }
    
          const extraWeatherHtml = extraWeatherForArray.map( el => {
          return `<div class='moreWeaWrapper'><img id='wea_${el.a}_icon' class='moreWeaIcons' src='https://openweathermap.org/img/w/${res.list[el.b].weather[0].icon}.png'><p id='wea_${el.a}' class='collapibleText_2'>${Math.round(res.list[el.b].main.temp)}° ${expandTimes(res.list[el.b].dt)}
          </p> </div>`
    
          })
    
    
          const extraWeatherHtmltoString = extraWeatherHtml.join("");
    
          document.getElementById('collapsible_weather').insertAdjacentHTML('afterbegin', extraWeatherHtmltoString);


      
      })

  }

  navigator.geolocation.getCurrentPosition(success, error);

}
