import Phaser from "phaser";
import preload from "../game/scenes/preload";
import create from "../game/scenes/create/create";
import update from "../game/scenes/update";

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300, x: 0 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};
