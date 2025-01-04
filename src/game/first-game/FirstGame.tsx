import { useEffect, useState } from "react";
import { config } from "../../config/game-config";
import { OVER, START } from "../../constants";

export default function FirstGame() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    let game: Phaser.Game;

    const startGame = () => {
        window.postMessage({ type: START });
    };

    useEffect(() => {
        const handleGame = (e: MessageEvent) => {
            if (e.data.type === OVER) setIsRunning(false);
            else if (e.data.type === START) {
                if (!!game) {
                    game.destroy(true);
                }
                game = new Phaser.Game(config);
                setIsRunning(true);
            }
        };

        window.addEventListener("message", handleGame);

        return () => window.removeEventListener("message", handleGame);
    }, []);
    return (
        <div id="game-container">
            {!isRunning && (
                <button
                    style={{
                        position: "absolute",
                        top: "70%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                    }}
                    onClick={startGame}
                >
                    Start Game
                </button>
            )}
        </div>
    );
}
