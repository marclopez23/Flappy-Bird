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
    
    loseLive() {
    this.vidas--;
  }


}