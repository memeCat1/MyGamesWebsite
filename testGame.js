
let ball;

function setup() {
    let canvas = new Canvas(600, 400);
    canvas.parent("game");
    world.gravity.y = 20;

    ball = new Sprite(300, 100);
    ball.d = 40;
    ball.color = "yellow";
    ball.bounciness = 0.2;

    // let ball1 = new Sprite(300, 0);
    // ball1.d = 40;
    // ball1.color = "yellow";
    // ball1.bounciness = 0.8;

    let floor = new Sprite(300, 400, 600, 40, "static");
    floor.color = "green";


    for(let y = 0; y < 5; y++){
        let box = new Sprite(50, 360 - y * 40, 40, 40);
        box.color = "yellow";
        box.mass = 4;
        box.drag = 1;
        box.friction = 0;
        box.addAni("fly", "./assets/images/flappy-sheet-2.png", { frameSize: [32, 24], frames: 4 });
    }
}

function draw() {
    background(0, 200, 250);

    if(mouse.presses()) {
        ball.moveTowards(mouse, 0.10);
    }
}
