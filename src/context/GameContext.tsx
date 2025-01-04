import { createContext, useState } from "react";

export const GameContext = createContext<{
    isRunning: boolean;
    stop: () => void;
    start: () => void;
} | null>(null);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const value = {
        isRunning,
        stop: () => setIsRunning(false),
        start: () => setIsRunning(true),
    };
    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
};

export default GameContextProvider;
