/**
 * Created by root on 16-6-7.
 */
<!-- FullCalendar -->

$(window).load(function() {

    var event,
        eventTask;

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            $('#fc_create').click();

            started = start;
            ended = end;

            $(".antosubmit").on("click", function() {
                var title = $("#title").val();
                if (end) {
                    ended = end;
                }

                categoryClass = $("#event_type").val();

                if (title) {
                    calendar.fullCalendar('renderEvent', {
                            title: title,
                            start: started,
                            end: end,
                            allDay: allDay
                        },
                        true // make the event "stick"
                    );
                }

                $('#title').val('');

                calendar.fullCalendar('unselect');

                $('.antoclose').click();

                return false;
            });
        },
        eventClick: function(calEvent, jsEvent, view) {
            $('#fc_edit').click();
            $('#title2').val(calEvent.title);

            categoryClass = $("#event_type").val();

            $(".antosubmit2").on("click", function() {
                calEvent.title = $("#title2").val();

                calendar.fullCalendar('updateEvent', calEvent);
                $('.antoclose2').click();
            });

            calendar.fullCalendar('unselect');
        },
        editable: false
    });

    $.ajax({
        type: "POST",
        url: "php/table.php",
        data: {
            method: "queryusertaskforcalendar"
        },
        success: function (response, status, hrx) {
            if (response) {
                var resJson = eval("([" + response + "])");
                var i = 1;
                event = new Array(resJson[0].tasknum);
                while(resJson[i]){
                    event[i-1]={
                        title: resJson[i].task_name,
                        start: resJson[i].start_time,
                        end  : resJson[i].end_time
                    };
                    i++;
                }

                $('#calendar').fullCalendar('addEventSource',event);
            }
        }
    });

    $.ajax({
        type: "POST",
        url: "php/table.php",
        data: {
            method: "queryusertaskcomplforcal"
        },
        success: function (response, status, hrx) {
            if (response) {
                var resJson = eval("([" + response + "])");
                var i = 1;
                eventTask = new Array(resJson[0].taskcomplenum);
                while (resJson[i]) {
                    eventTask[i - 1] = {
                        title: resJson[i].task_name,
                        start: resJson[i].start_time,
                        end: resJson[i].record_time,
                        color: '#F4A72D'
                    };
                    i++;
                }
                $('#calendar').fullCalendar('addEventSource',eventTask);
            }
        }
    });



});
<!-- /FullCalendar -->