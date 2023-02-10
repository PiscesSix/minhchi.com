import React from 'react';
import "./App.css"
import Terminal from './components/Terminal';

const welcomeMessage = `WELCOME 

Type 'help' to view a list of commands.`;

export const bannerCondensed = (): string => {
  return `
  ███╗   ███╗██╗███╗  ██╗██╗  ██╗ █████╗ ██╗  ██╗██╗
  ████╗ ████║██║████╗ ██║██║  ██║██╔══██╗██║  ██║██║
  ██╔████╔██║██║██╔██╗██║███████║██║  ╚═╝███████║██║
  ██║╚██╔╝██║██║██║╚████║██╔══██║██║  ██╗██╔══██║██║
  ██║ ╚═╝ ██║██║██║ ╚███║██║  ██║╚█████╔╝██║  ██║██║██╗██╗██╗
  ╚═╝     ╚═╝╚═╝╚═╝  ╚══╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝╚═╝╚═╝╚═╝
`
}

const name = "nob";
const nickname = "minhchi";
const ic = ": $~ " ;
const prompt: string[] = [name, nickname, ic];

function App() {
  return (
    <div className="App">
        <Terminal
          banner={bannerCondensed()}
          terminalPrompt={prompt}
          welcomeMessage={welcomeMessage}
        />
    </div>
  );
}

export default App;
