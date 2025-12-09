import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { IoImagesOutline } from "react-icons/io5";
import { LuLetterText } from "react-icons/lu";
import Header from "./Header";
import { Helmet } from 'react-helmet';
 
const ChatApp = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [outputType, setOutputType] = useState("text");
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const newMessage = { text: input, sender: "user", type: "text" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setIsLoading(true);
    let botResponse;
    try {
      const url =
        outputType === "text"
          ? `https://text.pollinations.ai/${input}`
          : `https://image.pollinations.ai/prompt/${input}`;
      const response = await fetch(url);
      if (outputType === "text") {
        const data = await response.text();
        botResponse = {
          text: data,
          sender: "bot",
          type: "text",
        };
      } else {
        botResponse = {
          text: url,
          sender: "bot",
          type: "image",
        };
      }
      console.log(botResponse);
    } catch (error) {
      botResponse = { text: error.toString(), sender: "bot", type: "text" };
      console.log(botResponse);
    }
    setMessages((prev) => [...prev, botResponse]);
    setIsLoading(false);
  };

  const handleResetChats = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <svg className="absolute top-0 left-0 w-full h-[40rem] opacity-20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <Helmet>
        <meta name="description"
          content="Discover Mindora, powered by Pollination AI, for seamless text and image generation." />
        <meta name="keywords" content="chatbot, AI, Pollination AI, text generation, image generation" />
        <meta name="author" content="Mayank Sahu" />
        <meta property="og:title" content="Mindora - AI-Powered Text & Image Generation" />
        <meta property="og:description"
          content="Discover Mindora, powered by Pollination AI, for seamless text and image generation." />
        
        <meta property="og:url" content="https://www.linkedin.com/in/mayank-sahu-mayanksahu/" />
      
        
     
      </Helmet>






      {/* Header */}
      <Header handleResetChats={handleResetChats} />

      {/* Messages */}
      {/* Messages */}
      <main ref={chatContainerRef} className="flex-1 px-4 sm:px-[25vw] overflow-y-auto py-4">
        {messages.length === 0 ? (
          <div className="flex mt-32 flex-col items-center text-gray-400 py-8 px-4 text-center">
            <p className="text-lg font-semibold">Welcome to Mindora!</p>
            <div className="flex items-center gap-2 mt-4">
              <LuLetterText className="text-xl" />
              <p className="text-sm sm:text-base">
                Start typing a prompt in text mode to generate text responses.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <IoImagesOutline size={20} />
              <p className="text-sm sm:text-base">
                Switch to image mode to generate stunning AI images!
              </p>
            </div>
          </div>
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}


      </main>

      {/* Input */}
      <footer className=" px-4 sm:px-[25vw]">
        <ChatInput
          handleSendMessage={handleSendMessage}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          outputType={outputType}
          setOutputType={setOutputType}
        />
        <div>
          <p className="text-center text-gray-600 py-2 text-[10px]"> Powered by Mindora © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default ChatApp;
