import { GroupType, Sprite, stat } from "./create";
let bomb: Sprite;
export default function collectStars(
    player: Sprite,
    star: Sprite,
    gameStats: stat,
    highScore: string,
    scoreText: Phaser.GameObjects.Text,
    bombs: GroupType,
    stars: GroupType
    // bomb: Sprite
) {
    star.disableBody(true, true);

    // score calculation
    gameStats.score += 10;

    highScore =
        gameStats.score > parseInt(highScore)
            ? gameStats.score.toString()
            : highScore;
    scoreText.setText(`Score: ${gameStats.score}; highscore: ${highScore}`);

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
