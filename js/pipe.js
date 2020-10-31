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
    this.x = this.x - this.speed;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y - this.pipeSize.height, this.pipeSize.widht, this.pipeSize.height);
  }

  setPipeSpeed(speed) {
    this.speed = speed;
  }
}