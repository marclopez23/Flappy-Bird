"use strict"

class Player {
    constructor(canvas, vidas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.speed = 3;
        this.playerPositionY = 100;
        this.playerPositionX = 50;
        this.direction = 0;
      this.vidas = vidas;
      this.puntos = 0;
      this.birdSize = {
        width: 38,
        height: 26
      }
      
    }

    move() {
        this.playerPositionY = this.playerPositionY + this.direction * this.speed;
    }

  draw() {
    this.bird = new Image();
    this.bird.src ="./assets/img/bird.png"
    this.ctx.drawImage(this.bird, this.playerPositionX, this.playerPositionY)
    
    }

    playerDirection(direction) {
    this.direction = direction;
    }
  
  isInScreen() {
    /*if (this.playerPositionY - this.bird.height / 2 <= 0) {
      this.direction = 1;
    } else if (this.playerPositionY + this.bird.height / 2 >= this.canvas.height) {
      this.direction = -1;
    }*/
  }

  checkCollisonPipes(pipe) {
    this.passX = ((this.playerPositionX + this.birdSize.width) > pipe.pipePositionX) && (this.playerPositionX < (pipe.pipePositionX + pipe.pipeTop.width));
    this.passY = ((this.playerPositionY + this.birdSize.height < pipe.pipeSize.height + pipe.gapPipe + pipe.pipePositionY) && (this.playerPositionY > pipe.pipeSize.height + pipe.pipePositionY))
    this.passPipes = this.passX && this.passY;
    this.collision = !this.passY && this.passX;
    if (this.passPipes && !pipe.entrePipes) {
      this.puntos += 1;
      pipe.entrePipes = true
      console.log(this.puntos)
      return false
    } else if (this.collision) return true
    return false;
  }
    
  loseLive() {
    this.vidas--;
  }


}