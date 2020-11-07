"use strict"

function domChanges() { 
    
    function buildDom(content) {
        const main = document.querySelector("main");
        main.innerHTML = content;
    }

    //let time;

    function buildStartGameScreen() {

        buildDom(`
        <article class="start-screen">
            <section class="content">
                <h1>Flappy Bird</h1>
                <button>Start Game</button>
            </section>
            <section class="howTo>
                <p>Use the space bar to move the bird</p>
            </section>
        </article>
        `);
        const startButton = document.querySelector("button");
        startButton.addEventListener("click", buildGameScreen);
    }

    function buildGameScreen() {
        buildDom(`
            <article class="game-screen">
                <canvas></canvas>
            </article>
            <article class="info">
                <p>Current Points: <span id="points"></span></p>
                <p>Current Time: <span id="time"></span>
            </article>
            <article class="hint">
                <p id="hint-text"></p>
            </article>
            
        `);

        const canvas = document.querySelector("canvas");
        canvas.setAttribute("width", 512);
        canvas.setAttribute("height", 512);

        const game = new Game(canvas);
        
        game.gameOverCallback(buildGameOverScreen);
        game.gameLoop();
        
        function playerUp(event) {
            let hint = document.querySelector('#hint-text')
            if(event.keyCode == 32){
            game.player.playerDirection(-1);
                game.down = false
                hint.innerText = ""
            }
            else hint.innerText ="Use the spacebar to move the bird"
            
        }
        function playerDown() {
            game.player.playerDirection(1);
            game.down = true;
        }
        playerDown();
        document.addEventListener("keyup", playerDown)
        document.addEventListener("keydown", playerUp);

    }

    function buildGameOverScreen() {
        buildDom(`
            <article class="gameOver-screen">
                <section>
                    <h1>Game Over</h1>
                    <p class="last-score">Score:${this.player.puntos} </p>
                    <p class=max-score">Max. Score: </p>
                    <button>Play Again</button>
                </section>
            </article>
        `);
            
        const playAgainButton = document.querySelector("button");
        playAgainButton.addEventListener("click", buildGameScreen);
        }
    
    buildStartGameScreen();

};

window.addEventListener("load", domChanges);

