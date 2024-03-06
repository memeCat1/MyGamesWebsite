
export class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");

        this.characterNames = [
            "Mask Dude",
            "Ninja Frog",
            "Pink Man",
            "Virtual Guy"
        ]
    }

    preload() {

        //lade alle Bilder für Level
        this.load.image("terrain_img", "assets/Terrain/Terrain (16x16).png");
        this.load.image("background_yellow_img", "assets/Background/Yellow.png");
        this.load.image("background_blue_img", "assets/Background/Blue.png");
        this.load.image("spikes_img", "assets/Traps/Spikes/Idle.png");

        //load tilemap
        this.load.tilemapTiledJSON("level1", "tiled/level1.json");


        //lade alle Bilder von allen Charakteren
        for (let character of this.characterNames) {
            this.load.spritesheet({
                key: `${character}_idle`,
                url: `assets/Main Characters/${character}/Idle (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 11
                }
            });
            this.load.spritesheet({
                key: `${character}_run`,
                url: `assets/Main Characters/${character}/Run (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 11
                }
            });
            this.load.spritesheet({
                key: `${character}_hit`,
                url: `assets/Main Characters/${character}/Hit (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 6
                }
            });
            this.load.spritesheet({
                key: `${character}_jump`,
                url: `assets/Main Characters/${character}/Jump (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 6
                }
            });
            this.load.spritesheet({
                key: `${character}_fall`,
                url: `assets/Main Characters/${character}/Fall (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 6
                }
            });
            this.load.spritesheet({
                key: `${character}_double_Jump`,
                url: `assets/Main Characters/${character}/Double Jump (32x32).png`,
                frameConfig: {
                    frameWidth: 32,
                    frameHeight: 32,
                    startFrame: 0,
                    endFrame: 6
                }
            });
        }

    }

    create() {
        this.scene.start("play");
    }

}