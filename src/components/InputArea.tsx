import React, { useState } from "react";

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
    let change = document.querySelector("#change-input") as HTMLInputElement | null;

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
    
    function changeColor1(){
        if (change != null){
            change.style.color = `#4884FA`;
            change.style.fontWeight =`bold`;
        }
    }

    function changeColor2(){
        if (change != null){
            change.style.color = `white`;
            change.style.fontWeight =`normal`;
        }
    }

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
                if (change != null){
                    change.removeEventListener('keyup', changeColor1);
                }
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

    if (isEchoCommand(input)){
        // change?.removeEventListener('keyup', changeColor2);
        change?.addEventListener('keyup', changeColor1);
    } else {
        change?.removeEventListener('keyup', changeColor1);
        change?.addEventListener('keyup', changeColor2);
    }
    
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
            />
        </div>
    )
}

export default InputArea;

