import {
  view
} from './View';

let mainArray = [];

const todos = {

    input_todo_form: function() {
      return document.getElementById("input_list");
    },
  
    input_todo_day: function() {
      return document.getElementById("input_list_output");
    },
  
    ul_tasks: function() {
      return document.getElementById("task_list");
    },
  
    ul_tasks_day: function() {
      return document.getElementById("task_list_output");
    },
  
    inputLength: function(element) {
      return element.value.length;
    },


    googChart: function(done, all, intro) {

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
        
        
      function drawChart() {
          var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Done', done],
          ['Not completed', all - done]
        ]);
        
          
      var options = {
      title: intro, 
      titleTextStyle: { 
        fontSize: 24,
        bold: true
      },
       width:450, 
       height:300,
       is3D: true,
        fontName: 'Montserrat',
        colors:['orange','#A4A4A4'],
        fontSize: 16,
        legend: {
          position: 'right',
          alignment: 'center',
          textStyle: { color: 'black' }
        }
      
      };
        
          
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
          chart.draw(data, options);

      }
    },

  
    countAllTodos: function() {
      
      let todosDone = 0;
      let todosAll = 0;
      
      for (let i = 0; i < mainArray.length; i++) {

        for (let j = 0; j < mainArray[i].z.length; j++) {

        todosAll = todosAll + 1;    

        }

        for (let h = 0; h < mainArray[i].z.length; h++) {

              if (mainArray[i].z[h].done == true) {

              todosDone = todosDone + 1;

              }
  
          }

        if (todosDone == 0 && todosAll == 0 ) {

          document.getElementById('tooltip_statistics').innerHTML = "You've no outstanding tasks.";
          document.getElementById('outstanding_tasks').innerHTML = "You've no outstanding tasks.";


        } else {

          document.getElementById('outstanding_tasks').innerHTML = "";
          document.getElementById('tooltip_statistics').innerHTML = todosDone + " out of " + todosAll + " tasks done.";
  
          const introStatsInfo = todosDone + " out of " + todosAll + " tasks done."

          this.googChart(todosDone, todosAll, introStatsInfo);
          
        
        }
    
      }
  
    },


  };


  export {todos, mainArray};
  