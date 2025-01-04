import { useEffect, useState } from "react";
import { config } from "../../config/gameConfig";
import { OVER, START } from "../../constants";
import Button from "../../components/button/Button";
import { buttonConfig } from "../../config/buttonConfig";

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
                <>
                    <p
                        style={{
                            color: "black",
                            fontSize: "32px",
                            textAlign: "center",
                            position: "absolute",
                            top: "40%",
                            left: "50%",
                            zIndex: 0,
                            transform: "translateX(-50%)",
                        }}
                    >
                        Keyboard only
                    </p>
                    <Button config={buttonConfig} handleClick={startGame} />
                </>
            )}
        </div>
    );
}
