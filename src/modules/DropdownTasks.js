const toggleShowTasksDropdownDay = () => {
  const myDropdown = document.getElementById("myDropdown-2");
  myDropdown.classList.toggle("show");
};

const toggleShowTasksDropdownForm = () => {
  const myDropdown = document.getElementById("myDropdown");
  myDropdown.classList.toggle("show");
};

const toggleDropdownForm = () => {
  const myDropdown = document.getElementById("myDropdown");
  myDropdown.classList.toggle("show");
};

const toggleDropdownDay = () => {
  const myDropdown = document.getElementById("myDropdown-2");
  myDropdown.classList.toggle("show");
};

export const handleDropdownsForTasks = (currentId, currentHtml) => {
  switch (currentId) {
    case "btn-form-dropdown":
    case "wrap-drpdn-area":
      toggleDropdownForm();
      break;
    case "todo-day-dropdown-area":
    case "todo-day-dropdown-area-2":
      toggleShowTasksDropdownDay();
      break;
  }

  if (currentId.includes("day-down")) {
    document.getElementById("todo-type-selected-2").innerHTML = currentHtml;
    toggleDropdownDay();
  }

  if (currentId.includes("drop-down-")) {
    document.getElementById("todo-type-selected").innerHTML = currentHtml;
    toggleShowTasksDropdownForm();
  }
};
