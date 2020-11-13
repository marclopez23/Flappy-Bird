"use strict"

function domChanges() {
    
    function buildDom(content) {
        const main = document.querySelector("main");
        main.innerHTML = content;
    }

    function buildStartGameScreen() {

        buildDom(`
        <article>
            <section class="content">
                <img class="logo" src="./assets/img/logo.png">
                <button id="settings" class="importantBtn">Game settings</button>
            </section>
        </article>
        `);
        const settings = document.querySelector("#settings");
        settings.addEventListener("click", playerSelectorScreen);
    }

    function playerSelectorScreen() {
        let color; // aquí guardaremos el color del pájaro
        let hora; // aquí guardaremos la hora del día
        let colorOk = false; // se utilzará para ver que hemos seleccionado un color de pájaro.
        let hourOk = false; // se utilizará para comprobar que hemos seleccionado una hora.
    
        buildDom(`
        <article class="start-screen">
            <div class="birds">
                <img id="yellow" src="./assets/img/birds/yellow-up.png">
                <img id="red" src="./assets/img/birds/red-up.png">
                <img id="blue" src="./assets/img/birds/blue-up.png">
            </div>
            <div class="hours">
                <button id="dia">Day</button>
                <button id="noche">Night</button>
            </div>
            <button id="start" class="importantBtn">Start Game</button>
            <section class="howTo">
                <p>Use the space bar to move the bird</p>
            </section>
        </article>
        `);

    
        // detectamos los distintos elementos interactivos del DOM
        const yellow = document.querySelector("#yellow");
        const red = document.querySelector("#red");
        const blue = document.querySelector("#blue");
        const day = document.querySelector('#dia');
        const night = document.querySelector('#noche')
        const startButton = document.querySelector("#start")
        const allImgBtn = document.querySelectorAll(".birds img") //juntamos en una variable todas las imágenes de pájaros para poder iterar luego con ellas.
        const allHourBtn = document.querySelectorAll(".hours button")//juntamos en una variable todos los botones para poder iterar luego con ellos.
        
        const quitClass = (element) => element.forEach( tag => { //función que se utilizará para quitar las clases a los elementos que deben de dejar de ser seleccionados
            tag.classList.remove('selected')
        });

        yellow.addEventListener('click', function () {
            quitClass(allImgBtn); //quitamos todas las clases selected
            this.classList.add("selected") // añadismos la clase del estado seleccioando
            color = "yellow" //asignamos el color del pájaro
            colorOk = true // le decimos al código que hemos seleccionado el color
            start(); //ejecutamos la función que puede añadir un event listener para empezar el juego
        });
        red.addEventListener('click', function () {
            quitClass(allImgBtn);
            this.classList.add("selected")
            color = "red"
            colorOk = true
            start();
        });
        blue.addEventListener('click', function () {
            quitClass(allImgBtn);
            this.classList.add("selected")
            color = "blue"
            colorOk = true
            start();
        });
        day.addEventListener('click', function () {
            quitClass(allHourBtn);
            this.classList.add("selected")
            hora = "dia"
            hourOk = true
            start();
        });
        night.addEventListener('click', function () {
            quitClass(allHourBtn);
            this.classList.add("selected")
            hora = "noche"
            hourOk = true
            start();
        });
        
        const start = () => {
            let allSelected = colorOk && hourOk; // si tenemos todo seleccionado podremos añadir el eventlistener para empezar el juego.
            if (allSelected) startButton.addEventListener('click', () => buildGameScreen(color, hora))
        }

    }

    function buildGameScreen(color, hora) {
        buildDom(`
            <article id="game-screen">
                <section class="info">
                    <p>Current Points <span id="points"></span></p>
                    <p>Current Time <span id="time"></span>
                </section>
                <section class="game-screen">
                    <canvas></canvas>
                </section>
                <section class="hint">
                    <p>Use the spacebar to move the bird</p>
                </section>
        </article>  
        `);

        const canvas = document.querySelector("canvas");
        canvas.setAttribute("width", 512);
        canvas.setAttribute("height", 512);

        const game = new Game(canvas,color,hora);
        
        game.gameOverCallback(buildGameOverScreen);
        game.gameLoop();
        
        function playerUp(event) { //función que en función de la tecla que se pulse movemos o no el pájaro hacia arriba.
            let hint = document.querySelector('.hint')
            if (event.keyCode == 32) { // si hacemos clic en el espacio el pájaro subirá
                const wingSound = new Audio("../assets/sounds/sfx_wing.mp3")
                wingSound.pause();
                wingSound.currentTime = 0;
                wingSound.play();
                game.player.playerDirection(-1);
                game.down = false
                hint.style.visibility = "hidden"
            }
            else hint.style.visibility = "visible" // sí tocamos cualquier otra tecla mostramos el aviso que se debe jugar con el espacio.
            
        }
        function playerDown() {
            game.player.playerDirection(1);
            game.down = true;
        }
        playerDown();
        document.addEventListener("keyup", playerDown)
        document.addEventListener("keydown", playerUp);

    }

    const setScore = (newScore) => { //función para almacenar todas las puntuaciones de forma local
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
            for (let i = 0; i < 10; i++){ // con este for solo mostramos las 10 mejores punuaciones ordenadas de mejor a peor
                if(orderedScores[i] != undefined)
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
                    <img class="logo" src="./assets/img/gameover.png">
                    <div>
                        <p class="last-score">Score ${puntos} </p>
                        <p class=max-score">Max. Score ${orderedScores[0]} </p>
                    </div>
                    <button id="playAgain" class="importantBtn">Play Again</button>
                    <button id="maxScores" class="importantBtn">Score Table</button>
                </section>
                </article>
            <article class="max-points">
                <img class="close" src="./assets/img/close.png">
                <section id="scores">
                    <h2>Best Scores Ever</h2>
                    <ul>${scoreElements}</ul>
                    <button id="reset">Reset</button>
                </section>
            </article>
        `);
            
        const playAgainButton = document.querySelector("#playAgain");
        const maxScoresButton = document.querySelector("#maxScores");
        const reset = document.querySelector("#reset")
        const closeBtn = document.querySelector(".close")
        playAgainButton.addEventListener("click", playerSelectorScreen);
        maxScoresButton.addEventListener("click", () => document.querySelector(".max-points").style.display = "block")
        closeBtn.addEventListener('click', () => document.querySelector(".max-points").style.display = "none")
        reset.addEventListener('click', () => {
            localStorage.clear();
        })
        }
    
    buildStartGameScreen();

};

window.addEventListener("load", domChanges); 