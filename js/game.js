"use strict"

class Game {
    constructor(canvas, color, hora) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.player;
        this.pipes = [];
        this.isGameOver = false;
        this.pointsTag = document.querySelector('#points');
        this.timeTag = document.querySelector('#time')
        this.count = 0;
        this.seconds = 0;
        this.minute = 0;
        this.increment = false;
        this.time = 0;
        this.speed = 1.5;
        this.down = true;
        this.color = color
        this.backgroundImages = {
            dia: "./assets/img/fondo/fondo.png",
            noche: "./assets/img/fondo/fondo-noche.png"
        }
        this.sueloImages = {
            dia: "./assets/img/suelo/suelo.png",
            noche: "./assets/img/suelo/suelo-noche.png"
        }
        this.hora = hora
    }

    timer() {
        this.secondsString = this.seconds.toString();
        this.minuteString = this.minute.toString();
        if (this.secondsString.length < 2) this.secondsString = "0" + this.secondsString;
        if (this.minuteString.length < 2) this.minuteString = "0" + this.minuteString;
        return `${this.minuteString} : ${this.secondsString}`
    }

    gameLoop() {
        this.player = new Player(this.canvas, 1, this.color)
        this.time = setInterval(() => {
            this.count++;
            this.seconds = this.count;
            if (this.count % 60 === 0) {
                this.minute++;
                this.count = 0;
            }
            
        }, 1000);
        const loop = () => {
            
            this.newPipe = this.pipes.length === 0 || this.pipes[(this.pipes.length - 1)].pipePositionX < this.canvas.width / 2; 
            if (this.newPipe) { 
                const y = Math.floor((Math.random() * 242 + 10) - this.canvas.height / 2 );
                this.pipes.push(new Pipes(this.canvas, y, this.seconds));
            }
            this.suelo = new Image();
            this.suelo.src = this.sueloImages[this.hora]
            this.ctx.drawImage(this.suelo, 0, this.canvas.height - this.suelo.height);
            this.checkAllCollisions();
            this.updateCanvas();
            this.clearCanvas();
            this.drawCanvas();
            this.timeTag.innerText = this.timer()
            this.pointsTag.innerText = this.player.puntos
            if (!this.isGameOver) {
                window.requestAnimationFrame(loop);
            }
        };

        window.requestAnimationFrame(loop);
    }

    updateCanvas() {
        this.player.move();
        this.pipes.forEach((pipe) => {
            if (this.seconds % 5 === 0 && !this.increment) {
                this.increment = true;
                this.speed = this.speed + 0.5
            } else if(this.seconds % 5 != 0 && this.increment) {
                this.increment = false;
            }
            pipe.move(this.speed);
        });
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.fondo = new Image();
            this.fondo.src = this.backgroundImages[this.hora]
            this.ctx.drawImage(this.fondo, 0, 0)
    }

    drawCanvas() {
        this.player.draw(this.down);
        this.pipes.forEach((pipe) => {
            pipe.draw(this.sueloImages, this.hora);
        });
    }

    touchFloor() {
        return (this.player.playerPositionY + this.player.birdSize.height >= this.canvas.height - this.suelo.height) ? true : false;
    }

    touchCeil() {
        return (this.player.playerPositionY <= 0) ? true : false;
    }

    checkAllCollisions() {
        this.player.isInScreen();
        this.pipes.forEach((pipe, index) => {
            if (this.player.checkCollisonPipes(pipe) || this.touchFloor() || this.touchCeil()) {
                this.player.loseLive();
                if (this.player.vidas === 0) {
                    this.isGameOver = true;
                    this.onGameOver(this.player.puntos);
                }
            }
        });
    }

    gameOverCallback(callback) {
        clearInterval(this.time)
    this.onGameOver = callback;
  } 

}