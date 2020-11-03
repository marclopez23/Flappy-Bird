"use strict"

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.player;
        this.pipes = [];
        this.isGameOver = false;
    }

    gameLoop() {
        
        this.player = new Player(this.canvas, 1)
        
        const loop = () => {
            
            this.newPipe = this.pipes.length === 0 || this.pipes[(this.pipes.length - 1)].pipePositionX < this.canvas.width / 2; 
            if (this.newPipe) { 
                const y = Math.floor((Math.random() * this.canvas.height / 2) - this.canvas.height / 2 + 20);
                this.pipes.push(new Pipes(this.canvas, y));
            }
            this.suelo = new Image();
            this.suelo.src ="./assets/img/suelo.png"
             this.ctx.drawImage(this.suelo, 0, this.canvas.height - this.suelo.height);
            this.checkAllCollisions();
            this.updateCanvas();
            this.clearCanvas();
            this.drawCanvas();

            if (!this.isGameOver) {
                window.requestAnimationFrame(loop);
            }
        };

        window.requestAnimationFrame(loop);
    }

    updateCanvas() {
        this.player.move();
        this.pipes.forEach((pipe) => {
            pipe.move();
        });
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCanvas() {
        this.player.draw();
        this.pipes.forEach((pipe) => {
            pipe.draw();
        });
    }

    checkAllCollisions() {
        this.player.isInScreen();
        this.pipes.forEach((pipe, index) => {
            console.log(this.player.checkCollisonPipes(pipe))
            if (this.player.checkCollisonPipes(pipe)) {
                this.player.loseLive();
                if (this.player.vidas === 0) {
                    this.isGameOver = true;
                    this.onGameOver();
                }
            }
        });
    }

    gameOverCallback(callback) {
    this.onGameOver = callback;
  }

}