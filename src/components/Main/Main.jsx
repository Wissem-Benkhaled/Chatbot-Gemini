import React, { useState } from 'react';
import './Main.css'; 
import { assets } from '../../assets/assets'; 
import { callGemini } from '../../config/gemini'; 

const Main = () => {
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false); 

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { sender: "You", text: input };
        setChatHistory(prev => [...prev, userMsg]);
        setInput(""); 

        setLoading(true); 
        try {
            const reply = await callGemini(userMsg.text); // Pass the user's message
            setChatHistory(prev => [...prev, { sender: "Gemini", text: reply }]);
        } catch (error) {
            console.error("Failed to get response from Gemini:", error);
            setChatHistory(prev => [...prev, { sender: "Gemini", text: "Error: Could not get a response from Gemini." }]);
        } finally {
            setLoading(false); // End loading
        }
    };

    // This function can be used to handle clicks on the example cards
    const handleCardClick = (promptText) => {
        setInput(promptText); // Set the card's text as input
        // Optionally, you could automatically send the message here:
        // sendMessage();
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main_container">
                {chatHistory.length === 0 ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Wissem</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Improve the readability of the following code")}>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="chat_output">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={msg.sender === "You" ? "user_msg" : "gemini_msg"}>
                                <strong>{msg.sender}:</strong>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                        {loading && (
                            <div className="gemini-loader">
                                <img src={assets.gemini_icon} alt="Loading..." className="gemini-icon" />
                            </div>
                        )}
                    </div>
                )}

                <div className="main_bottom">
                    <div className="search_box">
                    <textarea 
                        id='prompt'
                        placeholder='Enter a prompt here'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => {
                           if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        disabled={loading}
                        rows={1}
                         
                    />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            <img
                                src={assets.send_icon}
                                alt="Send Icon"
                                style={{ cursor: 'pointer' }}
                                onClick={sendMessage}
                                disabled={loading} 
                            />
                        </div>
                    </div>
                    <p className="bottom_info">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
                </div>
            </div>
        </div>
    );
};

export default Main;