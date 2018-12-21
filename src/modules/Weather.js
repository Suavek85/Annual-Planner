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

      function extraWeatherForecast(a, b) {
        document.getElementById('wea_' + a).innerHTML = `${Math.round(res.list[b].main.temp)}° – ${res.list[b].dt_txt}`;
        document.getElementById('wea_' + a + '_icon').src = `https://openweathermap.org/img/w/${res.list[b].weather[0].icon}.png`
      }

      extraWeatherForecast(2, 6);
      extraWeatherForecast(3, 12);
      extraWeatherForecast(4, 18);
      extraWeatherForecast(5, 24);
      extraWeatherForecast(6, 32);

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

        function extraWeatherForecast(a, b) {
          document.getElementById('wea_' + a).innerHTML = `${res.list[b].main.temp}° - ${res.list[b].dt_txt}`;
          document.getElementById('wea_' + a + '_icon').src = `https://openweathermap.org/img/w/${res.list[b].weather[0].icon}.png`
        }
  
        extraWeatherForecast(2, 6);
        extraWeatherForecast(3, 12);
        extraWeatherForecast(4, 18);
        extraWeatherForecast(5, 24);
        extraWeatherForecast(6, 32);

      })

  }

  navigator.geolocation.getCurrentPosition(success, error);

}


export const updateWeatherCard = arg => {

  const cardWeather = document.getElementById('card-weather-id');
  cardWeather.innerHTML = "No weather prediction yet";
  const cardWeatherIcon = document.getElementById('card-weather-icon');
  cardWeatherIcon.src = "";
  const yourCity = document.getElementById('weather-city').innerHTML;
  let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${yourCity}&units=metric&appid=${apiKey}`;


  fetch(url2)
    .then(data => {
      return data.json()
    })

    .then(res => {

        console.log(res);

        const timestampArray = [res.list[0].dt, res.list[8].dt, res.list[16].dt, res.list[24].dt, res.list[32].dt];
        timestampArray.forEach(function (el, index) {
        let resListNo;
        let newDay = new Date();
        newDay.setTime(el * 1000);
        
          if (newDay.getDay() === arg) {

            if (index === 0) {
              resListNo = 0
            } else if (index === 1) {
              resListNo = 8
            } else if (index === 2) {
              resListNo = 16
            } else if (index === 3) {
              resListNo = 24
            } else if (index === 4) {
              resListNo = 32
            }

            document.getElementById('card-weather-id').innerHTML = Math.round(res.list[resListNo].main.temp_max) + '° in ' + res.city.name;

            document.getElementById('card-weather-icon').src = `https://openweathermap.org/img/w/${res.list[resListNo].weather[0].icon}.png`

          }

        })

      }

    )
}