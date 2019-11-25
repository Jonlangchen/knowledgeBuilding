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
	
	var Asteroid = function(x, y, radius, vX, vY, aX, aY) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		
		this.vX = vX;
		this.vY = vY;
		this.aX = aX;
		this.aY = aY;
	};
	
	var asteroids = new Array();
	
	for (var i = 0; i < 10; i++) {
		var x = 20 + (Math.random()*(canvasWidth-40));
		var y = 20 + (Math.random()*(canvasHeight-40));
		var radius = 5 + Math.random() * 10;
		
		var vX = Math.random()*4-2;
		var vY = Math.random()*4-2;
		var aX = Math.random()*0.2-0.1;
		var aY = Math.random()*0.2-0.1;
		
		asteroids.push(new Asteroid(x, y, radius, vX, vY, aX, aY));
	};
	
	function animate() {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		context.fillStyle = "rgb(255, 255, 255)";
		
		var asteroidsLength = asteroids.length;
		for (var i = 0; i < asteroidsLength; i++) {
			var tmpAsteroid = asteroids[i];
			
			tmpAsteroid.x += tmpAsteroid.vX;
			tmpAsteroid.y += tmpAsteroid.vY;
			
			if (Math.abs(tmpAsteroid.vX) < 10) {
				tmpAsteroid.vX += tmpAsteroid.aX;
			}
			
			if (Math.abs(tmpAsteroid.vY) < 10) {
				tmpAsteroid.vY += tmpAsteroid.aY;
			}
			
			if (Math.abs(tmpAsteroid.vX) > 0.1) {
				tmpAsteroid.vX *= 0.9;
			} else {
				tmpAsteroid.vX = 0;
			}
			
			if (Math.abs(tmpAsteroid.vY) > 0.1) {
				tmpAsteroid.vY *= 0.9;
			} else {
				tmpAsteroid.vY = 0;
			};
			
			context.beginPath();
			context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, false);
			context.closePath();
			context.fill();
			
			// 添加边界
			if (tmpAsteroid.x - tmpAsteroid.radius < 0) {
				tmpAsteroid.x = tmpAsteroid.radius;
				tmpAsteroid.vX *= -1;
				tmpAsteroid.aX *= -1;
			} else if (tmpAsteroid.x + tmpAsteroid.radius > canvasWidth) {
				tmpAsteroid.x = canvasWidth - tmpAsteroid.radius;
				tmpAsteroid.vX *= -1;
				tmpAsteroid.aX *= -1;
			};
			
			if (tmpAsteroid.y - tmpAsteroid.radius < 0) {
				 tmpAsteroid.y = tmpAsteroid.radius;
				 tmpAsteroid.vY *= -1;
				 tmpAsteroid.aY *= -1;
			} else if (tmpAsteroid.y + tmpAsteroid.radius > canvasHeight) {
				tmpAsteroid.y = canvasHeight - tmpAsteroid.radius;
				tmpAsteroid.vY *= -1;
				tmpAsteroid.aY *= -1;
			};
			
			for (var j = i + 1; j < asteroidsLength; j++) {
				var tmpAsteroidB = asteroids[j];
				var dX = tmpAsteroidB.x - tmpAsteroid.x;
				var dY = tmpAsteroidB.y - tmpAsteroid.y;
				var distance = Math.sqrt((dX*dX) + (dY*dY));
				// 弹开物体
				if (distance < tmpAsteroid.radius + tmpAsteroidB.radius) {
					var angle = Math.atan2(dY, dX);
					var sine = Math.sin(angle);
					var cosine = Math.cos(angle);
					
					var x = 0;
					var y = 0;
					
					var xB = dX * cosine + dY * sine;
					var yB = dY * cosine - dX * sine;
					
					var vX = tmpAsteroid.vX * cosine + tmpAsteroid.vY * sine;
					var vY = tmpAsteroid.vY * cosine - tmpAsteroid.vY * sine;
					
					var vXb = tmpAsteroidB.vX * cosine + tmpAsteroidB.vY * sine;
					var vYb = tmpAsteroidB.vY * cosine - tmpAsteroidB.vY * sine;
					
					vX *= -1;
					vXb *= -1;
					
					xB = x + (tmpAsteroid.radius + tmpAsteroidB.radius);
					
					tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine);
					tmpAsteroid.y = tmpAsteroid.y + (y * cosine - x * sine);
					
					tmpAsteroidB.x = tmpAsteroid.x + (xB * cosine - yB* sine);
					tmpAsteroidB.y = tmpAsteroid.y + (yB * cosine - xB * sine);
				
					tmpAsteroid.vX = vX * cosine - vY * sine;
					tmpAsteroid.vY = vY * cosine - vX * sine;
					
					tmpAsteroidB.vX = vXb * cosine - vYb * sine;
					tmpAsteroidB.vY = vYb * cosine - vXb * sine;
				}
			}
		};
		
		if (playAnimation) {
			setTimeout(animate, 33);
		};
	};
	animate();
});