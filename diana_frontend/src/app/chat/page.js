"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/config/icons";
import { useDianaChat } from "@/hooks/useDianaChat";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import MicButton from "@/components/MicButton";
import { Message as AIMessage, MessageContent as AIMessageContent } from "@/components/ai-elements/message";
import { Response as AIResponse } from "@/components/ai-elements/response";
// Removed AI Elements PromptInput due to input handling issues; using Textarea
import { useUserPrefs } from "@/hooks/useUserPrefs";

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const [renderedCount, setRenderedCount] = useState(30);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRootRef = useRef(null);
  const { prefs } = useUserPrefs();

  const {
    messages,
    append,
    reload,
    stop,
    isLoading,
    error,
    setMessages,
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
  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const cmd = isMac ? e.metaKey : e.ctrlKey;
      if (cmd && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (cmd && e.key === 'Enter') {
        e.preventDefault();
        if (!isLoading && inputText.trim()) {
          append({ content: inputText }).then(() => setInputText(""));
        }
      }
      if (e.key === 'Escape') {
        if (isLoading) stop();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isLoading, inputText, append, stop]);

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

              {/* Stop/Regenerate/Clear */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => stop()}
                disabled={!isLoading}
              >
                Stop
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => reload()}
                disabled={isLoading || messages.length === 0}
              >
                Regenerate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessages([])}
                disabled={messages.length === 0}
              >
                Clear
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
            <div className="flex-1 overflow-y-auto p-6 space-y-4" role="log" aria-live="polite" aria-relevant="additions">
              {messages.length > renderedCount && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRenderedCount((c) => Math.min(c + 30, messages.length))}
                  >
                    Load older messages
                  </Button>
                </div>
              )}
              <AnimatePresence initial={false}>
                {messages.slice(-renderedCount).map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={isHydrated && !prefs.reducedMotion ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
                    transition={isHydrated && !prefs.reducedMotion ? { duration: 0.2 } : { duration: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''} max-w-[80%]`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {message.role === 'user' ? (
                          <icons.user className="w-4 h-4" />
                        ) : (
                          <icons.robot className="w-4 h-4" />
                        )}
                      </div>

                      {/* Message */}
                      <div className={`min-w-0 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <AIMessage from={message.role}>
                          <AIMessageContent>
                            <AIResponse>{message.content}</AIResponse>
                          </AIMessageContent>
                        </AIMessage>
                        <p
                          suppressHydrationWarning
                          className="text-xs text-muted-foreground mt-2"
                        >
                          {isHydrated ? message.createdAt.toLocaleTimeString() : ""}
                        </p>
                      </div>
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
            <div className="border-t border-border p-4 space-y-2">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => stop()}
                  disabled={!isLoading}
                >
                  Stop
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => reload()}
                  disabled={isLoading || messages.length === 0}
                >
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessages([])}
                  disabled={messages.length === 0}
                >
                  Clear
                </Button>
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <Textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isVoiceMode ? "Voice mode active - click to speak" : "Type your message here..."}
                    className="min-h-[44px] max-h-32 resize-none pr-12"
                    disabled={isLoading}
                    aria-label="Message input"
                  />
                  {isVoiceMode && (
                    <div className="absolute right-2 bottom-2">
                      <MicButton
                        disabled={isLoading}
                        onTranscript={(text) => {
                          if (text) setInputText((prev) => (prev ? prev + " " + text : text));
                        }}
                      />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  disabled={!inputText.trim() || isLoading}
                  className="px-6"
                  aria-label="Send message"
                  onClick={(e) => handleSubmit(e)}
                >
                  {isLoading ? (
                    <icons.spinner className="w-4 h-4 animate-spin" />
                  ) : (
                    <icons.paperPlane className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                  role="status"
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