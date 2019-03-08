const toggleShowTasksDropdownDay = () => {
    const myDropdown = document.getElementById("myDropdown-2");
    myDropdown.classList.toggle("show");
}

const toggleShowTasksDropdownForm = () => {

    const myDropdown = document.getElementById("myDropdown");
    myDropdown.classList.toggle("show");
}

const toggleDropdownForm = () => {
    const myDropdown = document.getElementById("myDropdown");
    myDropdown.classList.toggle("show");
}

const toggleDropdownDay = () => {
    const myDropdown = document.getElementById("myDropdown-2");
    myDropdown.classList.toggle("show");
}


export const handleDropdownsForTasks = (currentId, currentHtml) => {

    //TOGGLE FORM DROPDOWN MENU

    if (currentId === 'btn-form-dropdown' || currentId === 'wrap-drpdn-area' ) {
      toggleDropdownForm();
    }

    //ON DROPDOWN ITEM CLICK - FORM

    else if (currentId.includes("drop-down-"))  {

      document.getElementById("todo-type-selected").innerHTML = currentHtml;
      toggleShowTasksDropdownForm();
    }

    //TOGGLE DAY DROPDOWN MENU

    else if (currentId === 'todo-day-dropdown-area' || currentId === 'todo-day-dropdown-area-2' ) {
      toggleShowTasksDropdownDay();
    }

    //ON DROPDOWN ITEM CLICK - DAY

    else if (currentId.includes("day-down"))  {

      document.getElementById("todo-type-selected-2").innerHTML = currentHtml;
      toggleDropdownDay();
    }
}