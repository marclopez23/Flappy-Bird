"use strict"

class Player {
    constructor(canvas, vidas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.playerSize = {
            widht: 50,
            height: 50
        }
        this.speed = 5;
        this.playerPositionY = 50;
        this.playerPositionX = 100;
        this.direction = 0;
      this.vidas = vidas;
      this.puntos = 0;
    }

    move() {
        this.playerPositionY = this.playerPositionY + this.direction * this.speed;
    }

    draw() {
        this.ctx.fillStyle = "green";
      this.ctx.fillRect(
      this.playerPositionX - this.playerSize.widht / 2,
      this.playerPositionY - this.playerSize.height / 2,
      this.size,
      this.size
    );
    }

    playerDirection(direction) {
    this.direction = direction;
    }
  
  isInScreen() {
    if (this.playerPositionY - this.playerSize.height / 2 <= 0) {
      this.direction = 1;
    } else if (this.playerPositionY + this.playerSize.height / 2 >= this.canvas.height) {
      this.direction = -1;
    }
  }

  checkCollisonPipes(pipe) {
    
  }
    
    loseLive() {
    this.vidas--;
  }


}