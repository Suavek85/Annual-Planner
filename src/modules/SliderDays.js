const rotateDayTypes = (dayTypesArray) => {

    const typeDayIcon = document.getElementById('type-day-icon');

    for (let i = 0; i < dayTypesArray.length; i++) {

      if ( typeDayIcon.src.includes(dayTypesArray[i]))  {

        if (i ===  dayTypesArray.length -1)  {
            typeDayIcon.src = dayTypesArray[0];
        } else {
            typeDayIcon.src = dayTypesArray[i + 1];
        } 
        break;
      } 
    }
  }


export const handleRotatingDayTypes = (currentId) => {

  switch(currentId) {
    case 'right-change-day':
      const dayTypesArray = ["images/work_icon.png", "images/dayoff_icon.png", "images/holidays_icon.png"];
      rotateDayTypes(dayTypesArray);
      break;
    case 'left-change-day':
      const dayTypesArray2 = ["images/holidays_icon.png", "images/dayoff_icon.png", "images/work_icon.png"];
      rotateDayTypes(dayTypesArray2);
      break;
  }
}