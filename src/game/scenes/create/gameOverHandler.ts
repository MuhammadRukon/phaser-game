import { OVER } from "../../../constants";
import Phaser from "phaser";
import { stat } from "./create";
export default function gameOverHandler(
    scene: Phaser.Scene,
    player: Phaser.Physics.Arcade.Sprite,
    gameStats: stat
) {
    scene.physics.pause();
    window.postMessage({ type: OVER });
    gameStats.score = 0;
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameStats.gameOver = true;
}
