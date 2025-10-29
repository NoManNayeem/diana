"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/config/icons";
import { useDianaChat } from "@/hooks/useDianaChat";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRootRef = useRef(null);

  const {
    messages,
    append,
    reload,
    stop,
    isLoading,
    error,
  } = useDianaChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    await append({ content: inputText });
    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleFullscreen = () => {
    try {
      const target = chatRootRef.current;
      if (!document.fullscreenElement && target) {
        target.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => {
          console.error("Fullscreen request failed:", err);
        });
      } else if (document.fullscreenElement) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => {
          console.error("Exit fullscreen failed:", err);
        });
      }
    } catch (err) {
      console.error("Fullscreen toggle error:", err);
    }
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    // TODO: Implement voice recording functionality
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={chatRootRef} className={`min-h-screen bg-background text-foreground flex transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50' : ''
    }`}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        isFullscreen={isFullscreen}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {/* Chat Title Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-border bg-background/95"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden"
              >
                <icons.menu className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <icons.robot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">Diana AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Online • Ready to help</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Voice Mode Toggle */}
              <Button
                variant={isVoiceMode ? "default" : "outline"}
                size="icon"
                onClick={toggleVoiceMode}
                className="transition-all duration-200"
              >
                {isVoiceMode ? (
                  <icons.microphone className="w-4 h-4" />
                ) : (
                  <icons.volumeMute className="w-4 h-4" />
                )}
              </Button>
              
              {/* Fullscreen Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreen}
                className="transition-all duration-200"
              >
                {isFullscreen ? (
                  <icons.compress className="w-4 h-4" />
                ) : (
                  <icons.expand className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
          <Card className="flex-1 flex flex-col overflow-hidden shadow-lg">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {message.role === 'user' ? (
                          <icons.user className="w-4 h-4" />
                        ) : (
                          <icons.robot className="w-4 h-4" />
                        )}
                      </div>
                      
                      {/* Message Content */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`rounded-lg px-4 py-3 shadow-sm ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-foreground border border-border'
                        }`}
                      >
                        <div className="prose prose-sm max-w-none">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                        <p suppressHydrationWarning className={`text-xs mt-2 ${
                          message.role === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {isHydrated ? message.createdAt.toLocaleTimeString() : ""}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <icons.robot className="w-4 h-4" />
                    </div>
                    <div className="bg-secondary text-foreground border border-border rounded-lg px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <icons.spinner className="w-4 h-4" />
                        </motion.div>
                        <span className="text-sm">Diana is thinking...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <form onSubmit={handleSubmit} className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <Textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isVoiceMode ? "Voice mode active - click to speak" : "Type your message here..."}
                    className="min-h-[44px] max-h-32 resize-none pr-12"
                    disabled={isLoading}
                  />
                  
                  {/* Voice Recording Button */}
                  {isVoiceMode && (
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 bottom-2 h-8 w-8"
                      onClick={() => {
                        // Implement voice recording integration here
                      }}
                    >
                      <icons.microphone className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                {/* Send Button */}
                <Button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="px-6"
                >
                  {isLoading ? (
                    <icons.spinner className="w-4 h-4 animate-spin" />
                  ) : (
                    <icons.paperPlane className="w-4 h-4" />
                  )}
                </Button>
              </form>
              
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-destructive"
                >
                  {error}
                </motion.div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}