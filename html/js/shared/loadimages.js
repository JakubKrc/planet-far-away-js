let gamePic=[];

const PLAYER=0;

let imageList;

function loadImages(){
	
	imageList = [
		 "graphics/player/player1.png",
		 "graphics/tiles/dirt1.png",
		 "graphics/tiles/dirt2.png",
		 "graphics/tiles/lava.png",
		 "graphics/tiles/voda.png",
		 "graphics/tiles/trava.png",
		 "graphics/tiles/dvere.png",
		"graphics/tiles/dvereend.png",
		 "graphics/tiles/enemy1.png",
		"graphics/tiles/enemy2.png",
		"graphics/tiles/fenemy1.png",
		"graphics/tiles/invisible.png",
		"graphics/tiles/tree1.png",
		"graphics/tiles/tree2.png",
		"graphics/tiles/tile1.png",
		"graphics/tiles/tile2.png",
		"graphics/tiles/tile3.png",
		"graphics/tiles/tile4.png",
		"graphics/tiles/tile5.png",
		"graphics/tiles/tile6.png",
		"graphics/tiles/tile7.png",
		"graphics/tiles/tile8.png",
		"graphics/tiles/tile9.png",
		"graphics/tiles/tile10.png",
		"graphics/tiles/tile11.png",
		"graphics/tiles/tile12.png",
		"graphics/tiles/tile13.png",
		"graphics/tiles/tile14.png",
		"graphics/tiles/apple.png",
		"graphics/tiles/rock1.png",
		"graphics/tiles/rock2.png",
		"graphics/tiles/rock3.png",
		"graphics/tiles/rock4.png",
		"graphics/tiles/rock5.png",
		"graphics/tiles/rock6.png",
		"graphics/tiles/rock7.png",
		"graphics/tiles/rock8.png",
		"graphics/tiles/rock9.png",
		"graphics/tiles/rocklava1.png",
		"graphics/tiles/rocklava2.png",
		"graphics/tiles/rocklava3.png",
		"graphics/tiles/rockdoor.png",
		"graphics/tiles/skriatok.png",
		"graphics/tiles/suter1.png",
		"graphics/tiles/suter2.png",
		"graphics/tiles/suter3.png",
		"graphics/tiles/suter4.png",
		"graphics/tiles/suter5.png",
		"graphics/tiles/suter6.png",
		"graphics/tiles/suter7.png",
		"graphics/tiles/suter8.png",
		"graphics/tiles/suter9.png",
		"graphics/tiles/suter10.png",
		"graphics/tiles/suter11.png",
		"graphics/tiles/suter12.png",
		"graphics/tiles/suter13.png",
		"graphics/tiles/suterhrib.png",
		"graphics/tiles/suterkvapel.png",
		"graphics/tiles/skriatok2.png",
		"graphics/tiles/menu.png",
		"graphics/tiles/checkpoint1.png",
		"graphics/tiles/checkpoint2.png"

	]
		
	picsToLoad =imageList.length;
	
	for (let i=0; i<imageList.length; i++){
		gamePic[i]=document.createElement("img");
		gamePic[i].onload=countLoadedImagesAndLaunchIfReady;
		gamePic[i].src=imageList[i];
	}
	
}

let picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if(picsToLoad==0){
		imageLoadingDoneSoStartGame();
	}
}