import React, { useEffect, useRef } from "react"

type WelcomeMessageProps = {
    message: string;
    inputRef: React.RefObject<HTMLInputElement>;
}

const WelcomeMessage = (props: WelcomeMessageProps) => {
    // const [index, setIndex] = useState(0);
    //WelcomeMessageRef sẽ không thay đổi giá trị khi re-render
    const WelcomeMessageRef = React.useRef<HTMLDivElement>(null);
    let index = useRef<number>(0);

    useEffect(() => {
        //Disabled input -> Không cho input
        if (props.inputRef.current) {
            props.inputRef.current.disabled = true;
        }
        //console.log(index);
        //console.log(WelcomeMessageRef.current);
        const typeText = setInterval(() => {
            if (!WelcomeMessageRef.current) {
                return;
            }

            WelcomeMessageRef.current.insertAdjacentText(
                "beforeend",
                props.message[index.current++]
            );
            
            //console.log(props.message);
            if (index.current === props.message.length){
                clearInterval(typeText);
                if (props.inputRef.current) {
                    props.inputRef.current.disabled = false;
                    props.inputRef.current.focus();
                }
            }
        },30);
        return () => clearInterval(typeText);
    },[props.inputRef, props.message]);
    return (
        <div ref={WelcomeMessageRef} className="terminal-welcome-message"></div>
    );
};

export default WelcomeMessage;