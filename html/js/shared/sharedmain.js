let canvas;
let canvasCtx;

let tiles = [];
let objects = [];
let drawstyle=0;
let activeplayer = 0;

function creategamecanvas() {

    canvas = document.getElementById('gameCanvas');
	canvasCtx = canvas.getContext('2d');
    for (let i=0; i<LEVELMAXY; i++)
	    tiles[i] = new Array (LEVELMAXX)

}
