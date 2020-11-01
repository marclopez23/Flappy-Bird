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
            if (Math.random() > 0.97) { //Mirar si puc fer-ho d'una altre forma, testejar cada quan surt
                const y = Math.random() * this.canvas.height;
                this.pipes.push(new Pipes(this.canvas, y));
            }
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