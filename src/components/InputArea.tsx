import React, { useEffect, useState } from "react";

type InputAreaProps = {
    terminalPrompt: string[];
    setOutput: React.Dispatch<React.SetStateAction<(string | JSX.Element)[]>>;
    processCommand: (input: string) => void;
    getHistory: (direction: "up" | "down") => string;
    getAutocomplete: (input: string) => string;
    inputRef: React.RefObject<HTMLInputElement>;
}

const InputArea = (props: InputAreaProps) => {
    const [input, setInput] = useState("");
    const [style, setStyle] = useState({
        color: "white",
        weight: "normal",
    });

    const allEchoCommands = [
        "help",
        "whoami",
        "projects",
        "skills",
        "website",
        "blog",
        "clear",
        "cv",
        "all"
    ] as const;
    type AllEchoCommands = typeof allEchoCommands[number];
    function isEchoCommand(arg: string): arg is AllEchoCommands {
        return (allEchoCommands as ReadonlyArray<string>).includes(arg);
    }
    const checkEchoCommand = isEchoCommand(input);

    useEffect(() => {
        checkEchoCommand ? setStyle({color: "#85CDFD", weight: "bold"}) : setStyle({color: "white", weight: "normal"});
    },[input, checkEchoCommand])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }
    
    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === "l"){
            props.setOutput([]);
            event.preventDefault();
        }
        switch (event.key) {
            case "Enter":
                props.processCommand(input);
                setInput("");
                break;
            case "ArrowUp":
                //changelink but not click
                event.preventDefault();
                setInput(props.getHistory("up"));
                break;
            case "ArrowDown":
                event.preventDefault();
                setInput(props.getHistory("down"));
                break;
            case "Tab":
                event.preventDefault();
                setInput(props.getAutocomplete(input));
                break;
        }
    };

    return (
        <div className="terminal-input-area">
            <span className="terminal-prompt">
                <span className="name">{props.terminalPrompt[0]}</span>@<span className="nickname">{props.terminalPrompt[1]}</span><span>{props.terminalPrompt[2]}</span>
            </span>
            <input
                id="change-input"
                type="text"
                className="terminal-input"
                name="input"
                value={input || ''}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                ref={props.inputRef}
                style={{color: style.color, fontWeight: style.weight}}
            />
        </div>
    )
}

export default InputArea;

