/* time-block.js */

var mdown = false;
var mx = 0;
var my = 0;
var tbEnterX = 0;
var direction = null;
var marking_dir = null;
var marking = false;
var last_mx = null;

// $(window).mousedown( function (e) { 
// 	mdown = true;
// 	$("#mdown").html((mdown)?"true":"false");
// })
// 
// $(window).mouseup( function (e) { 
// 	mdown = false;
// 	$("#mdown").html((mdown)?"true":"false");
// })

// $(document).mousemove( function (e) {
// 	mx = e.pageX;
// 	my = e.pageY;
// 	$("#mousex").html(mx);
// 	$("#mousey").html(my);
// 	$("#mdown").html((mdown)?"true":"false");
// })

$(document).ready( function() {

	drawTimeblocks($("#sunday"));
	
	$(".timeblock").mousemove( function (e) {
		if (mdown) {
			if (last_mx != null) {
				if (e.pageX > last_mx) {
					direction = "right";
				} else if (e.pageX < last_mx) {
					direction = "left";
				}
				last_mx = e.pageX;
			} else {
				last_mx = e.pageX;
			}
			if (marking_dir == null) {
				marking_dir = direction;
			} 
			$("#mdir").html(direction);
		}
		mx = e.pageX;
		my = e.pageY
		$("#mousex").html(mx);
		$("#mousey").html(my);
		$("#mdown").html((mdown)?"true":"false");
	})
	
	$(".timeblock").mousedown( function (e) {
		mdown = true;
		if (!$(this).hasClass("timeblock-selected")) {
			marking = true;
			$(this).addClass("timeblock-selected");
		} else {
			marking = false;
			$(this).removeClass("timeblock-selected");
		}
	});
	
	$(".timeblock").mouseup( function (e) {
		mdown = false;
		marking_dir = null;
	});
	
	$(".timeblock").hover(
		function () { // enter
			if (mdown) {
				if (marking) {
					console.log(determineDirectionEnter($(this)) + "," + marking_dir);
					if (determineDirectionEnter($(this)) == marking_dir) {
						$(this).removeClass("timeblock-selected");
					} else {
						$(this).addClass("timeblock-selected");
					}
				} else {
					
				}
			}
		},
		function () { // exit
			if (mdown) {
				if (mx <= tbEnterX) {
					toggleTimeblockSelect($(this));
				}
			}
		}
	);

})

function drawTimeblocks($day) {
	if ($day) {
		var blockCount = 96, // 15 min intervals
		    blockHtml,
			dayHtml;
		for (var i=0; i<blockCount-1; i++) {
			blockHtml = "<div id=\"" + $day.attr("id") + "_" + i + "\" class=\"timeblock\"></div>";
			dayHtml += blockHtml; 
		}
		dayHtml += "<div id=\"" + $day.attr("id") + "_" + i + "\" class=\"timeblock timeblock-right-cap\"></div>";
		$(dayHtml).appendTo($day);
	}
}

function toggleTimeblockSelect($timeblock) {
		if (!$timeblock.hasClass("timeblock-selected")) {
			$timeblock.addClass("timeblock-selected");
		} else {
			$timeblock.removeClass("timeblock-selected");
		}
}

function determineDirectionEnter($timeblock) {
	if ($timeblock) {
		var left = $timeblock.offset().left;
		var right = left + $timeblock.outerWidth();
		var mid = left + ((right-left)/2);
		if (mx < mid) {
			return "left";
		} else {
			return "right";
		}
	}
}