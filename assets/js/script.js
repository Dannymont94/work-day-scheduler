// Display today's date in #currentDay (moment() with format for day of the week, month, day, and year)
var currentDay = moment().format("dddd, MMMM Do, YYYY");
$("#currentDay").text(currentDay);

// perform above function automatically every 6 hours to keep #currentDay accurate 

// Time blocks are color-coded to indicate whether task is in the past, present, or future (audit tasks). 
function auditTasks() {
    // get current hour
    var currentHour = moment().format("H");

    // loop through each .description div and apply correct styling depending on currentHour
    $(".description").each(function(){
        var dataHour = $(this).data("hour");

        // if hour block is in the past
        if (currentHour > dataHour) {
            $(this).addClass("past");
        }
        else if (currentHour == dataHour) {
            $(this).addClass("present");
        }
        else  {
            $(this).addClass("future");
        }
    });
}

// Create timer function that reaudits tasks every 30 minutes

// Click on a time block to edit and enter an event (replace element with input)

// Save task in localStorage when clicking the save button for that time block (save onclick setItem)

auditTasks();