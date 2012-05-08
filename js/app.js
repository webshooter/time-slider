/* app.js */
$(document).ready( function() {

	drawTickmarks($("#sunday"));

})

function drawTickmarks($day) {
	var $tickmarks = $day.find(".tickmarks");
	var $timeslider = $day.find("#timeslider");
	var interval = (parseInt($timeslider.width())/96) - 1;
	
	var html = "<div class=\"tick tick-lg\"></div>"
	var hourHtml = "<div class=\"tick tick-sm\"></div><div class=\"tick tick-sm\"></div><div class=\"tick tick-sm\"></div><div class=\"tick tick-lg\"></div>"
	for (var i=0; i<24; i++) {
		html += hourHtml;
	}
	$(html).appendTo($tickmarks);
	$(".tick").css("width",interval + "px");
}