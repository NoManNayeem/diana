"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/config/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import TextStreamer from "@/components/TextStreamer";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Diana, your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      isTyping: false,
      isStreaming: false
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
      isTyping: false,
      isStreaming: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Add typing indicator
    const typingMessage = {
      id: Date.now() + 1,
      text: "",
      sender: "ai",
      timestamp: new Date(),
      isTyping: true,
      isStreaming: false
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_query: text.trim() }),
      });

      const data = await response.json();
      
      // Remove typing indicator and add AI response with streaming
      const aiMessageId = Date.now() + 2;
      setStreamingMessageId(aiMessageId);
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, {
          id: aiMessageId,
          text: data.response,
          sender: "ai",
          timestamp: new Date(),
          isTyping: false,
          isStreaming: true
        }];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, {
          id: Date.now() + 2,
          text: "Sorry, I'm having trouble connecting. Please try again.",
          sender: "ai",
          timestamp: new Date(),
          isTyping: false,
          isStreaming: false
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStreamingComplete = (messageId) => {
    setStreamingMessageId(null);
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isStreaming: false }
          : msg
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // TODO: Implement text-to-speech
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Chat Container */}
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 sm:p-6">
        <div className="flex-1 bg-card border border-border rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="border-b border-border bg-secondary/30 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <icons.robot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">Diana AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Online • Ready to help</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSpeaking}
                  className={`p-2 rounded-full transition-colors ${
                    isSpeaking 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {isSpeaking ? <icons.volumeUp className="w-4 h-4" /> : <icons.volumeMute className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {/* Avatar */}
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {message.sender === 'user' ? (
                      <icons.user className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <icons.robot className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </div>
                  
                  {/* Message Content */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-lg px-4 py-3 shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground border border-border'
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <icons.spinner className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.div>
                        <span className="text-xs sm:text-sm">Diana is typing...</span>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs sm:text-sm leading-relaxed">
                          {message.isStreaming && message.id === streamingMessageId ? (
                            <TextStreamer 
                              text={message.text} 
                              speed={20}
                              onComplete={() => handleStreamingComplete(message.id)}
                            />
                          ) : (
                            message.text
                          )}
                        </p>
                        <p className={`text-xs mt-1 sm:mt-2 ${
                          message.sender === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border bg-secondary/30 p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="flex items-end space-x-2 sm:space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full p-3 sm:p-4 pr-10 sm:pr-12 border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base rounded-lg"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
              
              {/* Voice Recording Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={toggleRecording}
                className={`absolute right-2 sm:right-3 bottom-2 sm:bottom-3 p-1.5 sm:p-2 rounded-full transition-colors ${
                  isRecording 
                    ? 'bg-red-500 text-white' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {isRecording ? <icons.stop className="w-3 h-3 sm:w-4 sm:h-4" /> : <icons.microphone className="w-3 h-3 sm:w-4 sm:h-4" />}
              </motion.button>
            </div>
            
            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-3 sm:p-4 bg-primary text-primary-foreground rounded-xl sm:rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              {isLoading ? (
                <icons.spinner className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <icons.paperPlane className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.button>
          </form>
          
          {/* Recording Indicator */}
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 sm:mt-3 flex items-center space-x-2 text-red-500"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm">Recording... Click stop when finished</span>
            </motion.div>
          )}
          </div>
        </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
