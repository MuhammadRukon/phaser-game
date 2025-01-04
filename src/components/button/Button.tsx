import { buttonConfig } from "../../config/buttonConfig";

interface buttonType {
    config: buttonConfig;
    handleClick: () => void;
}
export default function Button({ config, handleClick }: buttonType) {
    return (
        <button onClick={handleClick} style={config?.buttonStyle}>
            {config?.buttonText}
        </button>
    );
}
