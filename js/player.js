"use strict"

class Player {
    constructor(canvas, vidas, color) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.speed = 3;
        this.playerPositionY = 100;
        this.playerPositionX = 50;
      this.direction = 0;
      this.playerImages = {
        yellow: {
          down: "./assets/img/birds/yellow-down.png",
          up: "./assets/img/birds/yellow-up.png"
        },
        blue: {
          down: "./assets/img/birds/blue-down.png",
          up: "./assets/img/birds/blue-up.png"
        },
        red: {
          down: "./assets/img/birds/red-down.png",
          up: "./assets/img/birds/red-up.png"
        }
      }
      this.vidas = vidas;
      this.puntos = 0;
      this.birdSize = {
        width: 34,
        height: 24
      }
      this.color = color
      
    }

    move() {
        this.playerPositionY = this.playerPositionY + this.direction * this.speed;
    }

  draw(cae) {
    this.bird = new Image();
    if (cae) this.bird.src = this.playerImages[this.color].down
    else this.bird.src = this.playerImages[this.color].up
    this.ctx.drawImage(this.bird, this.playerPositionX, this.playerPositionY)
    
    }

    playerDirection(direction) {
    this.direction = direction;
    }

  checkCollisonPipes(pipe) {
    this.passX = ((this.playerPositionX + this.birdSize.width) > pipe.pipePositionX) && (this.playerPositionX < (pipe.pipePositionX + pipe.pipeSize.width));
    this.passY = ((this.playerPositionY + this.birdSize.height < pipe.pipeSize.height + pipe.gapPipe + pipe.pipePositionY) && (this.playerPositionY > pipe.pipeSize.height + pipe.pipePositionY))
    this.passPipes = this.passX && this.passY;
    this.collision = !this.passY && this.passX;
    if (this.passPipes && !pipe.entrePipes) {
     this.pointSound = new Audio("../assets/sounds/sfx_point.mp3")
     this.pointSound.play();
      this.sumPoints();
      pipe.entrePipes = true
      return false
   } else if (this.collision) {
     this.hitSound = new Audio("../assets/sounds/sfx_hit.mp3")
     this.hitSound.play();
     return true
    } 
    return false;
  }
    
  loseLive() {
    this.vidas--;
  }

  sumPoints() {
    this.puntos += 1;
  }

 
}