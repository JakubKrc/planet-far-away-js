let tilescanvas;
let tilescanvasCtx;

let tiletodraw=1;

let camera = new cameraclass()

let isMouseClickedOnMainCanvas = -1
let isObjectHoldWithMouse = false
let isObjectHoldWithMouseDifferenceX = 0;
let isObjectHoldWithMouseDifferenceY = 0;

let ifrm;

window.onload = function() {
	
	creategamecanvas();
	
	tilescanvas = document.getElementById('gameCanvas2');
	tilescanvasCtx = tilescanvas.getContext('2d');	
	
	document.addEventListener("keydown", keyPressed);
	
	document.getElementById("gameCanvas").addEventListener( "mousedown", isClickedOnMainCanvas)
	document.addEventListener( "mouseup" , function () {isMouseClickedOnMainCanvas = -1; isObjectHoldWithMouse = false });
	
	document.addEventListener("mousemove", mouseCoordinates);
	
    document.getElementById("gameCanvas2").addEventListener( "mousedown", setTileToDraw );
	document.getElementById("gameCanvas2").addEventListener( "wheel" , moveGraphicsPanel);


	
	loadImages();	
	
	drawstyle=0;

	emptyLevel()
	
	tilescanvasCtx.fillStyle='blue';
    tilescanvasCtx.fillRect(0,0,tilescanvas.width,tilescanvas.height);

    ifrm = document.getElementById('frame2');
    ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;

	Stillalmostnothing(0)
	
}

function imageLoadingDoneSoStartGame(){
	
	moveGraphicsPanel()
	
	setInterval(updateAll,1000/15);
}

let graphicsPanel = 0


function isClickedOnMainCanvas(evt) {
	
	isMouseClickedOnMainCanvas=evt.button
	
}

function moveGraphicsPanel(evt){
	
	if(typeof evt != "undefined"){
		
		if (evt.deltaY > 0) graphicsPanel+=3;
			else if (evt.deltaY< 0 && graphicsPanel>0)graphicsPanel-=3;
		
	}
			
	tilescanvasCtx.fillStyle='blue';
    tilescanvasCtx.fillRect(0,0,tilescanvas.width,tilescanvas.height);
	
	for (let i=0; i<42; i++){
		if(graphicsPanel + i < imageList.length)
			tilescanvasCtx.drawImage(gamePic[i + graphicsPanel],(i%3)*TILESDIMENSIONS,Math.floor(i/3)*TILESDIMENSIONS,TILESDIMENSIONS,TILESDIMENSIONS);
	}
	
	let x = ( (tiletodraw - graphicsPanel) %3 )
	let y = Math.floor((tiletodraw - graphicsPanel)/3)
		
	tilescanvasCtx.lineWidth = "2"
 	tilescanvasCtx.strokeStyle = "red"
    tilescanvasCtx.strokeRect(x*TILESDIMENSIONS,y*TILESDIMENSIONS,TILESDIMENSIONS,TILESDIMENSIONS)
		
}

function mouseCoordinates(evt){
	mousePos = getMousePos (canvas, evt);
}

function mouseContinualTilesDraw (){
	
	if(isMouseClickedOnMainCanvas==0) {
		if((mousePos.x>0)&&(mousePos.x<canvas.width))
	  		tiles[camera.startdrawtiley+(parseInt(mousePos.y/TILESDIMENSIONS))][camera.startdrawtilex+(parseInt(mousePos.x/TILESDIMENSIONS))]=tiletodraw;
	}
	
}

function setTileToDraw(evt){
				
	if( evt.button == 0 ){
		
		mousePos = getMousePos (tilescanvas, evt);
		if((mousePos.x>0)&&(mousePos.x<3*TILESDIMENSIONS))
			tiletodraw=(Math.floor(mousePos.y/TILESDIMENSIONS)*3 + graphicsPanel)
		if(mousePos.x>TILESDIMENSIONS) tiletodraw++;
		if(mousePos.x>TILESDIMENSIONS*2) tiletodraw++;
		if(tiletodraw>imageList.length-1) tiletodraw=imageList.length-1;
		moveGraphicsPanel()
			
	}
		
}


function createObject() {
	
	if(isMouseClickedOnMainCanvas!=2) return
	
	if(isObjectHoldWithMouse != true){
	
		selectedobject = whichObjectIsClickedOn(camera.x+parseInt(mousePos.x),camera.y+parseInt(mousePos.y))

		if (selectedobject == -1){
			setObject(selectedFromObjectList(),camera.x+parseInt(mousePos.x),camera.y+parseInt(mousePos.y))
		}

		if (selectedobject!=-1) displayValuesObjects()

		isObjectHoldWithMouse = true
		
		isObjectHoldWithMouseDifferenceX = camera.x+parseInt(mousePos.x) - objects[selectedobject].x;
		isObjectHoldWithMouseDifferenceY = camera.y+parseInt(mousePos.y) - objects[selectedobject].y;
	
	}
		
	if (isObjectHoldWithMouse == true && selectedobject!=-1){
		objects[selectedobject].x = camera.x+parseInt(mousePos.x) - isObjectHoldWithMouseDifferenceX
		objects[selectedobject].y = camera.y+parseInt(mousePos.y) - isObjectHoldWithMouseDifferenceY
	}	
	
}

function levelBoudariesLines(){
	    canvasCtx.strokeStyle = 'red';
		canvasCtx.beginPath();
		canvasCtx.moveTo(-camera.x, -camera.y);
		canvasCtx.lineTo(-camera.x + LEVELMAXX * TILESDIMENSIONS, -camera.y);
		canvasCtx.lineTo(-camera.x + LEVELMAXX * TILESDIMENSIONS, -camera.y + LEVELMAXY * TILESDIMENSIONS);
		canvasCtx.lineTo(-camera.x , -camera.y + LEVELMAXY * TILESDIMENSIONS);
		canvasCtx.lineTo(-camera.x , -camera.y );
		canvasCtx.stroke();
}


function updateAll(){
	mouseContinualTilesDraw()
	createObject()
	canvasCtx.fillStyle='black';
    canvasCtx.fillRect(0,0,canvas.width,canvas.height);
	camera.drawscreen();
	drawobjects();
	levelBoudariesLines();
}

function inputkeyboardcamerafollow (whichcamera, whichvalue, evt){

	if(evt.keyCode==65) whichcamera.x-=TILESDIMENSIONS
	if(evt.keyCode==68) whichcamera.x+=TILESDIMENSIONS
	if(evt.keyCode==87) whichcamera.y-=TILESDIMENSIONS
	if(evt.keyCode==83) whichcamera.y+=TILESDIMENSIONS
	
	if(evt.keyCode==81) {
		drawstyle+=1;
		if (drawstyle>2) drawstyle=0;
		console.log(drawstyle);
	}
	
	if(evt.keyCode==82) {
						
		whichObjectIsOnCoordinates(camera.x+parseInt(mousePos.x),camera.y+parseInt(mousePos.y))
		
	}
		
	whichcamera.followcamera()
	
}


function keyPressed(evt){
	
	inputkeyboardcamerafollow (camera, true, evt)
	
}

function keyReleased(evt){
	
	inputkeyboardcamerafollow (camera, false, evt)
	
}

function round(value, decimals) {
    return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
}
