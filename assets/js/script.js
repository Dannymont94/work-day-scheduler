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
    if ($("#currentDay").data("day") != dayOfMonth) {
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
    $(".task").each(function(){
        var dataHour = $(this).data("hour");

        // if time block is in the past
        if (currentHour > dataHour) { 
            $(this).removeClass("present");
            $(this).addClass("past");
        }
        // if time block is current
        else if (currentHour == dataHour) {
            $(this).removeClass("future");
            $(this).addClass("present");
        }
        // if time block is in the future
        else  {
            $(this).addClass("future");
        }
    });
}

// Click on a task to create/edit an event (replace .description with input)
$("#timeblocks").on("click", ".task", function(){
    var description = $(this).children(".description").text().trim();
    var textInput = $("<textarea>").val(description);
    $(this).children(".description").replaceWith(textInput);
    textInput.trigger("focus");
});

// click on a save button to replace text input with p.description and save description in localStorage
$("#timeblocks").on("click", ".saveBtn", function() {
    var description = $(this).siblings(".task").find("textarea").val();
    console.log(description);
    var taskP = $("<p>").addClass("description").text(description);
    $(this).siblings(".task").find("textarea").replaceWith(taskP);
});

// load tasks from localStorage when page refreshes (getItem)


renderCurrentDay();
auditTasks();

// audit date and tasks every minute
setInterval(auditCurrentDay, (1000 * 60));
setInterval(auditTasks, (1000 * 60));
