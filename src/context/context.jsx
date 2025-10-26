    // import {createContext} from 'react';

    // export const Context = createContext();

    // const ContextProvider = ({porps}) => {

    //     const onSet = async(prompet)=>{
    //     await getGeminiResponse(prompet)
    //     }

    //     onSet('Hello, how are you?');
    //     const Context = {}
    //     return (
    //         <Context.Provider value={{}}>
    //             {porps.children}
    //         </Context.Provider>
    //     );
    // }
    // export default ContextProvider;

import React, { useState } from "react";
import { callGemini } from"../config/gemini.js"; 

function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "You", text: input };
    setChat([...chat, userMsg]);

    const reply = await callGemini(input);
    setChat(prev => [...prev, userMsg, { sender: "Gemini", text: reply }]);
    setInput("");
  };

  // Print chat messages to the console instead of rendering UI
  console.log("Chat history:", chat);

  return null;
}

export default Chatbot;
