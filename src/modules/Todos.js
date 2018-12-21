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
  
    countWeeklyTodos: function() {
      var todosDoneArray = [];
      var todosAllArray = [];
      
  
      for (var i = 0; i < mainArray.length; i++) {
        var done_per_day = (mainArray[i].g.match(/through/g) || []).length;
        todosDoneArray.push(done_per_day);
  
       var all_per_day = (mainArray[i].g.match(/todoscb/g) || []).length;
       todosAllArray.push(all_per_day);
      }
  
      if(todosDoneArray.length === 0 && todosAllArray.length === 0) {
        document.getElementById('outstanding_tasks').innerHTML = "You have no outstanding tasks.";
      } else {
  
        var countDone = todosDoneArray.reduce(function(a, b) {
          return a + b;
        });
    
        var countAll = todosAllArray.reduce(function(a, b) {
          return a + b;
        });
        document.getElementById('outstanding_tasks').innerHTML = countDone + " out of " + countAll + " tasks done.";
      }
  
    }
  };

  export {todos, mainArray};
  