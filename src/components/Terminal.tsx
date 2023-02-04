import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import InputArea from "./InputArea";
import TerminalOutput from "./TerminalOutput";
import WelcomeMessage from "./WelcomeMessage";
import { HelpCommand, WhoamiCommand, WebsiteCommand ,ProjectCommad, SkillsCommand, BlogCommand } from "./Commands"
import ErrorMess from "./ErrorMess";

type TerminalProps = {
    banner?: string;
    terminalPrompt: string[];
    welcomeMessage?: string
}

// const downloadFile = (url: string, downloadName: string) => {
//     const link = document.createElement("a");
//     link.download = downloadName;
//     link.href  = url;
//     link.click();
//     link.remove();
// }

const Terminal = (props: TerminalProps) => {
    const { banner, terminalPrompt, welcomeMessage } = props;
    const [output, setOutput] = useState<(string | JSX.Element)[]>([]);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(3);

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    }, [output]);

    const echoCommands = [
        "help",
        "whoami",
        "projects",
        "skills",
        "website",
        "blog"
    ] as const;
    const utilityCommands = ["clear", "cv", "all"] as const;
    const allCommands = [...echoCommands, ...utilityCommands];

    type EchoCommand = typeof echoCommands[number];
    type UtilityCommand = typeof utilityCommands[number];
    type Command = typeof allCommands[number];
    
    function isEchoCommand(arg: string): arg is EchoCommand {
        return (echoCommands as ReadonlyArray<string>).includes(arg);
    }
    
    function isUtilityCommand(arg: string): arg is UtilityCommand {
        return (utilityCommands as ReadonlyArray<string>).includes(arg);
    }
    
    function isValidCommand(arg: string): arg is Command {
        return isEchoCommand(arg) || isUtilityCommand(arg);
    }

    const commands: { [key in EchoCommand]: JSX.Element} = {
        help:       <HelpCommand/>,
        whoami:     <WhoamiCommand/>,
        projects:   <ProjectCommad/>,
        skills:     <SkillsCommand/>,
        website:    <WebsiteCommand/>,
        blog:       <BlogCommand/>
    }
    
    const processCommand = (input: string) => {
        const commandRecord = (
            <div 
                ref={(el) => (scrollRef.current = el)}
                className="terminal-command-record"
            >
                <span className="terminal-prompt">
                    <span className="name">{props.terminalPrompt[0]}</span>@<span className="nickname">{props.terminalPrompt[1]}</span><span>{props.terminalPrompt[2]}</span>
                </span>
                <span className="terminal-input">{input}</span>
            </div>
        )
        
        if (input.trim()) {
            setHistory([...history, input]);
            setHistoryIndex(history.length + 1);
        }

        const inputCommand = input.toLowerCase();
        if (!isValidCommand(inputCommand)) {
            setOutput([
                ...output,
                commandRecord,
                <div className="terminal-command-output">
                    <ErrorMess command={inputCommand}/>
                </div>
            ]);
        } else if (isEchoCommand(inputCommand)) {
            setOutput([
                ...output,
                commandRecord,
                <>
                    {commands[inputCommand]}
                </>,
            ]);
        } else if (isUtilityCommand(inputCommand)) {
            switch (inputCommand) {
                case "clear": {
                    setOutput([]);
                    break;
                }
                case "cv": {
                    setOutput([...output, commandRecord,
                    <div className="terminal-command-output">
                        download CV - Nothing :(
                    </div>]);
                    break;
                }
                case "all": {
                    const allCommandsOutput = [
                        "help",
                        "whoami",
                        "projects",
                        "skills",
                        "website",
                        "blog"
                    ].map((command) => (
                        <>
                            <div className="terminal-heading">{command}</div>
                            <div className="terminal-command-output">
                                {commands[command as EchoCommand]}
                            </div>
                        </>
                    ));
                    
                    setOutput([commandRecord, ...allCommandsOutput]);
                    break;
                }
            }
        }
    };

    const getHistory = (direction: "up" | "down") => {
        let updatedIndex;
        if (direction === "up") {
            updatedIndex = historyIndex === 0 ? 0 : historyIndex - 1;
        } else {
            updatedIndex = historyIndex === history.length ? history.length : historyIndex + 1;
        }
        setHistoryIndex(updatedIndex);
        return updatedIndex === history.length ? "" : history[updatedIndex];
    }

    const getAutocomplete = (input: string) => {
        //when type Tab => matchingCommands return a array have with characters
        const matchingCommands = allCommands.filter((c) => c.startsWith(input));
        if (matchingCommands.length === 1){
            return matchingCommands[0];
        } else if (matchingCommands.length === allCommands.length){
            const commandRecord = (
                <div
                    className="terminal-command-record"
                >
                    <span className="terminal-notification">You must input one character</span>
                </div>
            )
            setOutput([...output, commandRecord]);
            return input;
        } else if (matchingCommands.length === 0) {
            const commandRecord = (
                <div
                    ref={(el) => (scrollRef.current = el)}
                    className="terminal-command-record"
                >
                    <span className="terminal-notification">No commands found</span>
                </div>
            )
            setOutput([...output, commandRecord, matchingCommands.join(" ")]);
            return "";
        } else {
            const commandRecord = (
                <div
                    ref={(el) => (scrollRef.current = el)}
                    className="terminal-command-record"
                >
                    <span className="terminal-prompt">
                        <span className="name">{props.terminalPrompt[0]}</span>@<span className="nickname">{props.terminalPrompt[1]}</span><span>{props.terminalPrompt[2]}</span>
                    </span>
                    <span>{input}</span>
                    <br></br>
                    <span className="terminal-notification">You can to using commands: </span>
                </div>
            )
            setOutput([...output, commandRecord, matchingCommands.join(" ")]);
            return input;
        }
    }
    

    // const focusOnInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
    //     if (event.key === "Tab") {
    //       // Prevent tab from moving focus
    //       event.preventDefault();
    //     }
    //     inputRef.current?.focus();
    // };

        // Mỗi lần nhập ta có thể tới vị trí hiện tại khi output thay đổi

    return (
        <div className="terminal-container" tabIndex={-1}>
            <div className="terminal-content">
                {banner && <Banner banner={banner}/>}
                {welcomeMessage && <WelcomeMessage message={welcomeMessage} inputRef={inputRef} />}
                <TerminalOutput outputs={output}/>
                <InputArea
                    terminalPrompt={terminalPrompt}
                    setOutput={setOutput}
                    processCommand={processCommand}
                    getHistory={getHistory}
                    getAutocomplete={getAutocomplete}
                    inputRef={inputRef}
                />
            </div>
        </div>
    );
};

export default Terminal;