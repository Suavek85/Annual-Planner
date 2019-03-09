
export const doneTaskStyleCross = (el) => {
      
    if ( el.done === true ) {
  
    return 'text-decoration: line-through; color: grey;';
  
    } else {
  
      return '';
  
    }
  }

  export const doneTaskStyleIcon = (el) => {
      
    if ( el.done === true) {
    return 'display: inline-block;';
    } 
    
    else {
      return " ";
    }
  }
  
    
  
  export const typeDayIcon = (el) => {
  
    switch(el.type) {
      case "Home":
      return 'images/home-white.png';
      break;
      case "Sports":
      return 'images/barbell-white.png';
      break;
      case "Shopping":
      return 'images/shopping-white.png';
      break;
      case "Celebration":
      return 'images/celebrate-white.png';
      break;
      case "Learning":
      return 'images/learn-white.png';
      break;
      case "Appointment":
      return 'images/appointment-white.png';
      break;
      case "Health":
      return 'images/health-white.png';
      break;
      default:
      return 'images/home-white.png';
    }
  }
  
  
  export const typeDayBackground = (el) => {
  
    switch(el.type) {
      case "Home":
      return '#6B5B95';
      break;
      case "Sports":
      return '#2E4A62';
      break;
      case "Shopping":
      return '#009B77';
      break;
      case "Celebration":
      return '#BC70A4';
      break;
      case "Learning":
      return '#663399';
      break;
      case "Appointment":
      return '#A9754F';
      break;
      case "Health":
      return '#DC4C46';
      break;
      default:
      return '#6B5B95';
    }
  
  }
  
  export const isIndexEven = (value) => {
    if (value % 2 == 0)
        return '#F5F5F5'
    else
        return '#FFFFFF'
  }