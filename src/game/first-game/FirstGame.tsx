import { useState } from "react";

import { START } from "../../constants";
import Button from "../../components/button/Button";
import { buttonConfig } from "../../config/buttonConfig";
import useHandleGame from "../../hooks/useHandleGame";

export default function FirstGame() {
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const startGame = () => {
        window.postMessage({ type: START });
    };

    useHandleGame(setIsRunning);

    return (
        <div id="game-container">
            {!isRunning && (
                <Button config={buttonConfig} handleClick={startGame} />
            )}
        </div>
    );
}
