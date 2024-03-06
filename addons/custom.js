
class Parallax {
    constructor(img, x, y, w, h, speed ) {
        this.x = x;
        this.x2 = x + w;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.defaultSpeed = speed ? speed : 1;
        this.speed = this.defaultSpeed;
    }

    stop() {
        this.speed = 0;
    }

    start() {
        this.speed = this.defaultSpeed;
    }

    draw() {
        image(this.img, this.x, this.y, this.w, this.h);
        image(this.img, this.x2, this.y, this.w, this.h);

        this.x = this.x - this.speed * deltaTime;
        this.x2 = this.x2 - this.speed * deltaTime;

        if(this.x < -this.w) {
            this.x = this.x2 + this.w;
        }
        if(this.x2 < -this.w) {
            this.x2 = this.x + this.w;
        }
    }
}