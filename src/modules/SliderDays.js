const rotateDayTypes = (dayTypesArray) => {

    let i;
    const typeDayIcon = document.getElementById('type-day-icon');

    for (i = 0; i < dayTypesArray.length; i++) {

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

    //CHANGE DAY TYPE- RIGHT ARROW

    if (currentId === 'right-change-day') {

      const dayTypesArray = ["images/work_icon.png", "images/dayoff_icon.png", "images/holidays_icon.png"]

      rotateDayTypes(dayTypesArray);

    } 

    //CHANGE DAY TYPE- LEFT ARROW

    if (currentId == 'left-change-day') {

    const dayTypesArray = ["images/holidays_icon.png", "images/dayoff_icon.png", "images/work_icon.png"  ]

    rotateDayTypes(dayTypesArray);

  }
}