// 核心功能
$(document).ready(function(){
	var canvas = $("#gameCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 画布尺寸
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	
	// 游戏设置
	var playGame;
	// 创建平台
	var platformX;
	var platformY;
	var platformOuterRadius;
	var platformInterRadius;
	// 创建小行星
	var asteroids;
	// 创建玩家小行星
	var player;
	var playerOriginalX;
	var playerOriginalY;
	// 建立事件监听器
	var playerSelected;
	var playerMaxAbsVelocity;
	var playerVelocityDampener;
	var powerX;
	var powerY;
	// 更新分数
	var score;
	
	// 激活用户界面
	var ui = $("#gameUI");
	var uiIntro = $("#gameIntro");
	var uiStats = $("#gameStats");
	var uiComplete = $("#gameComplete");
	var uiPlay = $("#gamePlay");
	var uiReset = $("#gameReset");
	var uiRemaining = $("#gameRemaining");
	var uiScore = $(".gameScore");
	
	// 创建小行星
	var Asteroid = function(x, y, radius, mass, friction) {
		this.x =x;
		this.y = y;
		this.radius = radius;
		this.mass = mass;
		this.friction = friction;
		this.vX = 0;
		this.vY = 0;
		this.player = false;
	};
	
	// Reset player 重置 player 
	function resetPlayer() {
		player.x = playerOriginalX;
		player.y = playerOriginalY;
		player.vX = 0;
		player.vY = 0;
	};
	
	// 重置和启动游戏
	function startGame() {
		uiScore.html("0");
		uiStats.show();
		
		// 初始游戏设置
		playGame = false;
		// 创建平台
		platformX = canvasWidth/2;
		paltformY = 150;
		platformOuterRadius = 100;
		platformInnerRadius = 75;
		// 创建小行星
		asteroids = new Array();
		// 创建玩家小行星
		playerOriginalX = canvasWidth/2;
		playerOriginalY = canvasHeight-150;
		// 建立事件监听
		playerSelected = false;
		playerMaxAbsVelocity = 30;
		playerVelocityDampener = 0.3;
		powerX = -1;
		powerY = -1;
		// 更新分数
		score = 0;
		
		// 创建玩家小行星
		var pRadius = 15;
		var pMass = 10;
		var pFriction = 0.97;
		player = new Asteroid(playerOriginalX, playerOriginalY, pRadius, pMass, pFriction);
		player.player = true;
		asteroids.push(player);
		
		// 创建小行星
		var outerRing = 8; // 外圈上的小行星数目
		var ringCount = 3; // 圈数
		var ringSpaceing = (platformInnerRadius/(ringCount-1)); //每个圈之间的距离
		
		for (var r = 0; r < ringCount; r++) {
			var currentRing = 0; //当前圈上的小行星数目
			var angle = 0; // 每颗小行星之间的角度
			var ringRadius = 0;
			// 这是最里面的圈?
			if (r == ringCount - 1) {
				currentRing = 1;
			} else {
				currentRing = outerRing - (r*3);
				angle= 360 / currentRing;
				ringRadius = platformInterRadius - (ringSpaceing*r);
			}
			for (var a = 0; a < currentRing; a++) {
				var x = 0;
				var y = 0;
				// 这是最里面的圈?
				if (r == ringCount - 1) {
					x = platformX;
					y = platformY;
				} else {
					x = platformX + (ringRadius*Math.cos((angle*a)*(Math.PI/180)));
					y = platformY + (ringRadius*Math.sin((angle*a)*(Math.PI/180)));
				};
				
				var radius = 10;
				var mass = 5;
				var friction = 0.95;
				asteroids.push(new Asteroid(x, y, radius, mass, friction));
			};
		};
		// 更新UI
		uiRemaining.html(asteroids.length-1);
		
		// 建立事件监听
		// Code from Chapter 5 (Accessing pixel values)
		$(window).mousedown(function(e) {
			// 选中玩家使用的小行星
			if (!playerSelected && player.x == playerOriginalX && player.y == playerOriginalY) {
				var canvasOffset = canvas.offset();
				var canvasX = Math.floor(e.pageX-canvasOffset.left);
				var canvasY = Math.floor(e.pageY-canvasOffset.top);
				
				if (!playGame) {
					playGame = true;
					animate();
				};
				
				var dX = player.x-canvasX;
				var dY = player.y-canvasY;
				var distance = Math.sqrt((dX*dX)+(dY*dY));
				var padding = 5;
				
				if (distance < player.radius+padding) {
					powerX = player.x;
					powerY = player.y;
					playerSelected = true;
				};
			};
		});
		
		$(window).mousemove(function(e) {
			// 增加力度
			if (playerSelected) {
				var canvasOffset = canvas.offset();
				var canvasX = Math.floor(e.pageX-canvasOffset.left);
				var canvasY = Math.floor(e.pageY-canvasOffset.top);
			
				var dX = canvasX-player.x;
				var dY = canvasY-player.y;
				var distance = Math.sqrt((dX*dX)+(dY*dY));
				
				if (distance*playerVelocityDampener < playerMaxAbsVelocity) {
					powerX = canvasX;
					powerY = canvasY;
				} else {
					var ratio = playerMaxAbsVelocity/(distance*playerVelocityDampener);
					powerX = player.x+(dX*ratio);
					powerY = player.y+(dY*ratio);
				};
			};	
		});
		
		$(window).mouseup(function(e) {
			// 让玩家使用的小行星动起来
			if (playerSelected) {
				var dX = powerX-player.x;
				var dY = powerY-player.y;
		
				player.vX = -(dX*playerVelocityDampener);
				player.vY = -(dY*playerVelocityDampener);
				
				uiScore.html(++score);
			};
			
			playerSelected = false;
			powerX = -1;
			powerY = -1;
		});
		
		//开始动画循环
		animate();
	};
	
	// 初始化游戏环境
	function init() {
		// 激活用户界面
		uiStats.hide();
		uiComplete.hide();
		
		uiPlay.click(function(e) {
			e.preventDefault();
			uiIntro.hide();
			startGame();
		});
		
		uiReset.click(function(e) {
			e.preventDefault();
			uiComplete.hide();
			startGame();
		});
	};
	
	// 动画循环,游戏的趣味性就在这里
	function animate() {
		// 清除
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		// 创建平台
		context.fillStyle = "rgb(100, 100, 100)";
		context.beginPath();
		context.arc(platformX, paltformY, platformOuterRadius, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		
		// Draw player power line 可视化用户输入
		if (playerSelected) {
			context.strokeStyle = "rgb(255, 255, 255)";
			context.lineWidth = 3;
			context.beginPath();
			context.moveTo(player.x, player.y);
			context.lineTo(powerX, powerY);
			context.closePath();
			context.stroke();
		};
		
		// 让对象动起来
		context.fillStyle = "rgb(255, 255, 255)";
		var deadAsteroids = new Array(); //从平台上删除小行星
		var asteroidsLength = asteroids.length;
		for (var i = 0; i < asteroidsLength; i++) {
			var tmpAsteroid = asteroids[i];
			
			for (var j = i+1; j < asteroidsLength; j++) {
				var tmpAsteroidB = asteroids[j];
				// 碰撞检测
				var dX = tmpAsteroidB.x - tmpAsteroid.x;
				var dY = tmpAsteroidB.y - tmpAsteroid.y;
				var distance = Math.sqrt((dX*dX)+(dY*dY));
				
				if (distance < tmpAsteroid.radius + tmpAsteroidB.radius) {								
					var angle = Math.atan2(dY, dX);
					var sine = Math.sin(angle);
					var cosine = Math.cos(angle);
					
					// Rotate asteroid position 旋转小行星的位置
					var x = 0;
					var y = 0;
					
					// Rotate asteroidB position 旋转小行星B的位置
					var xB = dX * cosine + dY * sine;
					var yB = dY * cosine - dX * sine;
						
					// Rotate asteroid velocity 旋转小行星的速度
					var vX = tmpAsteroid.vX * cosine + tmpAsteroid.vY * sine;
					var vY = tmpAsteroid.vY * cosine - tmpAsteroid.vX * sine;
					
					// Rotate asteroidB velocity 旋转小行星B的速度
					var vXb = tmpAsteroidB.vX * cosine + tmpAsteroidB.vY * sine;
					var vYb = tmpAsteroidB.vY * cosine - tmpAsteroidB.vX * sine;
					
					// Conserve momentum 保持动量
					var vTotal = vX - vXb;
					vX = ((tmpAsteroid.mass - tmpAsteroidB.mass) * vX + 2 * tmpAsteroidB.mass * vXb) / (tmpAsteroid.mass + tmpAsteroidB.mass);
					vXb = vTotal + vX;
					
					// Move asteroids apart
					// CHANGE THIS IN PREVIOUS CHAPTER 将小行星分开
					xB = x + (tmpAsteroid.radius + tmpAsteroidB.radius);
					
					// Rotate asteroid positions back 转回小行星的位置
					tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine);
					tmpAsteroid.y = tmpAsteroid.y + (y * cosine + x * sine);
					
					tmpAsteroidB.x = tmpAsteroid.x + (xB * cosine - yB * sine);
					tmpAsteroidB.y = tmpAsteroid.y + (yB * cosine + xB * sine);
					
					// Rotate asteroid velocities back 转回小行星的速度
					tmpAsteroid.vX = vX * cosine - vY * sine;
					tmpAsteroid.vY = vY * cosine + vX * sine;
					
					tmpAsteroidB.vX = vXb * cosine - vYb * sine;
					tmpAsteroidB.vY = vYb * cosine + vXb * sine;
				};
			};
			// Calculate new position 计算新位置
			tmpAsteroid.x += tmpAsteroid.vX;
			tmpAsteroid.y += tmpAsteroid.vY;
			
			// Friction 摩擦力
			if (Math.abs(tmpAsteroid.vX) > 0.1) {
				tmpAsteroid.vX *= tmpAsteroid.friction;
			} else {
				tmpAsteroid.vX = 0;
			};
			
			if (Math.abs(tmpAsteroid.vY) > 0.1) {
				tmpAsteroid.vY *= tmpAsteroid.friction;
			} else {
				tmpAsteroid.vY = 0;
			};
			
			// 从平台上删除小行星
			if (!tmpAsteroid.player) {
				var dXp = tmpAsteroid.x - platformX;
				var dYp = tmpAsteroid.y - platformY;
				var distanceP = Math.sqrt((dXp*dXp)+(dYp*dYp));
				if (distanceP > platformOuterRadius) {
					// Kill asteroid
					if (tmpAsteroid.radius > 0) {
						tmpAsteroid.radius -= 2;
					} else {
						deadAsteroids.push(tmpAsteroid);
					};
				};
			};
			// 重置 player
			// Check to see if you need to reset the player
			// If player was moving, but is now still
			if (player.x != playerOriginalX && player.y != playerOriginalY) {
				if (player.vX == 0 && player.vY == 0) {
					resetPlayer();
				} else if (player.x+player.radius < 0) {
					resetPlayer();
				} else if (player.x-player.radius > canvasWidth) {
					resetPlayer();
				} else if (player.y+player.radius < 0) {
					resetPlayer();
				} else if (player.y-player.radius > canvasHeight) {
					resetPlayer();
				};
			};
			
			context.beginPath();
			context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
		};
		
		var deadAsteroidsLength = deadAsteroids.length;
		if (deadAsteroidsLength > 0) {
			for (var di = 0; di < deadAsteroidsLength; di++) {
				var tmpDeadAsteroid = deadAsteroids[di];
				asteroids.splice(asteroids.indexOf(tmpDeadAsteroid), 1);
			};
			// 不算玩家投掷的小行星
			var remaining = asteroids.length-1; // Remove player from asteroid count
			uiRemaining.html(remaining);
			
			if (remaining == 0) {
				// Winner! 获胜
				playGame = false;
				uiStats.hide();
				uiComplete.show();
		
				// Reset event handlers
				$(window).unbind("mousedown");
				$(window).unbind("mouseup");
				$(window).unbind("mousemove");
			};
		};
		
		if (playGame) {
			// 33毫秒后再次运行动画循环
			setTimeout(animate, 33);
		};
	};
	init();
});