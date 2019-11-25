$(document).ready(function() {
	var video = $("#myVideo");
	
	$("#play").click(function() {
		video.get(0).play();
	});
	
	$("#stop").click(function() {
		video.get(0).pause();
	});
});