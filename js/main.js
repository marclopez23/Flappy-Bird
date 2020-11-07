"use strict"

function domChanges() {
    
    function buildDom(content) {
        const main = document.querySelector("main");
        main.innerHTML = content;
    }

    function buildStartGameScreen() {

        buildDom(`
        <article class="start-screen">
            <section class="content">
                <h1>Flappy Bird</h1>
                <button id="settings">Game settings</button>
            </section>
            <section class="howTo>
                <p>Use the space bar to move the bird</p>
            </section>
        </article>
        `);
        const settings = document.querySelector("#settings");
        settings.addEventListener("click", playerSelectorScreen);
    }

    function playerSelectorScreen() {
        let color;
        let hora;
        let colorOk = false;
        let hourOk = false;
    
        buildDom(`
        <article class="start-screen">
            <div>
                <img id="yellow" src="./assets/img/birds/yellow-up.png">
                <img id="red" src="./assets/img/birds/red-up.png">
                <img id="blue" src="./assets/img/birds/blue-up.png">
            </div>
            <div>
                <button id="dia">Day</button>
                <button id="noche">Night</button>
            </div>
            <button id="start">Start Game</button>
        </article>
        `);
        const yellow = document.querySelector("#yellow");
        const red = document.querySelector("#red");
        const blue = document.querySelector("#blue");
        const day = document.querySelector('#dia');
        const night = document.querySelector('#noche')
        const startButton = document.querySelector("#start")
        
        yellow.addEventListener('click', function () {
            color = "yellow"
            colorOk = true
            start();
        });
        red.addEventListener('click', function () {
            color = "red"
            colorOk = true
            start();
        });
        blue.addEventListener('click', function () {
            color = "blue"
            colorOk = true
            start();
        });
        day.addEventListener('click', function () {
            hora = "dia"
            hourOk = true
            start();
        });
        night.addEventListener('click', function () {
            hora = "noche"
            hourOk = true
            start();
        });
        
        const start = () => {
            let allSelected = colorOk && hourOk;
            if (allSelected) startButton.addEventListener('click', () => buildGameScreen(color, hora))
        }

    }

    function buildGameScreen(color, hora) {
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

        const game = new Game(canvas,color,hora);
        
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

    const setScore = (newScore) => {
    const topScoresStr = localStorage.getItem('topScores');
    let topScoresArr = [];
    if(topScoresStr) topScoresArr = JSON.parse(topScoresStr);
    topScoresArr.push(newScore);
    const updatedScoresStr = JSON.stringify(topScoresArr);
    localStorage.setItem('topScores', updatedScoresStr);
    return topScoresArr;
  }



    function buildGameOverScreen(puntos) {
        const scores = setScore(puntos);
        let orderedScores = scores.sort((a, b) => {
        return b - a;
        })
        const bestTen = () => {
            let bestScores = [];
            for (let i = 0; i < 10; i++){
                bestScores.push(orderedScores[i])
            }
            return bestScores;
        }

        let scoreElements = bestTen().reduce((acc, score) => {
        return `${acc} <li>${score}</li>`;
        }, '')

       
        buildDom(`
            <article class="gameOver-screen">
                <section>
                    <h1>Game Over</h1>
                    <p class="last-score">Score:${puntos} </p>
                    <p class=max-score">Max. Score:${orderedScores[0]} </p>
                    <button>Play Again</button>
                </section>
                </article>
                <article>
                <section id="scores">
                    <h2>Best Scores Ever</h2>
                    <ul>${scoreElements}</ul>
                </section>
                </article>
        `);
            
        const playAgainButton = document.querySelector("button");
        playAgainButton.addEventListener("click", playerSelectorScreen);
        }
    
    buildStartGameScreen();

};

window.addEventListener("load", domChanges); 