$(document).ready(function() {
  // page is now ready, initialize the calendar...
  // options and github  - http://fullcalendar.io/

$('#calendar').fullCalendar({
    dayClick: function() {
        alert('a day has been clicked!');
    }
});

});
