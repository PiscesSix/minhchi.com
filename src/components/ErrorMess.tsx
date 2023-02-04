import React from "react";

type ErrorMessProps = {
    command: string;
};

const ErrorMess = (props: ErrorMessProps) => {
    return (
        <div className="terminal-error-group">
            <span className="terminal-error">
                {`command not found: ${props.command}`}
            </span>
            <span>{`Type 'help' to view a list of commands`}</span>
        </div>
    )
};

export default ErrorMess