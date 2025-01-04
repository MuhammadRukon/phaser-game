import { HEIGHT, OVER, WIDTH } from "../../../constants";
import createPlatforms from "./createPlatforms";
import { createPlayer } from "./createPlayer";
import { createStars } from "./createStars";

type Sprite = Phaser.Physics.Arcade.Sprite;
type GroupType = Phaser.Physics.Arcade.Group;

export let player: Sprite;
let platforms: Phaser.Physics.Arcade.StaticGroup;
let highScore: string = localStorage.getItem("highScore") || "0";
let score: number = 0;
let scoreText: Phaser.GameObjects.Text;
let stars: GroupType;
let bomb: Sprite;
let bombs: GroupType;
let gameOver: boolean = false;

export default function create(this: Phaser.Scene) {
    // background
    this.add.image(WIDTH / 2, HEIGHT / 2, "sky").setDisplaySize(WIDTH, HEIGHT);

    //player creation
    player = createPlayer(this);

    // floors and base
    platforms = createPlatforms(this);

    // enable collisions between player and platforms
    this.physics.add.collider(player, platforms);

    //stars creation
    stars = createStars(this);

    // enable collisions between ground and stars
    this.physics.add.collider(stars, platforms);

    //bomb creation
    bombs = this.physics.add.group();

    // enable collisions between player & bombs, bombs & platforms
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    // star collection
    this.physics.add.overlap(player, stars, collectStar, null, this);
    function collectStar(player: Sprite, star: Sprite) {
        star.disableBody(true, true);

        // score calculation
        score += 10;

        highScore = score > parseInt(highScore) ? score.toString() : highScore;
        scoreText.setText(`Score: ${score}; highscore: ${highScore}`);

        // create more stars and bomb
        if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            let x =
                player.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);
            // bomb creation
            bomb = bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    // game over functionality
    function hitBomb(player: Sprite) {
        this.physics.pause();
        window.postMessage({ type: OVER });
        // score = 0;
        player.setTint(0xff0000);
        player.anims.play("turn");
        gameOver = true;
    }

    // display score
    scoreText = this.add.text(16, 16, `score: 0; highscore: ${highScore}`, {
        fontSize: "32px",
        fill: "#000",
    });
}
