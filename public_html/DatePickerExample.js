/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Load the various selects needed
 * month and year.
 */
function loadSelects() {
   var dt = new Date();
   var month = dt.getMonth();
   var year = dt.getFullYear();
   loadYears(year);
   loadMonths(month,year);
}//loadSelects//
/**
 * Load the years drop down box.
 * minYear and maxYear control the number
 * of years.
 */
function loadYears(year) {
  //alert('hello');
   var minYear = 1950;
   var maxYear = 2030;
   var selectYear = document.getElementById("years");
   //var att1 = document.createAttribute("selected");
   for (i = minYear; i <= maxYear; i++) {
      var opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = i;
      if(year == i) {
         opt.setAttribute("selected","selected");
      }
      selectYear.appendChild(opt);
   }//for//
}
        /**
 * Load the months drop down box
 * with the 12 months of the year.
 */
function loadMonths(month,year) {
   var monthNames = ["January", "February", "March",     "April",   "May",      "June",
                     "July",    "August",   "September", "October", "November", "December"
                    ];
   var selectMonth = document.getElementById("months");
   //var att2 = document.createAttribute("selected"); -- depricated
   for (i=0; i < monthNames.length; i++) {
       var opt = document.createElement("option");
       opt.value = monthNames[i];
       opt.innerHTML = monthNames[i];
       if(month == i) {
          //opt.setAttributeNode(att2);
          opt.setAttribute("selected","selected");
       }
       selectMonth.appendChild(opt);
   }//for//
   dateDays();
}
/**
 * Load the number of days in the calendar for
 * the specified month.
 */
function dateDays() {
   var currentDate = new Date();
   var yearDate = currentDate.getFullYear();
   var monthDate = currentDate.getMonth() + 1;
   var dayDate = currentDate.getDate();
   //alert(monthDate + "/" + dayDate + "/" + yearDate);
   var message = document.getElementById("message");
   message.removeAttribute("style");
   message.innerHTML="";
   var month = document.getElementById("months").value;
   var monthNum = getNumericMonth(month);
   var year = document.getElementById("years").value;
   var x = document.getElementById("daypicker");
   for(p=1; p < 4; p++) {
       deleteADay(x,"-");
   }
   for(q=1; q < 32; q++) {
       deleteADay(x,q);
   }
   var datebox = document.getElementById("datebox");
   datebox.value="";
   //alert(month);

   var message = document.getElementById("message");
   if(isNaN(year) || monthNum == 0) {
      message.innerHTML = "Select Month/Year.";
      message.style.color = "red";
      return;
   }
   else {
      var date = new Date(year,monthNum - 1,1);
      var offset = date.getDay();
      for(i=0; i < offset; i++) {
          createABlankDay(x,i);
      }//for//
   }
   // 30 day months
   if (month == "April"     || 
       month == "June"      ||
       month == "September" ||
       month == "November") {

       for(k=1; k < 31; k++) {
           createADay(x,k);
       }//for//
       if(year == yearDate && monthNum == monthDate) {
          decorateCurrentDay(dayDate);
       }//if//
       var date = new Date(year,monthNum,0);
       var offset = date.getDay();
       for(i=0; i < 6 - offset; i++) {
           createABlankDay(x,i);
       }//for//
   }//if//

   // 28 day months
   if (month == "February") {
       var year = document.getElementById("years").value;
       //alert(isNaN(year) + " " + year); 
       for(i=1; i < 29 + leapDay(year); i++) {
           createADay(x,i);
       }//for//
       if(year == yearDate && monthNum == monthDate) {
          decorateCurrentDay(dayDate);
       }//if//
       var date = new Date(year,monthNum,0);
       var offset = date.getDay();
       for(i=0; i < 6 - offset; i++) {
           createABlankDay(x,i);
                }//for//
   }//if//

   // 31 day months
   if (month == "January" ||
       month == "March"   ||
       month == "May"     ||
       month == "July"    ||
       month == "August"  ||
       month == "October" ||
       month == "December" ) {

       for(k=1; k < 32; k++) {
           createADay(x,k);
       }//for//
       if(year == yearDate && monthNum == monthDate) {
          decorateCurrentDay(dayDate);
       }//if//
       var date = new Date(year,monthNum,0);
       var offset = date.getDay();
       for(i=0; i < 6 - offset; i++) {
           createABlankDay(x,i);
       }//for//
   }//if//
}
/**
 * Changing date years. Remove entries in 
 * date box. If the year is not a number
 * send error message and clear the 
 * calendar days.
 */
function dateYears() {
   var message = document.getElementById("message");
   message.removeAttribute("style");
   message.innerHTML="";
   var year = document.getElementById("years").value;

   var datebox = document.getElementById("datebox");
   datebox.value="";
   // Remove Style from previous elements
   for(i=1; i <= 32; i++) {
       var id2 = "a" + i;
       if(document.getElementById(id2) != null) {
          document.getElementById(id2).removeAttribute("style");
       }//if//
   }//for//

    if (isNaN(year)) {
        message.style.color = "red";
        message.innerHTML="Select Month/Year";
        clearCalendarDays("daypicker");
    }//if//
    else {
        dateDays();
    }//else//
}//dateYears//
/**
 * When the user selects a day highlight
 * the entry and populate the date box.
 * then hide the calendar.
 */
function selectDay(day) {
   //alert("DaySelected is " + u);
   var id = "a" + day;
   var month = document.getElementById("months").value;
   var year = document.getElementById("years").value;
   var message = document.getElementById("message");
   // Remove Style from previous elements
   for(i=1; i <= 32; i++) {
       var id2 = "a" + i;
       if(document.getElementById(id2) != null) {
          document.getElementById(id2).removeAttribute("style");
       }//if//
   }//for//
   if(isNaN(year)) {
      message.style.color = "red";
      message.innerHTML = "Select A Year";
   }
   else {
      message.removeAttribute("style");
      message.innerHTML="";
      document.getElementById(id).style.backgroundColor = "white";
      document.getElementById(id).style.color = "red";
      document.getElementById(id).style.fontWeight = "bold";
      var dayString = "";
      if(day < 10) {
         dayString = "0" + day;
      }//if//
      else {
         dayString = "" + day;
      }//else//
      var selectedDate = getNumericMonth(month) + "/" + dayString + "/" + year;
      document.getElementById("datebox").value = selectedDate;
      showHideCalendar('datepicker');
   }//else//
}//selectDays//
/**
 * Create a new element in the 
 * calendar. The inner HTML will 
 * be a number from 1 to 31 and 
 * the element will be selectable.
 */
function createADay(x,y) {
    var opt = document.createElement("a");
    opt.innerHTML = y;
    //var att1 = document.createAttribute("class"); -- depricated
    //att1.value = "datelive";
    //var att2 = document.createAttribute("onclick"); -- depricated
    var func = "selectDay(" + y + ")";
    //att2.value = func;
    //var att3 = document.createAttribute("id");
    //att3.value = "a" + y;
    //opt.setAttributeNode(att1); -- depricated
    opt.setAttribute("class","datelive");
    //opt.setAttributeNode(att2); -- depricated
    opt.setAttribute("onclick", func);
    //opt.setAttributeNode(att3); -- depricated
    opt.setAttribute("id","a" + y);
    x.appendChild(opt);
}
/**
 * Create a new element in the
 * calendar. The inner HTML will
 * be a "-" symbol. The element will 
 * not be selectable.
 */
function createABlankDay(x,y) {
    var opt = document.createElement("a");
    opt.innerHTML = "-";
    //var att1 = document.createAttribute("class"); -- depricated
    //att1.value = "datelive";
    //opt.setAttributeNode(att1); -- depricated
    opt.setAttribute("class","datelive");
    x.appendChild(opt);
}
/**
 * Delete an element from the calendar.
 */
function deleteADay(x,y) {
    for(i=0; i < x.childNodes.length; i++) {
        if(x.childNodes[i].innerHTML == y) {
           x.removeChild(x.childNodes[i]);
        }//if//
    }//for//
}//deleteADay//
/**
 * Get a numeric form of the month
 * for a given string ie. "January" = 01.
 */
function getNumericMonth(monthString) {
    var monthNumber="00";
    switch (monthString) {
        case "January":
            monthNumber = "01";
            break;
        case "February":
            monthNumber = "02";
            break;
        case "March":
            monthNumber = "03";
            break;
        case "April":
            monthNumber = "04";
            break;
        case "May":
            monthNumber = "05";
            break;
        case "June":
            monthNumber = "06";
            break;
        case "July":
            monthNumber = "07";
            break;
        case "August":
            monthNumber = "08";
            break;
        case "September":
            monthNumber = "09";
            break;
        case "October":
            monthNumber = "10";
            break;
        case "November":
            monthNumber = "11";
            break;
        case "December":
            monthNumber = "12";
            break;

    }//switch//
    return monthNumber;
}//getNumericMonth//
/**
 *
 * Decorate the current date.
 * Change the color to red with white background; 
 *
 */
function decorateCurrentDay(dayDate) {
    var dayDateId = "a" + dayDate;
    var selection = document.getElementById(dayDateId);
    if(selection != null) {
       selection.style.color = "red";
       selection.style.backgroundColor = "white";
       selection.style.fontWeight = "bold";
    }//if//
}//decorateCurrentDay//
/**
 * Change the display style of the calendar.
 * Toggle between display or hidden.
 */
function showHideCalendar(id) {
    var element = document.getElementById(id);
    //alert(element.style.display);
    /*
    if(element.style.display == 'none' || element.style.display == '') {
       element.style.display = 'block';
    }
    else {
       element.style.display = 'none';
    }
    */
    element.style.display = element.style.display === 'none' || element.style.display === '' ? 'block' : 'none';
}//showHideCalendar//
/**
 * Remove the calendar elements
 * from the DOM tree.
 */
function clearCalendarDays(element) {
    x = document.getElementById(element);
    for(p=1; p < 7; p++) {
        deleteADay(x,"-");
    }//for//
    for(q=1; q < 32; q++) {
        deleteADay(x,q);
    }//for//
}//clearCalendarDays//
/**
 * Leap Day. Return 1
 * if this day is a leap day else
 * return 0.
 */
function leapDay (year) {
    var divisibleBy4 = false;
    var divisibleBy100 = false;
    var divisibleBy400 = false;
    var leapDay = 0;
    //alert("year = " + year);
    var rem4 = year % 4;
    if(rem4 == 0) {
       divisibleBy4 = true;
    }//if//
    rem100 = year % 100;
    if(rem100 == 0) {
       divisibleBy100 = true;
    }//if//
    rem400 = year % 400;
    if(rem400 == 0) {
       divisibleBy400 = true;
    }//if//
    if(divisibleBy4 == true && divisibleBy100 == false) {
       //alert("Leap Year " + year);
       leapDay = 1;
    }//if//
    if(divisibleBy4 == true && divisibleBy100 == true && divisibleBy400 == true) {
       //alert("Leap Year " + year);
       leapDay = 1;
    }//if//
    return leapDay;
}//leapDay//

