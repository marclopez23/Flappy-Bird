"use strict"

class Pipes{
    constructor(canvas, y) {
    this.pipeSize = {
            widht: 50,
            height: 200
        }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.pipePositionX = this.canvas.width;
    this.pipePositionY = y;
    this.speed = 1.5;
    this.direction = -1;
  }

  move() {
    this.pipePositionX = this.pipePositionX - this.speed;
  }

  draw() {
    this.pipeTop = new Image();
    this.pipeTop.src ="./assets/img/pipeTop.png"
    this.pipeBottom = new Image();
    this.pipeBottom.src ="./assets/img/pipeBottom.png"
    this.suelo = new Image();
    this.suelo.src ="./assets/img/suelo.png"
    this.gapPipe = 90;
    this.pipeYBottom = this.pipePositionY + this.pipeTop.height + this.gapPipe;
    this.pipeBottomY = this.pipeTopY + this.pipeSize.height + this.randomGap;
    this.ctx.drawImage(this.pipeTop, this.pipePositionX, this.pipePositionY);
    this.ctx.drawImage(this.pipeBottom, this.pipePositionX, this.pipeYBottom);
    this.ctx.drawImage(this.suelo, 0, this.canvas.height - this.suelo.height);
  }

  setPipeSpeed(speed) {
    this.speed = speed;
  }
}