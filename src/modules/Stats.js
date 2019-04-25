import { view } from "./View";
import { mainArray } from "./Days";

const googChart = (done, all, intro) => {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Task", "Hours per Day"],
      ["Done", done],
      ["Not completed", all - done]
    ]);

    var options = {
      title: intro,
      titleTextStyle: {
        fontSize: 24,
        bold: true
      },
      width: 450,
      height: 300,
      is3D: true,
      fontName: "Montserrat",
      colors: ["orange", "#A4A4A4"],
      fontSize: 16,
      legend: {
        position: "right",
        alignment: "center",
        textStyle: { color: "black" }
      }
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("piechart")
    );
    chart.draw(data, options);
  }
};

const clearDoneTodosText = () => {
  document.getElementById("tooltip_statistics").innerHTML =
    "You've no outstanding tasks.";
  document.getElementById("outstanding_tasks").innerHTML =
    "You've no outstanding tasks.";
};

const clearDoneTodosChart = () => {
  if (document.getElementById("piechart").hasChildNodes()) {
    document
      .getElementById("piechart")
      .removeChild(document.getElementById("piechart").childNodes[0]);
  }
};

const countAllTodos = () => {
  let todosDone = 0;
  let todosAll = 0;

  clearDoneTodosText();
  clearDoneTodosChart();

  for (let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray[i].z.length; j++) {
      todosAll = todosAll + 1;
    }

    for (let h = 0; h < mainArray[i].z.length; h++) {
      if (mainArray[i].z[h].done == true) {
        todosDone = todosDone + 1;
      }
    }

    if (todosDone == 0 && todosAll == 0) {
      clearDoneTodosText();
    } else {
      document.getElementById("outstanding_tasks").innerHTML = "";
      document.getElementById("tooltip_statistics").innerHTML =
        todosDone + " out of " + todosAll + " tasks done.";
      let introStatsInfo = todosDone + " out of " + todosAll + " tasks done.";
      googChart(todosDone, todosAll, introStatsInfo);
    }
  }
};

const handleStatsBoxClick = currentId => {
  switch (currentId) {
    case "stats_main_logo":
    case "stats_main_text":
      view.displayStatsBox();
      countAllTodos();
      view.undisplayCalendar();
      break;
    case "close_stats":
      view.undisplayStatsBox();
      view.displayCalendar();
      break;
  }
};

export { handleStatsBoxClick, countAllTodos };
