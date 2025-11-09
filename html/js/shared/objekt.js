collisionbox = function (x, y, width=10, height=20, movementDirection="right", interactionClass="all",  jumpAction=-1, interactionTag="all", directionCondition="all"){

	this.x = x
	this.y = y
	this.width = width
	this.height = height
	this.movementDirection = movementDirection
	this.interactionClass = interactionClass
	this.jumpAction = jumpAction
	this.interactionTag = interactionTag
	this.directionCondition = directionCondition
	
	this.drawcamera = function(){
		if( drawstyle == 1){
			canvasCtx.strokeStyle = 'green';
			canvasCtx.beginPath();
			canvasCtx.moveTo(this.x - camera.x,this.y - camera.y);
			canvasCtx.lineTo(this.x - camera.x, this.y - camera.y + this.height);
			canvasCtx.lineTo(this.x - camera.x+ this.width, this.y - camera.y + this.height);
			canvasCtx.lineTo(this.x - camera.x + this.width, this.y - camera.y);			
			canvasCtx.lineTo(this.x - camera.x,this.y - camera.y);
			canvasCtx.stroke();
		}
	}
	
	this.checkpoint = function(x,y) {
		
		if(x>this.x && x<this.x + this.width && y>this.y && y<this.y + this.height) return 1
		
	}
	
	this.checkcolision = function(collisionobject) {
 		if(this.checkpoint(collisionobject.left,collisionobject.top) || this.checkpoint(collisionobject.middlex,collisionobject.top) || this.checkpoint(collisionobject.right,collisionobject.top)
        || this.checkpoint(collisionobject.left,collisionobject.middley) || this.checkpoint(collisionobject.middlex,collisionobject.middley) || this.checkpoint(collisionobject.right,collisionobject.middley)
		|| this.checkpoint(collisionobject.left,collisionobject.bottom-2) || this.checkpoint(collisionobject.middlex,collisionobject.bottom-2) || this.checkpoint(collisionobject.right,collisionobject.bottom-2))

		   return 1; else return 0;
    }
	
	this.changeMovementDirection = function(object) {
		if ((object.direction == this.directionCondition || this.directionCondition == "all") && this.checkcolision(object)){

			if(this.jumpAction == -1) {object.direction = this.movementDirection;return}
		
			if(object.constructor.name == 'jumpingdwarfclass' )								
				object.jumpInicialization(this.jumpAction)
		
		}
		
	}
}

sprite = function (imagenum=tiletodraw, x, y, width=gamePic[imagenum].width, height=gamePic[imagenum].height){

	collisionbox.call (this,x, y, width, height)

	this.imagenum = imagenum
	this.width = width
	this.height = height
	
	this.drawcamera = function() {
        
      this.x=Math.floor(this.x)
	  this.y=Math.floor(this.y)		
		
      if ( drawstyle == 0 ) {
		  canvasCtx.drawImage(gamePic[this.imagenum], this.x - camera.x, this.y - camera.y)
	  }
		
	}
	
}

spriteclass = function (imagenum=tiletodraw, x, y, width=gamePic[imagenum].width, height=gamePic[imagenum].height) {
	
	sprite.call (this,imagenum, x, y, width, height)
		
	this.drawcamera = function() {
        
        this.x=Math.floor(this.x)
		this.y=Math.floor(this.y)		
		
        if (drawstyle==0 && this.imagenum!=-1) {
		    canvasCtx.drawImage(gamePic[this.imagenum], this.x - camera.x, this.y - camera.y)
	    }  else if (drawstyle==1) {
           canvasCtx.fillStyle='red';
           canvasCtx.fillRect(this.x - camera.x,this.y - camera.y,this.width,this.height); 
        } 
	}	
	
}

healthitem = function (imagenum=28, x=20, y=20, width, height, howmuchlife=30){

    spriteclass.call (this,imagenum, x, y, width, height)
	
	this.howmuchlife = howmuchlife
	
	this.todo = function() {
		
		if (this.checkcolision(objects[activeplayer])==1){
			
			if(objects[activeplayer].life<100) objects[activeplayer].life += this.howmuchlife
			if(objects[activeplayer].life>100) objects[activeplayer].life=100
			this.howmuchlife = 0
			this.imagenum = -1
			
		}
		
	}

}

leveltransitionclass = function (imagenum=6, x=20, y=20, width, height, level="XXXX", leveltransitionname="XXXX", transitionType="entrance"){

    spriteclass.call (this,imagenum, x, y, width, height)
		
	this.level=level;

    this.leveltransitionname=leveltransitionname
	
	this.isActive=0;
	
	this.firstSpawn=2;
	
	this.transitionType = transitionType
	
	this.todo = function() {
		
		if(this.transitionType=="checkpoint") 
			if (this.level == transitionCheckpoint.level && this.leveltransitionname == transitionCheckpoint.leveltransitionname)
					this.imagenum=61; else this.imagenum=60
		
		if (this.checkcolision(objects[activeplayer])==1 && (this.level!='XXXX')){
			if (this.level=="endgame") {winGame();return}		
			this.isActive++; 
			if (this.isActive>6 && this.firstSpawn<0) {
				if(transitionType=="entrance") eval(episode+"(level, leveltransitionname)")
				if(transitionType=="checkpoint") {
					transitionCheckpoint.level = this.level
					transitionCheckpoint.leveltransitionname = this.leveltransitionname
				}
			}
		} else {this.isActive=0;this.firstSpawn--}
			
		this.drawcamera();
		
	}

}

objectmob = function(imagenum, x, y, width, height, life, checkForDirectionalChange = 0, tag=""){
	
	spriteclass.call (this,imagenum, x, y, width, height)
	
	this.life = life
	this.top
	this.bottom
	this.left
	this.right
	
	this.ground = false
	this.ceiling = false
	this.leftobstruction = false
	this.rigtobstruction = false
		
	this.checkForDirectionalChange = checkForDirectionalChange;
	this.tag =tag
		
	this.calculateborders = function () {           //vypocita hodnoty z ktorych sa pocitaju kolizie
		
		this.top=this.y
		this.middley=this.y + (this.height/2)
		this.bottom=this.y + this.height+1
		this.left=this.x
		this.middlex=this.x + (this.width/2)
		this.right=this.x + this.width+1
		
	}
		
	this.calculatetiles = function (whitchtile, minusx=0, minusy=0){//tile v okruu objektu
		
		if(whitchtile==0) return tiles[Math.floor((this.top+minusy)/TILESDIMENSIONS)][Math.floor((this.left+minusx)/TILESDIMENSIONS)]
		if(whitchtile==1) return tiles[Math.floor((this.top+minusy)/TILESDIMENSIONS)][Math.floor((this.middlex+minusx)/TILESDIMENSIONS)]
		if(whitchtile==2) return tiles[Math.floor((this.top+minusy)/TILESDIMENSIONS)][Math.floor((this.right+minusx)/TILESDIMENSIONS)]
		if(whitchtile==3) return tiles[Math.floor((this.middley+minusy)/TILESDIMENSIONS)][Math.floor((this.left+minusx)/TILESDIMENSIONS)]
		if(whitchtile==4) return tiles[Math.floor((this.middley+minusy)/TILESDIMENSIONS)][Math.floor((this.middlex+minusx)/TILESDIMENSIONS)]
		if(whitchtile==5) return tiles[Math.floor((this.middley+minusy)/TILESDIMENSIONS)][Math.floor((this.right+minusx)/TILESDIMENSIONS)]
		if(whitchtile==6) return tiles[Math.floor((this.bottom+minusy)/TILESDIMENSIONS)][Math.floor((this.left+minusx)/TILESDIMENSIONS)]
		if(whitchtile==7) return tiles[Math.floor((this.bottom+minusy)/TILESDIMENSIONS)][Math.floor((this.middlex+minusx)/TILESDIMENSIONS)]
		if(whitchtile==8) return tiles[Math.floor((this.bottom+minusy)/TILESDIMENSIONS)][Math.floor((this.right+minusx)/TILESDIMENSIONS)]
	}
	
	this.movedown = function (howmuch) {
		
		this.ground=this.colisiondown()
		
		if ((this.colisiondown(howmuch)!=false) && this.bottom%TILESDIMENSIONS!=0){
			
			this.y += TILESDIMENSIONS-(this.bottom%TILESDIMENSIONS)  //zarovna spodok
			
		} else if (!this.ground) {
			
			this.y += howmuch
			
			return 1;
			
		}
		
		return 0;
	
	}
	
	this.moveup = function (howmuch) {
		
		this.ceiling=this.colisionup()
		
		if (this.ceiling) this.y = (this.y-(this.top%TILESDIMENSIONS))
		
		if (!this.ceiling) {
			
			this.y -= howmuch
						
		}
			
	}
	
	this.colisionleft = function (more=0) {
		
		if ((this.calculatetiles(0,-more,0)==0)  && (this.calculatetiles(3,-more,0)==0) && (this.ground)) return false
				else if ((!this.ground)&&(this.calculatetiles(0,-more,0)==0) && this.calculatetiles(3,-more,0)==0 /* && (this.calculatetiles(6,-more,0)==0)*/){
					return false
				} else {
					return true
				}					
		
	}
	
	this.moveleft = function (howmuch) {  
	
		this.calculateborders()
	
		this.leftobstruction = this.colisionleft()
	
		if (this.colisionleft(howmuch) && !this.leftobstruction ) {
	
			this.x -= this.left%TILESDIMENSIONS + 1
				
		}else if (!this.leftobstruction) {
					
			this.x -= howmuch
				
		}
			
	}
	
	this.colisionright = function (more=0) {
		
		if ((this.calculatetiles(2,+more,0)==0)  && (this.calculatetiles(5,+more,0)==0) && (this.ground)) return false
				else if ((!this.ground)&&(this.calculatetiles(2,+more,0)==0) && this.calculatetiles(5,+more,0)==0  /*&& (this.calculatetiles(8,+more,0)==0)*/){
					return false
				} else {
					return true
				}					
		
	}
	
	this.moveright = function (howmuch) { 
	
		this.calculateborders()
	
		this.rightobstruction = this.colisionright()
	
		if (this.colisionright(howmuch) && !this.rightobstruction ) {
			
			this.x += TILESDIMENSIONS-(this.right%TILESDIMENSIONS)
				
		}else if (!this.rightobstruction) {
			
			this.x += howmuch
				
		}
		
	}
	
	this.colisionup = function (more=0) {
		
		this.calculateborders()
		
		if ((this.calculatetiles(0,1,0-more)!=0) || (this.calculatetiles(1,0,0-more))!=0 || (this.calculatetiles(2,-1,0-more))!=0) 
		{this.ceiling=true ; return 1}
		else {this.ceiling=false; return 0}
			
	}
	
	this.colisiondown = function (more=0, jumpwidth = 0) {
		
		this.calculateborders()
		
		if (this.calculatetiles(6,1 - jumpwidth,0+more)!=0 || this.calculatetiles(7,0,0+more)!=0 || this.calculatetiles(8,-1 + jumpwidth,0+more)!=0){        
			return 1
		}	
		else {return false}
			
	}
	
	this.jump = function (howmuchmax, howmuchmin, speed) {
		
		this.colisionup(speed)
		
		if(this.uppressed && !this.jumpactive && this.colisiondown(0,3) && this.jumpkeyrelease && this.jumpagain == true) {	
		
			this.jumpactive=true
			this.jumpstart=this.bottom
			this.jumpkeyrelease=false
			this.jumpagain=false
			
		}
		
		if (( this.ceiling || (this.top<(this.jumpstart-howmuchmax))											
		|| ((!this.uppressed) && (this.top<(this.jumpstart-howmuchmin) ) )) && this.jumpactive ) {
			this.jumpactive=false;
			if (this.ceiling) this.y = (this.y-(this.top%TILESDIMENSIONS))   //zarovna hlavu
		}
		
		if(this.jumpactive) {
			this.y -= speed
		}
		
		if(this.colisiondown())
			this.jumpagain = true
		
	}
	
	this.drawLife = function () {
		
		    canvasCtx.fillStyle='blue';
  		    canvasCtx.fillRect(canvas.width/10,(canvas.height/10)*9,this.life,7);
			canvasCtx.beginPath();
			canvasCtx.lineWidth = "2";
			canvasCtx.strokeStyle = "red";
			canvasCtx.rect(canvas.width/10-1, (canvas.height/10)*9-1, 102, 9);
			canvasCtx.stroke();
		
	}
	
	this.collisionGround = function (){
	  
		if ([3,38,39,40].indexOf(this.calculatetiles(7,0,0))>-1) this.life-=1.5; 
		
	}	
	
}

jumpingdwarfclass = function(imagenum=42, x, y, width, height, life=100, direction="right", speedmovement=1, attackdamage=2, checkForDirectionalChange, randomJump=0, tag, jumpspeed=3.5, speedfall=1.8) {
	
	objectmob.call (this,imagenum, x, y, width, height, life, checkForDirectionalChange, tag)
	
	this.direction = direction;
	this.attackdamage = attackdamage
	
	this.speedmovement=speedmovement
	this.speedfall = speedfall
	
	this.jumpspeed = jumpspeed
	this.jumpminheight = 40
	this.jumpmaxheight = 70
	this.jumpactive = false
	this.jumpstart
	this.jumpheight
	this.randomJump = randomJump
	
	this.jumpInicialization = function(jumpheight){
		if(!this.jumpactive && this.ground) {
			this.jumpactive = true
			this.jumpstart = this.y
			this.jumpheight = jumpheight
			return
		}
		if(jumpheight == 0) this.jumpactive = false
	}

	this.jump = function (speed) {
						
		if(this.jumpactive && (this.y < ( this.jumpstart - this.jumpheight ) || this.ceiling) ){
			this.jumpactive = false
			if (this.ceiling) this.y = (this.y-(this.top%TILESDIMENSIONS))   //zarovna hlavu
			
		}
		
		if(this.jumpactive) {
			this.y -= speed
		}
		
	}
	
	this.collisionAttack = function(object) {
		
		if (this.checkcolision(object)) object.life-=attackdamage;
			
	}
	
	this.todo = function() {		
		
		this.movedown(this.speedfall)
		
		if (this.direction=="left") this.moveleft(this.speedmovement); 
		if (this.direction=="right") this.moveright(this.speedmovement)
				
		if (this.colisionleft()) this.direction="right"
    	if (this.colisionright(2)) this.direction="left"
		
		if( this.randomJump>0 && Math.random() > this.randomJump)
			this.jumpInicialization ( Math.max(this.jumpminheight, parseInt ( Math.random() * this.jumpmaxheight, 10) ) )
		
		this.jump (this.jumpspeed )
		this.drawcamera();
		
	}	
	

}

basicenemyclass = function(imagenum=8, x, y, width, height, life=100, direction="right", speedmovement=1, attackdamage=2, checkForDirectionalChange, tag) {
	
	objectmob.call (this,imagenum, x, y, width, height, life, checkForDirectionalChange, tag)
	
	this.direction = direction;
	this.attackdamage = attackdamage
	
	this.speedmovement=speedmovement
	this.speedfall = 1.8
	
	this.collisionAttack = function(object) {
		
		if (this.checkcolision(object)) object.life-=attackdamage;
			
	}
	
	this.todo = function() {		
		
		if(!this.movedown(this.speedfall)){	
			if (this.direction=="left") {this.moveleft(this.speedmovement);}
			if (this.direction=="right") this.moveright(this.speedmovement)
		}	
		
		if (this.colisionleft()) this.direction="right"
    	if (this.colisionright(2)) this.direction="left"

		this.drawcamera();
		
	}	

}	

flyingenemyclass = function(imagenum=10, x, y, width, height, life, direction, speedmovement, attackdamage, checkForDirectionalChange, tag) {
	
	basicenemyclass.call (this,imagenum, x, y, width, height, life, direction, speedmovement, attackdamage, checkForDirectionalChange, tag)
	
	this.todo = function() {		
		
		if (this.direction=="left") this.moveleft(this.speedmovement); 
		if (this.direction=="right") this.moveright(this.speedmovement)
		if (this.direction=="down") this.movedown(this.speedmovement)
		if (this.direction=="up") this.moveup(this.speedmovement)
		
		if (this.colisionleft() && this.direction=="left") this.direction="right"
    	if (this.colisionright(2) && this.direction == "right") this.direction="left"
		if (this.colisiondown(2) && this.direction == "down") this.direction="up"
		if (this.colisionup(2) && this.direction == "up") this.direction="down"

		this.drawcamera();
		
	}	

}	
	
playerclass = function(imagenum, x, y, width, height, life, checkForDirectionalChange) {
	
	objectmob.call (this,imagenum, x, y, width, height, life, checkForDirectionalChange)
	
	this.keyleft = 37
	this.keyright = 39
	this.keyup = 38
	this.keydown = 40

	
	this.leftpressed = false
	this.rightpressed = false
	this.uppressed = false
	this.downpressed = false
		
	this.speedmovement=2.64
	this.speedfall = 3.8
	
	this.jumpspeed = 7.5
	this.jumpminheight = 40
	this.jumpmaxheight = 80
	this.jumpactive = false
	this.jumpstart
	this.jumpkeyrelease=true
	this.jumpagain = true
	
	this.cameraLookDown = function(){
		if(this.downpressed)
			if (this.y < camera.y + camera.cameraboundariesdontmovey + (canvas.height/2)) camera.y+=1;
	}
		
	this.todo = function() {		
		
		this.movedown(this.speedfall)
			
		if (this.leftpressed) this.moveleft(this.speedmovement)
		if (this.rightpressed) this.moveright(this.speedmovement)	
		
		this.jump(this.jumpmaxheight, this.jumpminheight, this.jumpspeed)
				
		this.drawcamera();
		
	}	
	
}