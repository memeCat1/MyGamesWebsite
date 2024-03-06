

/*

To Do:
+ Spieler (Vogel?)
+ Springen, fallen (gravitation)
+ Hindernisse/Röhren
+ Punkte
+ Pause Button
+ Start Screen
+ Game Over Screen mit Restart Option

+ Hintergrund
+ Musik
+ Highscore
+ Charakter aussuchen

*/

//Spiel Zustand (Screen der angezeigt wird)
let gameState = "start";

//Punktestand
let score = 0;

// Spielerbild
let playerImg;

//Bilder der Röhren
let pipeTopImg;
let pipeBottomImg;

//Liste mit allen Röhren
let pipes = [];
let oldMillisPipe = 0;
let timeBetweenPipes = 1000;

let backMusic;
let wooshSound;
let musicIsPlaying = false;
let isFirstClick = true;

let highscore;

//JS Objekt mit allen Eigenschaften des Spielers
let player = {
    x: 100,
    y: 100,
    width: 32 * 1.5,
    height: 24 * 1.5,
    acceleration: 0.6,
    velocity: 0
}


function preload() {
    //Spielerbild laden und Variablen zuweisen
    playerImg = loadImage('./assets/images/flappy2-32x24.png');
    pipeBottomImg = loadImage('./assets/images/pipe-bottom.png');
    pipeTopImg = loadImage('./assets/images/pipe-top.png');

    //Musik laden
    backMusic = loadSound('./assets/sounds/disco-funk.wav');
    wooshSound = loadSound('./assets/sounds/woosh.mp3');
}

function setup() {
    // Spielfeld erstellen und in das Element mit der id game packen
    let canvas = createCanvas(600, 400);
    canvas.parent('game');

}

function draw() {
    background(0, 200, 255);
    noFill();
    noStroke();

    //Zeichne den Start Screen
    if (gameState === "start") {
        drawStartScreen();
    }

    //Zeichne den Game Screen
    if (gameState === "game") {
        drawGameScreen();
    }

    //Zeichne den Game Over Screen
    if (gameState === "gameOver") {
        drawGameOverScreen();
    }

}

//Zechnet alles was im Start Screen zu sehen ist
function drawStartScreen() {
    textSize(32);
    fill(255);
    text("Flappy Bird", 100, 100)
    textSize(18);
    text("Klick to start game!", 100, 150)
}

//Alles was während dem Spiel zu sehen ist
function drawGameScreen() {

    showScore();

    //Spieler Geschwidnigkeit um die Beschleunigung erhöhen
    player.velocity = player.velocity + player.acceleration;
    //Spieler Position um die Geschwindigkeit erhöhen
    player.y = player.y + player.velocity;

    //Wenn der Spieler den Boden berührt, ist das Spiel vorbei
    if (player.y >= 400) {
        setGameOver();
    }

    //Wenn Spieler oberen Rand berührt, dann wird Geschwindigkeit auf 0 gesetzt
    if (player.y <= 0) {
        player.velocity = 2;
    }

    ////////////////////////////////////////////////////

    //Erstelle eine neue Röhre, wenn die Zeit abgelaufen ist
    if (millis() > oldMillisPipe + timeBetweenPipes) {
        //Aktualisiere den Zeitstempel für die nächste Röhre
        oldMillisPipe = millis();

        //Erstelle eine neue Röhre
        let newPipeGap = {
            x: 600,
            y: 0,
            width: 40,
            height: 160,
            isScore: true
        }

        //Berechne die Position der Lücke
        newPipeGap.y = random(40, 360 - newPipeGap.height);

        //Füge die neue Röhre der Liste hinzu
        pipes.push(newPipeGap);

    }

    // Spielerbild anzeigen
    image(playerImg, player.x, player.y, player.width, player.height);


    //Zeichne alle Röhren
    for (let i = 0; i < pipes.length; i++) {
        let pipeGap = pipes[i];

        //Bewege die Röhre nach links
        pipeGap.x = pipeGap.x - 8;

        //zeige Lücken
        fill(0, 255, 0);
        rect(pipeGap.x, pipeGap.y, pipeGap.width, pipeGap.height);

        //Zeichne obere Röhre
        image(pipeTopImg, pipeGap.x, 0, pipeGap.width, pipeGap.y);

        //Zeichne untere Röhre
        image(pipeBottomImg, pipeGap.x, pipeGap.y + pipeGap.height, pipeGap.width, 400 - pipeGap.y - pipeGap.height);
    }

    //Collision detection mit den Röhren
    //Überprüfe ob Röhre das Spielfeld verlassen hat
    for (let i = 0; i < pipes.length; i++) {
        let pipeGap = pipes[i];
        if (pipeGap.x + pipeGap.width < 0) {
            pipes.splice(i, 1);
        }

        //Überprüfe ob der Spieler die Röhre berührt
        if (player.x + player.width > pipeGap.x && player.x < pipeGap.x + pipeGap.width) {
            if (player.y < pipeGap.y || player.y + player.height > pipeGap.y + pipeGap.height) {
                setGameOver();
            }
        }

        //Wenn Röhre hinter dem Spieler ist, füge einen Punkt hinzu
        if (pipeGap.isScore === true && player.x > pipeGap.x + pipeGap.width) {
            score++;
            pipeGap.isScore = false;
        }

    }

    /////////////////////////////////////////////////////
    debugBoundingBox();

}

//Alles was im game Over Screen zu sehen ist
function drawGameOverScreen() {
    textSize(32);
    fill(255);
    text("Game Over", 100, 100)
    textSize(18);
    text("Your Score: " + score, 100, 150)
    text("Highscore: " + highscore, 100, 200)
    text("Klick to restart game!", 100, 250)
}

function keyPressed() {

    //Wenn die Leertaste gedrückt wird, springt der Spieler
    if (keyCode === 32) {

        //Sicherstellen, dass die Musik nur einmal am Anfang startet
        if (isFirstClick === true) {
            isFirstClick = false;
            toggleBackMusic();
        }

        //Wenn im Start Screen geklickt wird, starte das Spiel
        if (gameState === "start") {
            restartGame();
        }

        //Wenn im Game Over Screen geklickt wird, starte das Spiel neu
        if (gameState === "gameOver") {
            restartGame();
        }

        //Spieler springt nach oben
        player.velocity = -12;
        wooshSound.play();
    }
}


function mousePressed() {

}

function showScore() {
    fill(0, 255, 0);
    text("Score: " + score, 20, 20);
}

//Zeichnet eine rote Box um den Spieler
function debugBoundingBox() {
    noFill();
    strokeWeight(2);
    stroke(255, 0, 0);
    rect(player.x, player.y, player.width, player.height)
}

function restartGame() {
    gameState = "game";
    score = 0;
    player.y = 100;
    pipes = [];
}

function setGameOver() {
    gameState = "gameOver";
    pipes = [];
    saveHighscore();
    highscore = getHighscore();
}

function toggleBackMusic() {
    let button = document.getElementById("music-button");
    if (musicIsPlaying) {
        backMusic.stop();
        button.innerText = "Musik AUS";
    } else {
        backMusic.loop();
        button.innerText = "Musik AN";
    }
    button.blur();
    button.classList.toggle("is-playing");
    musicIsPlaying = !musicIsPlaying;
}

function saveHighscore() {
    let hScore = localStorage.getItem("highscore");
    if (hScore === null || hScore < score) {
        localStorage.setItem("highscore", score);
    }
}

function getHighscore() {
    let hScore = localStorage.getItem("highscore");
    if (hScore === null) {
        return 0;
    } else {
        return hScore;
    }
}
