
const displayMoreWeather = (evtSource) => {

    const showMoreWeather = document.getElementById("collapsible_weather");
    
    if (showMoreWeather.style.transform == "scaleY(1)") {
      showMoreWeather.style.transform = "scaleY(0)";
      evtSource = "images/expand.png";
    } 
    
    else {
      showMoreWeather.style.transform = "scaleY(1)";
      evtSource = "images/collapse.png";
    }

  }

const displayMoreHolidays = (evtSource) => {

    const showMoreHols = document.getElementById("collapsible_holidays");

    if (showMoreHols.style.display === "block") {

      document.getElementById("collapsible_holidays").style.display = 'none';
      evtSource = "images/expand.png";

    } else {
      document.getElementById("collapsible_holidays").style.display = 'block';
      evtSource= "images/collapse.png";

    }

}

const displayMoreWeatherResp = () => {
    document.getElementById("collapsible_weather_responsive").style.display = "flex";
}

const undisplayMoreWeatherResp = () => {
    document.getElementById("collapsible_weather_responsive").style.display = "none";
}

const displayMoreHolidaysResp = () => {
    document.getElementById("collapsible_holidays_responsive").style.display = "flex";
}

const undisplayMoreHolidaysrResp = () => {
    document.getElementById("collapsible_holidays_responsive").style.display = "none";
}


export const handleWeatherAndHolidaysClick = (currentId, currentSrc) => {

    //TOGGLE SHOWING MORE BANK HOLS

    if (currentId === "expand-holidays") {

      displayMoreWeather(currentSrc);
    }

    //TOGGLE SHOWING MORE WEATHER - DESKTOP

    if (currentId === 'showmore-weather') {

      displayMoreWeather(currentSrc);
      
    }

    //SHOW WEATHER RESPONSIVE

    if (currentId === "showmore-weather-resp-icon" || currentId === "showmore-weather-resp-text") {
      displayMoreWeatherResp();
    }

    //CLOSE WEATHER RESPONSIVE

    if (currentId === "collapsible_weather_close") {

      undisplayMoreWeatherResp();
    }

    //SHOW HOLIDAYS RESPONSIVE

    if (currentId === "expand-holidays-resp-logo" || currentId === "expand-holidays-resp-text") {

      displayMoreHolidaysResp();

    }

    //CLOSE HOLIDAYS RESPONSIVE
    if (currentId === "collapsible_holidays_responsive_close") {

      undisplayMoreHolidaysrResp();
    }
}

