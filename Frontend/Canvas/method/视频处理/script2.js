$(document).ready(function() {
	var video = $("#myVideo");
	
	$("#play").click(function() {
		video.get(0).play();
	});
	
	$("#stop").click(function() {
		video.get(0).pause();
	});
	
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	
	video.bind("play", function() {
		drawCanvas();
	});
	
	function drawCanvas() {
		if (video.get(0).paused || video.get(0).ended) {
			return false;
		}
		context.drawImage(video.get(0), 0,0,500,281);
	};
	
	
	var imageData = context.getImageData(0,0,canvas.width(),canvas.height());
	var pixels = imageData.data;
	
	context.clearRect(0,0,canvas.width(),canvas.height());
	
	var numTitleRows = 36;
	var numTitleCols= 64;
	
	var titleWidth = imageData.width/numTitleCols;
	var titleHeight = imageData.height/numTitleRows;
	
	for (var r = 0; r < numTitleRows; r++) {
		for (var c = 0; c < numTitleCols; c++) {
			var x = (c*titleWidth) + (titleWidth/2);
			var y = (r*titleHeight) + (titleHeight/2);
			
			var pos = (Math.floor(y)*(imageData.width*4))+(Math.floor(x)*4);
			
			var red = pixels[pos];
			var green = pixels[pos+1];
			var blue = pixels[pos+2];
			
			context.fillStyle = "rgb("+red+", "+green+", "+blue+")";
			context.fillRect(x-(titleWidth/2), y-(titleHeight/2), titleWidth, titleHeight);
		};
	};
	
	setTimeout(drawCanvas, 30);
});