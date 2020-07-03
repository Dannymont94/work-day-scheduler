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
            $(this).closest("div").removeClass("present");
            $(this).closest("div").addClass("past");
        }
        // if time block is current
        else if (currentHour == dataHour) {
            $(this).closest("div").removeClass("future");
            $(this).closest("div").addClass("present");
        }
        // if time block is in the future
        else  {
            $(this).closest("div").addClass("future");
        }
    });
    console.log("tasks audited");
}

// Click on a time block to edit and enter an event (replace element with input)
$("#timeblocks").on("click", ".description", function(){
    var task = $(this).text().trim();
    var textInput = $("<textarea>").val(task);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

// replace text input with div Save task in localStorage when clicking the save button for that time block (savebtn onclick setItem)

// load tasks from localStorage when page refreshes (getItem)


renderCurrentDay();
auditTasks();

// audit date and tasks every minute
setInterval(auditCurrentDay, (1000 * 60));
setInterval(auditTasks, (1000 * 60));
