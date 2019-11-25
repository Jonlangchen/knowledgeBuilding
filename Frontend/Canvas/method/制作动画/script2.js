$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	// 更新/清除/绘制
	var x = 0;
	
	// 循环
	var playAnimation = true;
	
	var startButton = $("#startAnimation");
	var stopButton = $("#stopAnimation");
	
	startButton.hide();
	startButton.click(function() {
		$(this).hide();
		stopButton.show();
		
		palyAnimation = true;
		animate();
	});
	
	stopButton.click(function() {
		$(this).hide();
		startButton.show();
		
		playAnimation = false;
	});
	
	// var Shape = function(x, y) {
	// 	this.x = x;
	// 	this.y = y;
	// };
	
	// 随机产生形状
	var Shape = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	
	var shapes = new Array();
	// shapes.push(new Shape(50, 50, 10, 10));
	// shapes.push(new Shape(100, 100, 10, 10));
	// shapes.push(new Shape(150, 150, 10, 10));
	
	for (var i = 0; i < 10; i++) {
		var x = Math.random()*250;
		var y = Math.random()*250;
		var width = height = Math.random()*50;
		shapes.push(new Shape(x, y, width, height));
	}
	
	function animate() {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		
		var shapesLength = shapes.length;
		for (var i = 0; i < shapesLength; i++) {
			var tmpShape = shapes[i];
			// tmpShape.x++;
			
			// 改变方向
			// tmpShape.x += 2;
			// tmpShape.y++;
			
			// 随机方向
			// tmpShape.x += Math.random()*4-2;
			// tmpShape.y += Math.random()*4-2;
			
			// 圆周运动
			var angle= 30;
			var adjRatio = Math.cos(angle*(Math.PI/180)); //余弦-邻边-斜边
			var oppRatio = Math.sin(angle*(Math.PI/180)); //正弦-对边-斜边
			
			var radius= 10;
			tmpShape.x += radius * adjRatio;
			tmpShape.y += radius * oppRatio;
			
			context.fillRect(tmpShape.x, tmpShape.y, tmpShape.width, tmpShape.height);
		};
		
		if (playAnimation) {
			setTimeout(animate, 33);
		}
	};
	animate();
	// 动态调整 Canvas 大小
	// $(window).resize(resizeCanvas);
	
	// function resizeCanvas() {
	// 	canvas.attr("width", $(window).get(0).innerWidth);
	// 	canvas.attr("height", $(window).get(0).innerHeight);
		
	// 	animate();
	// }
	
	// resizeCanvas();
});