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
    this.speed = 5;
    this.direction = -1;
  }

  move() {
    this.pipePositionX = this.pipePositionX - this.speed;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.randomGap = Math.floor(Math.random() * 100) + 50;
    this.pipeTopY = 0 - this.pipePositionY;
    console.log(this.pipeBottomY)
    this.pipeBottomY = this.pipeTopY + this.pipeSize.height + this.randomGap;
    this.ctx.fillRect(this.pipePositionX, this.pipeTopY - this.pipeSize.height, this.pipeSize.widht, this.pipeSize.height);
    this.ctx.fillRect(this.pipePositionX, this.pipeBottomY, this.pipeSize.widht, this.pipeSize.height);
  }

  setPipeSpeed(speed) {
    this.speed = speed;
  }
}