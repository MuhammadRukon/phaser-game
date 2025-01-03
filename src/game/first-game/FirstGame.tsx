import { useEffect } from "react";
import { config } from "../../config/game-config";

export default function FirstGame() {
    useEffect(() => {
        var game = new Phaser.Game(config);
        return () => game.destroy(true);
    }, []);
    return <div id="game-container"></div>;
}
