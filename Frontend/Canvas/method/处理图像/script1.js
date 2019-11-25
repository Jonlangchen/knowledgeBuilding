$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		// 平移
		//context.translate(300, 100);
		
		// 旋转
		//context.rotate(Math.PI/4);
		
		var image = new Image();
		 image.src= "example.jpg";
		 $(image).load(function() {
			 // context.drawImage(image, 0, 0);
			 
			 context.drawImage(image, 0, 0, 500, 333);
			 
			 // 调整图像大小
			 // context.drawImage(image, 0, 0, 250, 250);
			 
			 
			 // 裁剪图像
			 //context.drawImage(image, 0, 0, 250, 250, 50, 50, 500, 500);
			 
			 // 左上角
			 // context.translate(50,50);
			 // context.drawImage(image, 0, 0, 500, 500, 0, 0, 200, 200);
			 
			 // 左下角
			 // context.setTransform(1,0,0,1,0,0); //重置变换矩阵
			 // context.translate(50,450);
			 // context.scale(1,-1);
			 // context.drawImage(image, 0, 0, 500, 500, 0, 0, 200, 200);
			 
			 // 右上角
			 // context.setTransform(1,0,0,1,0,0); //重置变换矩阵
			 // context.translate(450,450);
			 // context.scale(-1,-1);
			 // context.drawImage(image, 0, 0, 500, 500, 0, 0, 200, 200);
			 
			 // 右下角
			 // context.setTransform(1,0,0,1,0,0); //重置变换矩阵
			 // context.translate(450,50);
			 // context.scale(-1,1);
			 // context.drawImage(image, 0, 0, 500, 500, 0, 0, 200, 200);
		 });
		 // 调整图像大小时显示阴影
		 // context.shadowBlur = 20;
		 // context.shadowColor = "rgb(0,0,0)";
		 
		 
		 // 访问像素值1
		 // var imageData = context.getImageData(0,0,3,3); 3X3栅格
		 // var pixel = imageData.Data; //CanvansPixelArray
		 
		 // var red = pixel[0];
		 // var green = pixel[1];
		 // var blue = pixel[2];
		 // var alpha = pixel[3];
		 
		 // 访问像素值2
		 // var imageData = context.getImageData(0,0,3,3); 3X3栅格
		 // var width = imageData.width;
		 // var x = 2;
		 // var y = 2;
		 
		 // var pixelRed = ((y-1)*(width*4))+((x-1)*4);
		 // var pixelGreen = pixelRed + 1;
		 // var pixelBlue = pixelRed + 2;
		 // var pixelAlpha = pixelRed + 3;
		 
		 // 颜色拾取器
		 canvas.click(function(e) {
			 var canvasOffset = canvas.offset();
			 var canvasX = Math.floor(e.pageX-canvasOffset.left);
			 var canvasY = Math.floor(e.pageY-canvasOffset.top);
			 
			 var imageData = context.getImageData(canvasX, canvasY, 1, 1);
			 var pixel = imageData.data;
			 // var pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
			 var red = pixel[0];
			 var green = pixel[1];
			 var blue = pixel[2];
			 var alpha = pixel[3];
			 var pixelColor = "rgba("+ red +", "+ green +", "+ blue +", "+ alpha +")";
		 
				$("body").css("backgroundColor", pixelColor);
		 });
	}
	resizeCanvas();
});