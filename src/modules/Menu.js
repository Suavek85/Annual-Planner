const displayMoreWeather = evtSource => {
  const showMoreWeather = document.getElementById("collapsible_weather");

  if (showMoreWeather.style.transform == "scaleY(1)") {
    showMoreWeather.style.transform = "scaleY(0)";
    evtSource = "images/expand.png";
  } else {
    showMoreWeather.style.transform = "scaleY(1)";
    evtSource = "images/collapse.png";
  }
};

const displayMoreHolidays = evtSource => {
  const showMoreHols = document.getElementById("collapsible_holidays");

  if (showMoreHols.style.display === "block") {
    document.getElementById("collapsible_holidays").style.display = "none";
    evtSource = "images/expand.png";
  } else {
    document.getElementById("collapsible_holidays").style.display = "block";
    evtSource = "images/collapse.png";
  }
};

const displayMoreWeatherResp = () => {
  const collapseWeatherRes = document.getElementById(
    "collapsible_weather_responsive"
  );
  collapseWeatherRes.style.display = "flex";
};

const undisplayMoreWeatherResp = () => {
  const collapseWeatherRes = document.getElementById(
    "collapsible_weather_responsive"
  );
  collapseWeatherRes.style.display = "none";
};

const displayMoreHolidaysResp = () => {
  const collapseHolsRes = document.getElementById(
    "collapsible_holidays_responsive"
  );
  collapseHolsRes.style.display = "flex";
};

const undisplayMoreHolidaysrResp = () => {
  const collapseHolsRes = document.getElementById(
    "collapsible_holidays_responsive"
  );
  collapseHolsRes.style.display = "none";
};

export const handleWeatherAndHolidaysClick = (currentId, currentSrc) => {
  switch (currentId) {
    case "expand-holidays":
      displayMoreHolidays(currentSrc);
      break;
    case "showmore-weather":
      displayMoreWeather(currentSrc);
      break;
    case "collapsible_weather_close":
      undisplayMoreWeatherResp();
      break;
    case "showmore-weather-resp-icon":
    case "showmore-weather-resp-text":
      displayMoreWeatherResp();
      break;
    case "expand-holidays-resp-logo":
    case "expand-holidays-resp-text":
      displayMoreHolidaysResp();
      break;
    case "collapsible_holidays_responsive_close":
      undisplayMoreHolidaysrResp();
      break;
  }
};
