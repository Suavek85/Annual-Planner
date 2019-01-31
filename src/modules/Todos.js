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
  
    createIconDone: function(el) {
      var logo_done = document.createElement("img");
      logo_done.setAttribute("src", "images/completed.png");
      logo_done.setAttribute("alt", "logo done");
      logo_done.setAttribute("class", "logo_done");
      logo_done.setAttribute("height", "16px");
      logo_done.setAttribute("width", "16px");
      el.appendChild(logo_done);
    },
  
    createCheckbox: function(el) {
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "checkbox_todo";
      checkbox.value = "test";
      checkbox.name = "todoscb";
      el.appendChild(checkbox);
    },
  
    createLi: function(el, el2) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(el2.value));
      el.appendChild(li);
    },
  
    createListForm: function() {
      this.createCheckbox(this.ul_tasks());
      this.createLi(this.ul_tasks(), this.input_todo_form());
      this.input_todo_form().value = "";
      this.createIconDone(this.ul_tasks());
  
      var br = document.createElement("br");
      this.ul_tasks().appendChild(br);
      document.getElementById("delete_todo_form").style.display = "block";
    },
  
    createListDay: function() {
      this.createCheckbox(this.ul_tasks_day());
      this.createLi(this.ul_tasks_day(), this.input_todo_day());
      this.input_todo_day().value = "";
      this.createIconDone(this.ul_tasks_day());
  
      var br = document.createElement("br");
      this.ul_tasks_day().appendChild(br);
      document.getElementById("delete_todo_form").style.display = "block";
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

  
    countWeeklyTodos: function() {
      let todosDoneArray = [];
      let todosAllArray = [];
      
      for (let i = 0; i < mainArray.length; i++) {
      const done_per_day = (mainArray[i].g.match(/through/g) || []).length;
      todosDoneArray.push(done_per_day);
  
      const all_per_day = (mainArray[i].g.match(/todoscb/g) || []).length;
      todosAllArray.push(all_per_day);

      }
  
      if (todosDoneArray.length === 0 && todosAllArray.length === 0) {
        
        document.getElementById('tooltip_statistics').innerHTML = "You've no outstanding tasks.";
        document.getElementById('outstanding_tasks').innerHTML = "You've no outstanding tasks.";
        
      } 
      
      else {
  
        const countDone = todosDoneArray.reduce(function(a, b) {
          return a + b;
        });
    
        const countAll = todosAllArray.reduce(function(a, b) {
          return a + b;
        });
        
        document.getElementById('outstanding_tasks').innerHTML = "";
        document.getElementById('tooltip_statistics').innerHTML = countDone + " out of " + countAll + " tasks done.";

        const introStatsInfo = countDone + " out of " + countAll + " tasks done."

        if (countDone === 0 && countAll === 0 ) {

          return;

        } else {

          this.googChart(countDone, countAll, introStatsInfo);
          document.getElementById("glow_dot").style.backgroundColor = "orange";
          document.getElementById("glow_dot").style.boxShadow = "0 0 5px orange";
        

        }

       



      }
  
    },

    removeTodo: function() {

      const allTodos = document.getElementsByName("todoscb");
      for (let i = 0, length = allTodos.length - 1; i <= length; i++) {
        view.calculateProgress();
        if (allTodos[i].checked) {
          allTodos[i].nextSibling.remove();
          allTodos[i].nextSibling.remove();
          allTodos[i].nextSibling.remove();
          allTodos[i].remove();
          i--;
        }

      }
    },

    completedTodo: function() {
      const allTodosList = document.getElementsByName("todoscb");
      for (var i = 0, length = allTodosList.length; i < length; i++) {
        if (allTodosList[i].checked) {
          allTodosList[i].nextSibling.style.textDecoration = "line-through";
          allTodosList[i].nextSibling.style.color = "grey";
          allTodosList[i].checked = false;
          allTodosList[i].nextSibling.nextSibling.style.display = "inline-block";
        }
      }
      
    }

  };




  export {todos, mainArray};
  