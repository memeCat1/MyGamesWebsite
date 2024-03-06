
//Diese Klasse ist ein Bauplan für unseren Spieler
export class Player extends Phaser.Physics.Arcade.Sprite {

    //baut unseren Spieler
    constructor(scene, x, y, name, characterName) {
        super(scene, x, y, name);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(16, 28);

        this.characterName = characterName;
        this.scale = 1.2;
        this.runSpeed = 25;
        this.jumpSpeed = -50;
        this.jumpCount = 0;
        this.isAlive = true;

        // this.setCollideWorldBounds(true);

        this.create();
    }

    create = () => {

        //Erstellt die Steuerung mit Pfeiltasten
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.characterName + "_idle"),
            frameRate: 18,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers(this.characterName + "_run"),
            frameRate: 20,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'hit',
            frames: this.anims.generateFrameNumbers(this.characterName + "_hit"),
            frameRate: 20,
            repeat: -1
        });

        this.play("idle");

        this.scene.events.on('update', (t, dt) => { this.update(t, dt) });

    }

    update = (time, dt) => {

        if (this.isAlive === false) return;

        //Steuerung
        if (this.cursors.left.isDown) {
            //nach links laufen
            this.flipX = true;
            this.play("run", true);
            this.setVelocityX(-this.runSpeed * dt);
        } else if (this.cursors.right.isDown) {
            //nach rechts laufen
            this.flipX = false;
            this.play("run", true);
            this.setVelocityX(this.runSpeed * dt);
        } else {
            //stehen bleiben
            this.play("idle", true);
            this.setVelocityX(0);
        }

        //springen
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.jumpCount < 2) {
            this.setVelocityY(this.jumpSpeed * dt);
            this.jumpCount++;
        }

        if (this.body.velocity.y === 0) {
            this.jumpCount = 0;
        }

    }

    kill = () => {

        if (this.isAlive === false) return;

        console.log("player was killed");
        this.isAlive = false;
        this.setVelocityY(-600);
        this.play("hit", true);

        //Respawn des Spielers
        setTimeout(() => {
            this.respawn();
        }, 1000);

    }

    respawn = () => {
        this.setPosition(100, 2400);
        this.isAlive = true;
    }


}