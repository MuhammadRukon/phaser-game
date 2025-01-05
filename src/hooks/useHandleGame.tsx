import { useEffect } from "react";
import { config } from "../config/gameConfig";
import { OVER, START } from "../constants";
import Phaser from "phaser";

type Props = React.Dispatch<React.SetStateAction<boolean>>;
let game: Phaser.Game;

export default function useHandleGame(setIsRunning: Props) {
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
    }, [game]);
}
