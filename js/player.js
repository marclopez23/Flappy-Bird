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
    
  }
    
    loseLive() {
    this.vidas--;
  }


}