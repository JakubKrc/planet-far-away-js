let stopGame=0;

function inputkeyboard (whichplayer, whichvalue, evt){
	
	if(evt.keyCode==whichplayer.keyleft) whichplayer.leftpressed=whichvalue
	if(evt.keyCode==whichplayer.keyright) whichplayer.rightpressed=whichvalue
	if(evt.keyCode==whichplayer.keyup) {
		whichplayer.uppressed=whichvalue
		if (!whichvalue) whichplayer.jumpkeyrelease=true //ak je pustene uptlacitko mozes skocit znova
	}
	
	if(evt.keyCode==whichplayer.keydown)  whichplayer.downpressed=whichvalue
	
	if(evt.keyCode==27 && stopGame==0)  menuMoje=1
	
	if(menuMoje>0){
		if(evt.keyCode==27 && stopGame==3) {
				menuMoje++;
				if(menuMoje>4){
					stopGame=0;
					menuMoje=0;
					imageLoadingDoneSoStartGame(); 
				}
		}
		if(evt.keyCode==38 ) menuRow-=0.5
		if(evt.keyCode==40) menuRow+=0.5
		if(menuRow<-0.5) menuRow=2
		if(menuRow>2.5) menuRow=0
		if(evt.keyCode==13 && menuRow==1 && menuReadMe!=1) {
			gameInterval=null;
			menuMoje=0;
			transitionCheckpoint.level = "XXXX";
			eval (episode + "('start', 'start')") 
			stopGame=0; 
			imageLoadingDoneSoStartGame(); 
		}
		if(evt.keyCode==13 && menuRow==0 && menuReadMe!=1 && transitionCheckpoint.level!="XXXX") {
			gameInterval=null;
			menuMoje=0;
			eval (episode + "('"+transitionCheckpoint.level+"', '"+transitionCheckpoint.leveltransitionname+"')") 
			stopGame=0; 
			imageLoadingDoneSoStartGame(); 
		}
		if(evt.keyCode==13 && menuRow==2 && menuReadMe!=1) {menuReadMe=1;menuMoje=1}
		if(evt.keyCode==27 && menuReadMe==1) {menuReadMe=0;menuMoje=1}
		menu();
	}

	
	if((evt.keyCode===13)&&(stopGame===1)&&(gameInterval===null)) {
		if(transitionCheckpoint.level!="XXXX")
			eval (episode + "('"+transitionCheckpoint.level+"', '"+transitionCheckpoint.leveltransitionname+"')");
		else eval (episode + "('start', 'start')")
		stopGame=0; 
		imageLoadingDoneSoStartGame(); 
	}
	
	if((evt.keyCode===13)&&(stopGame===2)&&(gameInterval===null)) {
		window.location.href = "../game.html";
	}
	
}


function keyPressed(evt){
	
	inputkeyboard (objects[activeplayer], true, evt)
	
}

function keyReleased(evt){
	
	inputkeyboard (objects[activeplayer], false, evt)
	
}

function todoobjects(){
	
	for(let i in objects){

		if (typeof objects[i].todo === "function")
			objects[i].todo();
		if (typeof objects[i].collisionAttack === "function")
 			objects[i].collisionAttack(objects[activeplayer])
		if (typeof objects[i].collisionGround === "function")
 			objects[i].collisionGround(objects[activeplayer])
		if (typeof objects[i].drawcamera === "function" && i!=activeplayer)
 			objects[i].drawcamera()
		if(objects[i].checkForDirectionalChange == true)
			objects.forEach(obj => {if (obj.constructor.name == "collisionbox" && (objects[i].constructor.name == obj.interactionClass || obj.interactionClass == "all" || objects[i].tag == obj.interactionTag)&& objects[i]!=obj) obj.changeMovementDirection(objects[i])})
	}	
	
}

function drawActivePlayer() {
	objects[activeplayer].drawcamera();
	objects[activeplayer].drawLife();
}


function checkLifeEndGame() {
	
	if(objects[activeplayer].life<1){
		
	  canvasCtx.font = "30px Comic Sans MS";
   	  canvasCtx.fillStyle = "red";
	  canvasCtx.textAlign = "center";
	  canvasCtx.fillText("MUHAHAHA", canvas.width/2, canvas.height/2); 
	  canvasCtx.font = "10px Comic Sans MS";
	  canvasCtx.fillText("press enter to continue from last checkpoint", canvas.width/2, canvas.height/2+35);
		
	  clearInterval(gameInterval)	
	  gameInterval=null;
	  stopGame=1;
	
	}
		
}

function winGame() {
		
	  canvasCtx.font = "30px Comic Sans MS";
   	  canvasCtx.fillStyle = "blue";
	  canvasCtx.textAlign = "center";
	  canvasCtx.fillText("YOU WON", canvas.width/2, canvas.height/2); 
	  canvasCtx.font = "10px Comic Sans MS";
	  canvasCtx.fillText("press enter to go to menu", canvas.width/2, canvas.height/2+35);
		
	  clearInterval(gameInterval)	
	  gameInterval=null;
	  stopGame=2;

}

function menu() {
	
	if(menuMoje==1){
		canvasCtx.drawImage(gamePic[59],0, 0);
		menuMoje=2
		stopGame=3;
		clearInterval(gameInterval)	
		
		if(menuReadMe==1){
			canvasCtx.font = "12px Comic Sans MS";
			 canvasCtx.fillStyle = "yellow"
			  canvasCtx.textAlign = "center";
			  canvasCtx.fillText("Use down key", canvas.width/2, canvas.height/2); 
			  canvasCtx.fillText("to look down.", canvas.width/2, canvas.height/2+20);
			  canvasCtx.fillText("Esc to menu.", canvas.width/2, canvas.height/2+40);
		}
	}
	
	if(menuReadMe==0){
		canvasCtx.font = "15px Comic Sans MS";
		 if(menuRow == 0) {
			canvasCtx.fillStyle = "red"; 
		 } else if(transitionCheckpoint.level == "XXXX") canvasCtx.fillStyle = "black"; else canvasCtx.fillStyle="blue";
		  canvasCtx.textAlign = "center";
		  canvasCtx.fillText("Checkpoint", canvas.width/2, canvas.height/2); 
		  if(menuRow == 1) canvasCtx.fillStyle = "red"; else canvasCtx.fillStyle="blue"
		  canvasCtx.fillText("NEW GAME", canvas.width/2, canvas.height/2+20);
		 if(menuRow == 2) canvasCtx.fillStyle = "red"; else canvasCtx.fillStyle="blue"
		  canvasCtx.fillText("ReadMe", canvas.width/2, canvas.height/2+40);
	}

}