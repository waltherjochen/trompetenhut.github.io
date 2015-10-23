var canvasX = 0;
var canvasY = 0;
var playerWidth = 30;
var points = 0;			
var highscore;
var highscoreUser;
var counter;
var pause;
var gameLost;

var balls = [];
var balls2 = [];
var ballsWidth = 10;			
var timer = null;
var timer2 = null;
var speed = 10;

var box = [];
var box2 = [];
var boxWidth = 30;		
var timerBox = null;
var timerBox2 = null;
var speedBox = 1;				

function gameOver(){
  gameLost = true;
	stopAnimation();
	alert("Game Over! \npoints: " + points);

	if(points > highscore){					
		//highscoreUser = prompt("New Highscore! Please enter your name:","");
		localStorage.setItem("highscore", points);
		//localStorage.setItem("highscoreUser", highscoreUser);
	}

	for (var i = box.length - 1; i >= 1; i--) {
		document.getElementById('box-container').removeChild(box[i]);
	};

	for (var i = ball.length - 1; i >= 1; i--) {
		document.getElementById('ball-container').removeChild(ball[i]);
	};
	init();
	startAnimation();
	
}

function animateStuff() {
  if(!pause){
    for (var i=balls.length; i--;) {
      moveBall(balls[i]);
    } 
    for (var i=0; i < box.length; i++) {
      moveBox(box[i]);

      var str = box[i].src;
  	var res = str.split("/");
      if(box[i]._vY < 0){
  	  	if(box[i]._y - box[i]._vY <= 240){
  	  		if(res[res.length-1] == "Edelstein_rot.png"){
  	  			document.getElementById('box-container').removeChild(box[i]);
  	  		}else if(res[res.length-1] == "Edelstein_schwarz.png" || res[res.length-1] == "Edelstein_blau.png"){				  			
  	  			gameOver();
  	  		}
  		  	
  		  } 
  	}else if(box[i]._vY > 0){
  	  	if(box[i]._y + box[i]._vY > 285){
  	  		if(res[res.length-1] == "Edelstein_rot.png"){
  	  			document.getElementById('box-container').removeChild(box[i]);
  	  		}else if(res[res.length-1] == "Edelstein_schwarz.png" || res[res.length-1] == "Edelstein_blau.png" || res[res.length-1] == "Edelstein_orange.png"){
  	  			gameOver();
  	  		}
  		  	
  		  } 
  	}
    }
  } 		   
}

function startAnimation() {
  pause = false;
  document.getElementById('pause').hidden = true;
  if (!timer) timer = setInterval(animateStuff,20);
  if (!timerBox) timerBox = setInterval(createNewBox,20);
}

function stopAnimation() {
  pause = true;
  if(!gameLost){
    document.getElementById('pause').hidden = false;
  }else{
    no();
  }
  clearInterval(timer);
  timer = null;
  clearInterval(timerBox);
  timerBox = null;    
}					

function init() {
  balls = document.getElementById('ball-container').getElementsByTagName('img');
  box = document.getElementById('box-container').getElementsByTagName('img');   
  highscore = localStorage.getItem("highscore");		
  highscoreUser = 0;  
  counter = 0;
  pause = false;
  gameLost = false;

  if(highscore){
	   document.getElementById('highscore').innerHTML = "" + highscore;
  }else{
  	document.getElementById('highscore').innerHTML = "0";
  }
  points = 0;
  document.getElementById('points').innerHTML = "" + points;

  /*
    document.getElementById("achievment1").style.color = "black";
      document.getElementById("achievment2").style.color = "black";
      document.getElementById("achievment3").style.color = "black";
      document.getElementById("achievment4").style.color = "black";
      document.getElementById("achievment5").style.color = "black";
      document.getElementById("points").style.color = "black";*/


  
  
  initBall(balls[0], "");  
  getWindowCoords();
  startAnimation(); 			     
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function checkKeyPressed(e) {
    if (e.keyCode == "37") {
        createBall(document.getElementById('ball-container'), "left");
    }else if (e.keyCode == "39") {
        createBall(document.getElementById('ball-container'), "right");
    }else if (e.keyCode == "40") {
        createBall(document.getElementById('ball-container'), "down");
    }else if (e.keyCode == "38") {
        createBall(document.getElementById('ball-container'), "up");
    }else if (e.keyCode == "32") {
        if(pause){        
          startAnimation();
        }else{   
          stopAnimation();
        }
    }
}

function myFunction(e) {
    var x = e.clientX;
    var y = e.clientY;
    if(x >= document.getElementById("player").offsetLeft){
      createBall(document.getElementById('ball-container'), "right");
    }
    if(x < document.getElementById("player").offsetLeft){
      createBall(document.getElementById('ball-container'), "left");
    }
}

window.addEventListener('focus', function() {
    //startAnimation();
});

window.addEventListener('blur', function() {
    stopAnimation();
});
window.addEventListener("keydown", checkKeyPressed, false);
window.onload = init;
getWindowCoords = (navigator.userAgent.toLowerCase().indexOf('opera')>0||navigator.appVersion.toLowerCase().indexOf('safari')!=-1)?function() {
  canvasX = window.innerWidth;
  canvasY = 100;
}:function() {
  canvasX = document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth;
  canvasY = document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight;
}

window.onresize = getWindowCoords;