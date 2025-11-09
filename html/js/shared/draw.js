const TILESDIMENSIONS=16
const LEVELMAXX=70
const LEVELMAXY=70

let xdraw
let ydraw

let xdrawtile
let ydrawtile

let cameraclass = function () {

	this.x=0
	this.y=0
	
	this.cameraboundariesdontmovex=30
	this.cameraboundariesdontmovey=22
	
	this.startdrawtilex=0
	this.startdrawtiley=0
	
	this.startdrawscreenx=0
	this.startdrawscreeny=0
	
	this.followobject = function (objekt) {
		
		if (objekt.x > this.x - this.cameraboundariesdontmovex + (canvas.width/2)) this.x+=objekt.speedmovement;                 
		if (objekt.x < this.x + this.cameraboundariesdontmovex + (canvas.width/2)) this.x-=objekt.speedmovement;                 
		if (objekt.y < this.y - this.cameraboundariesdontmovey + (canvas.height/2)) this.y-=objekt.jumpspeed-objekt.speedfall;   
		if (objekt.y > this.y + this.cameraboundariesdontmovey + (canvas.height/2)) this.y+=objekt.speedfall;                    

		this.x=parseFloat(round(this.x,5))
		
		this.x=Math.floor(this.x)
		this.y=Math.floor(this.y)
		
		this.followcamera(objekt)

	}
	
	this.followcamera = function (objekt) {
		
		this.startdrawtilex = parseInt(this.x/TILESDIMENSIONS)
		this.startdrawtiley = parseInt(this.y/TILESDIMENSIONS)
		
		this.startdrawscreenx = this.x%TILESDIMENSIONS+1
		this.startdrawscreeny = this.y%TILESDIMENSIONS+1
		
	}
	
	this.drawscreen = function () {
		
		for (let y=this.startdrawtiley;y<this.startdrawtiley+(canvas.height/TILESDIMENSIONS)+1;y++)
			for (let x=this.startdrawtilex;x<this.startdrawtilex+(canvas.width/TILESDIMENSIONS)+1;x++)
				if(x>=0 && y>=0 && y<=tiles.length-1 && x <= tiles[y].length-1) 
					if(tiles[y][x]!=0) {
						if(tiles[y][x]==11 && drawstyle==1){
							canvasCtx.fillStyle='green';
    						canvasCtx.fillRect(-this.startdrawscreenx+(x-this.startdrawtilex)*TILESDIMENSIONS,-this.startdrawscreeny+(y - this.startdrawtiley)*TILESDIMENSIONS,16,16);
						}
						canvasCtx.drawImage(gamePic[tiles[y][x]],
							-this.startdrawscreenx+(x-this.startdrawtilex)*TILESDIMENSIONS, -this.startdrawscreeny+(y - this.startdrawtiley)*TILESDIMENSIONS);
					}	
	}

}


function drawobjects(){

	objects.map (obj => obj.drawcamera())
	
}


function setPlayerStartingPosition(levelentrance) {
	
	for(i in objects)
		if(objects[i].constructor.name=="leveltransitionclass")
			if(objects[i].leveltransitionname==levelentrance){
				objects[activeplayer].x=objects[i].x+2
				objects[activeplayer].y=objects[i].y
				camera.x=objects[i].x-canvas.width/2
				camera.y=objects[i].y-canvas.height/2
			}
	
}

function emptyLevel() {
    
    for (let i=0; i<LEVELMAXY; i++)
        for (let x=0; x<LEVELMAXX; x++)
	        tiles[i][x] = 0
    
    for (let i in objects)
		if (i>0)
        	delete objects[i]
    
}