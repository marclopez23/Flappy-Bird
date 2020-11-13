"use strict"

class Player {
    constructor(canvas, vidas, color) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.speed = 3;
      this.playerPositionY = 100;
      this.playerPositionX = 50;
      this.direction = 0;
      this.pointSound = new Audio("../assets/sounds/sfx_point.mp3")
      this.hitSound = new Audio("../assets/sounds/sfx_hit.mp3")
      this.playerImages = { //en este objeto se guardan las distintas imágenes que se utilizan para el pájaro
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

    move() { //Función para mover el pájaro
        this.playerPositionY = this.playerPositionY + this.direction * this.speed;
    }

  draw(cae) { //Función que dibuja el pájaro
    this.bird = new Image();
    if (cae) this.bird.src = this.playerImages[this.color].down
    else this.bird.src = this.playerImages[this.color].up
    this.ctx.drawImage(this.bird, this.playerPositionX, this.playerPositionY)
    
    }

    playerDirection(direction) { //Le pasamos un valos positivo o negativo para hacer que el pájaro caiga o suba
    this.direction = direction;
    }

  checkCollisonPipes(pipe) { // aquí vemos si el pájaro se choca con las pipes
    this.passX = ((this.playerPositionX + this.birdSize.width) > pipe.pipePositionX) && (this.playerPositionX < (pipe.pipePositionX + pipe.pipeSize.width)); //comprobación si pasa el eje X
    this.passY = ((this.playerPositionY + this.birdSize.height < pipe.pipeSize.height + pipe.gapPipe + pipe.pipePositionY) && (this.playerPositionY > pipe.pipeSize.height + pipe.pipePositionY)) //comprobación si pasa el eje Y
    this.passPipes = this.passX && this.passY; //si se cumplen las dos condiciones el pájaro ha pasado la pipe
    this.collision = !this.passY && this.passX; // comprobamos si se choca contra la columna
    if (this.passPipes && !pipe.entrePipes) {
      this.pointSound.pause();
      this.pointSound.currentTime = 0;
      this.pointSound.play();
      this.sumPoints();
      pipe.entrePipes = true // Aquí asignamos esta condición a true para evitar que sume más de un punto por pipe
      return false
    } else if (this.collision) {
      this.hitSound.pause();
      this.hitSound.currentTime = 0;
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