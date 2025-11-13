let camera = new cameraclass()
let gameInterval;
let episode
let transitionCheckpoint = { level : "XXXX", leveltransitionname : "XXXX"}
let menuRow=1;
let menuMoje=0;
let menuReadMe=0;

window.onload = function() {

    creategamecanvas();
	
	document.getElementById('gameCanvas').addEventListener("click", function () {
		
		document.getElementById('gameCanvas').requestFullscreen()
		
  		/*if (elem.requestFullscreen) {
    		elem.requestFullscreen();
  		} else if (elem.webkitRequestFullscreen) { 
   		elem.webkitRequestFullscreen();
 		} else if (elem.msRequestFullscreen) { 
 		  elem.msRequestFullscreen();
		}*/
		
    	document.getElementById('gameCanvas').requestPointerLock()
		
	})
	
	document.getElementById('gameCanvas').addEventListener("mousemove", function (e) {
//    	console.log("Moved by " + e.movementX + ", " + e.movementY);
    })
	
	document.addEventListener("keydown", keyPressed); 
	document.addEventListener("keyup", keyReleased);
	
	episode = window.location.href
	episode = episode.slice(episode.indexOf('=')+1)
	episode = episode.replace("+","")
	episode = episode.replace("+","")
	
	loadImages();	

	eval (episode + "('start', 'start')")
	//Stillalmostnothing('start', 'start')
	
	camera.drawscreen();
	
}

function imageLoadingDoneSoStartGame(){
    console.log("setting interval")
    gameInterval=setInterval(updateAll,1000/60);
    //updateAll();
}

function updateAll(){
    canvasCtx.fillStyle='black';
    canvasCtx.fillRect(0,0,canvas.width,canvas.height);
	if(objects[activeplayer].downpressed)
		camera.y+=objects[activeplayer].speedfall;
	camera.followobject(objects[activeplayer])
	todoobjects();
	camera.drawscreen()
	drawActivePlayer()
    checkLifeEndGame()
}

function round(value, decimals) {
    return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
}