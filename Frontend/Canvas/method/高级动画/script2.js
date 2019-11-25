$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();
	};
	
	resizeCanvas();
	
	var playAnimation = true;
	
	var startButton = $("#startAnimation");
	var stopButton = $("#stopAnimation");
	
	startButton.hide();
	startButton.click(function() {
		$(this).hide();
		stopButton.show();
		playAnimation = true;
		animate();
	});
	
	stopButton.click(function() {
		$(this).hide();
		startButton.show();
		playAnimation = false;
	});
	
	var Asteroid = function(x, y, radius, vX, vY) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		
		this.vX = vX;
		this.vY = vY;
	};
	
	var asteroids = new Array();
	
	for (var i = 0; i < 10; i++) {
		var x = 20 + (Math.random()*(canvasWidth-40));
		var y = 20 + (Math.random()*(canvasHeight-40));
		var radius = 5 + Math.random() * 10;
		
		var vX = Math.random()*4-2;
		var vY = Math.random()*4-2;
		
		asteroids.push(new Asteroid(x, y, radius, vX, vY));
	};
	
	function animate() {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		context.fillStyle = "rgb(255, 255, 255)";
		
		var asteroidsLength = asteroids.length;
		for (var i = 0; i < asteroidsLength; i++) {
			var tmpAsteroid = asteroids[i];
			
			tmpAsteroid.x += tmpAsteroid.vX;
			tmpAsteroid.y += tmpAsteroid.vY;
			
			context.beginPath();
			context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, false);
			context.closePath();
			context.fill();
		};
		if (playAnimation) {
			setTimeout(animate, 33);
		};
	};
	animate();
});