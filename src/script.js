import {
  todos,
  renderingSigninClick,
  renderingRegisterClick,
  handlingTasksRendering,
  renderingDayandFormBoxClick
} from './modules/Todos';
import {
  welcome
} from './modules/Welcome';
import {
  handleWeatherAndHolidaysClick,
  handleDropdownsForTasks,
  handleRotatingDayTypes
} from './modules/View';
import * as Weather from './modules/Weather';
import * as Holidays from './modules/Holidays';
import * as Account from './modules/Account';
import * as Quickadd from './modules/Quickadd';
import * as Calendar from './modules/Calendar';
import * as Stats from './modules/Stats';


let closeBtnPreviousIds = [];


//CLICK EVENT LISTENER

document.addEventListener(
  "click",
  event => {

    const dayNameAttribute = event.target.getAttribute("day-name");
    const currentId = event.target.id;
    const currentSrc = event.target.src;
    const currentHtml = event.target.innerHTML;
    const currentStyle = event.target.style;
    

    Account.handleAccountClick(event, currentId);
    Calendar.handleRenderingCalendar(currentId);
    Stats.renderingStatsBoxClick(currentId);
    renderingSigninClick(currentId);
    renderingRegisterClick(currentId);
    handlingTasksRendering(currentId, currentHtml);
    renderingDayandFormBoxClick(currentId, currentStyle, dayNameAttribute, closeBtnPreviousIds);
    handleWeatherAndHolidaysClick(currentId, currentSrc);
    handleDropdownsForTasks(currentId, currentHtml);
    handleRotatingDayTypes(currentId);
    Quickadd.handleQuickAddClick(currentId, currentHtml);

}, false
);

//ON WINDOW LOAD

window.onload = function () {
  Calendar.loadCurrentYear();
  Calendar.loadCurrentMonthHtml();
  Holidays.updateNextHolidays()
  Weather.locationWeather();
  welcome.nowTime();
  Stats.countAllTodos();
};

//ON WINDOW RESIZE

window.onresize = function() {
  Account.undisplayOnWindowResize();
};