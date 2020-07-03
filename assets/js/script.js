// Display today's date in #currentDay (moment() with format for day of the week, month, day, and year)
function renderCurrentDay() {
    var currentDay = moment().format("dddd, MMMM Do, YYYY");
    $("#currentDay").text(currentDay).
        attr("data-day", moment().format("D"));
}

// perform above function automatically every 6 hours to keep #currentDay accurate and clear task lists on new days
function auditCurrentDay() {
    // get day of month
    var dayOfMonth = moment().format("D");

    // check if date has changed
    if ($("#currentDay").data("day") !== dayOfMonth) {
        // clear all timeblocks
        $(".description").each(function(){
          $(this).text("");
        });

        // render new date
        renderCurrentDay();
    }
}


// Time blocks are color-coded to indicate whether task is in the past, present, or future (audit tasks). 
function auditTasks() {
    // get current hour
    var currentHour = moment().format("H");

    // loop through each .description div and apply correct styling depending on currentHour
    $(".description").each(function(){
        var dataHour = $(this).data("hour");

        // if time block is in the past
        if (currentHour > dataHour) {
            $(this).addClass("past");
        }
        // if time block is current
        else if (currentHour == dataHour) {
            $(this).addClass("present");
        }
        // if time block is in the future
        else  {
            $(this).addClass("future");
        }
    });
}

// Click on a time block to edit and enter an event (replace element with input)

// replace text input with div Save task in localStorage when clicking the save button for that time block (savebtn onclick setItem)

// load tasks from localStorage when page refreshes (getItem)


renderCurrentDay();
auditTasks();

// audit date and tasks every minute
setInterval(auditCurrentDay, (1000 * 60));
setInterval(auditTasks, (1000 * 60));
