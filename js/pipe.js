"use strict"

class Pipes{
    constructor(canvas, y, seconds) {
      this.pipeSize = {
            width: 52,
            height: 242
        }
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.pipePositionX = this.canvas.width;
      this.pipePositionY = y;
      this.direction = -1;
      this.entrePipes = false; //condición que se asigna a cada pipe para comprobar que el pájaro ya ha pasado entre ellas
      this.gapPipe = 90;
      this.seconds = seconds;
      this.pipesImages = { // assets de las pipes
        noche: {
          bottom: "./assets/img/pipes/pipered-botom.png",
          top: "./assets/img/pipes/pipered-top.png"
        },
        dia: {
          bottom: "./assets/img/pipes/pipegreen-botom.png",
          top: "./assets/img/pipes/pipegreen-top.png"
        }
      }
  }

  move(speed) {
    this.pipePositionX = this.pipePositionX - speed; //la temida función que hace el juego más difícil
  }

  draw(sueloImg, hora) {
    this.pipeTop = new Image();
    this.pipeTop.src = this.pipesImages[hora].top
    this.pipeBottom = new Image();
    this.pipeBottom.src =this.pipesImages[hora].bottom
    this.suelo = new Image();
    this.suelo.src = sueloImg[hora]
    this.pipeYBottom = this.pipePositionY + this.pipeTop.height + this.gapPipe; //para pintar la pipe inferior debemos calcular su posción Y en base a donde colocamos la pipe superior + el gap
    this.pipeBottomY = this.pipeTopY + this.pipeSize.height + this.randomGap;
    this.ctx.drawImage(this.pipeTop, this.pipePositionX, this.pipePositionY);
    this.ctx.drawImage(this.pipeBottom, this.pipePositionX, this.pipeYBottom);
    this.ctx.drawImage(this.suelo, 0, this.canvas.height - this.suelo.height);
  }

   
}