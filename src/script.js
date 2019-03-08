import * as Todos from './modules/Todos';
import * as Weather from './modules/Weather';
import * as Holidays from './modules/Holidays';
import * as Account from './modules/Account';
import * as Quickadd from './modules/Quickadd';
import * as Calendar from './modules/Calendar';
import * as Stats from './modules/Stats';
import * as SignRegister from './modules/SignRegister';
import * as Menu from './modules/Menu';
import * as DropdownTasks from './modules/DropdownTasks';
import * as SliderDays from './modules/SliderDays';
import * as Tasks from './modules/Tasks';
import * as TaskForm from './modules/TasksForm';
import {
  welcome
} from './modules/Welcome';


const handlingAllClicks = (event) => {

  const dayNameAttribute = event.target.getAttribute("day-name");
  const currentId = event.target.id;
  const currentSrc = event.target.src;
  const currentHtml = event.target.innerHTML;
  const currentStyle = event.target.style;
  
  Account.handleAccountClick(event, currentId);
  Calendar.handleRenderingCalendar(currentId);
  Stats.renderingStatsBoxClick(currentId);
  SignRegister.renderingSigninClick(currentId);
  SignRegister.renderingRegisterClick(currentId);
  Menu.handleWeatherAndHolidaysClick(currentId, currentSrc);
  Quickadd.handleQuickAddClick(currentId, currentHtml);
  DropdownTasks.handleDropdownsForTasks(currentId, currentHtml);
  SliderDays.handleRotatingDayTypes(currentId);
  Tasks.handlingTasksRendering(currentId, currentHtml);
  Todos.renderingDayandFormBoxClick(currentId, currentStyle, dayNameAttribute);
  TaskForm.handlingTasksRenderingForm(currentId);

}

//CLICK EVENT LISTENER

document.addEventListener("click", handlingAllClicks, false);

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