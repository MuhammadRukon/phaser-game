import Phaser from "phaser";
import preload from "../game/scenes/preload";
import create from "../game/scenes/create";
import update from "../game/scenes/update";

interface ConfigType {
    type: number;
    width: number;
    height: number;
    physics: {
        default: string;
        arcade: {
            gravity: {
                x?: number;
                y: number;
            };
            debug: boolean;
        };
    };
    scene: {
        preload: (this: Phaser.Scene) => void;
        create: (this: Phaser.Scene) => void;
        update: () => void;
    };
}
export const config: ConfigType = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};
