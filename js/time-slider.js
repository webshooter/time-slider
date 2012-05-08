/* time-slider.js */

var hr24  = false,
    start = 420, 
    end   = 720;

$(document).ready( function() {
    
    $("#timeslider").slider({
        range: true,
        min: 0,
        max: 1439,
        values: [start, end],
        step: 15,
        create: function(event, ui) {
            $("#timerange").text(findTime(start) + " - " + findTime(end) + " " + 
                            "[" + start + "," + end + "]");
            $("#duration").text(findDuration(start, end));
        },
        slide: function(event, ui) {
            var values = "[" + ui.values[0] + "," + ui.values[1] + "][" + (ui.values[1]-ui.values[0]) + "]";
            //alert(parseInt(ui.values[1]));
            if (parseInt(ui.values[1]) > 1425) {
                ui.values[1] = 1440;
            }
            if (parseInt(ui.values[0]) < 15) {
                ui.values[0] = 0;
            }
                starttime = findTime(ui.values[0]),
                endtime = findTime(ui.values[1]);
            $("#timerange").text(starttime + " - " + endtime + " " + values);
            $("#duration").text(findDuration(ui.values[0], ui.values[1]));
        }
	});
	
	$("body").find(".ui-slider-handle").each( function() {
		$(this).removeClass("ui-state-default")
		$(this).off("hover");
	});
	
});
    
function findTime(val) {
    var ampm = (!hr24)?"AM":"",
        hour = Math.floor(val/60);
        min  = val%60;
    
    if (hour == 0) { hour = 12; }
    if (!hr24 && hour > 12) {
        hour -= 12;
        ampm = "PM";
    }
    
    if (min == 0) { min = "0" + min; } 
    
    return hour + ":" + min + " " + ampm;
}

function findDuration(t1, t2) {
    var t = t2-t1,
        min = t%60,
        hours,
        duration;
    
    if (t < 60) {
        hours = 0;
    } else {
        hours = Math.floor(t/60);
    }
    
    if (hours > 0) {
        duration = hours + " hour";
        if (hours > 1) {
            duration = duration + "s";
        }
    }
    if (min > 0) {
        duration = duration + ", " + min + " minute";
        if (min > 1) {
            duration = duration + "s";
        }
    }
    return duration;
}