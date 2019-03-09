import { mainArray} from './Days';

export const calculateProgress = (i) => {

    let currentTasksCount = mainArray[i].z.length;
    let currentTaskDone = 0;
    const progressBar = document.getElementById("progressbar");

    for (let k = 0; k < mainArray[i].z.length; k++) {

      if (mainArray[i].z[k].done == true) {

        currentTaskDone = currentTaskDone + 1;      

      }

    }


      const widthPercentage = Math.round(
        (currentTaskDone /currentTasksCount) * 100
      );
  
      if (
        isNaN(widthPercentage) ||
        widthPercentage === 0 ||
        widthPercentage === undefined
      ) {
        progressBar.style.width = "100%";
        progressBar.innerHTML = "0% completed";
        progressBar.style.backgroundColor = "#A4A4A4";
      } else {
        progressBar.style.width = widthPercentage + '%';
        progressBar.style.backgroundColor = "orange";
        if (widthPercentage > 40) {
          progressBar.innerHTML = widthPercentage + "% done";
        } else {
          progressBar.innerHTML = widthPercentage + "%";
        }
      }
}


export const clearProgress = () => {
  const progressBar = document.getElementById("progressbar");
  progressBar.style.width = "100%";
  progressBar.innerHTML = "0% completed";
  progressBar.style.backgroundColor = "#A4A4A4";
}