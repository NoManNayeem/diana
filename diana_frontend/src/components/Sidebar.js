"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/config/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Sidebar({ isOpen, onClose, isFullscreen = false }) {
  const [conversations, setConversations] = useState([
    { id: 1, title: "New Conversation", isActive: true, lastMessage: "Hello! How can I help you today?", timestamp: new Date() },
    { id: 2, title: "AI Development Discussion", isActive: false, lastMessage: "Let's discuss the latest AI trends", timestamp: new Date(Date.now() - 3600000) },
    { id: 3, title: "Voice Recognition Setup", isActive: false, lastMessage: "Setting up voice recognition features", timestamp: new Date(Date.now() - 7200000) },
    { id: 4, title: "Project Planning", isActive: false, lastMessage: "Planning the next phase of development", timestamp: new Date(Date.now() - 86400000) },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleNewChat = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Conversation",
      isActive: true,
      lastMessage: "",
      timestamp: new Date(),
    };
    setConversations(prev => 
      prev.map(conv => ({ ...conv, isActive: false })).concat(newConversation)
    );
  };

  const handleDeleteConversation = (id) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      setConversations(prev => prev.filter(conv => conv.id !== id));
    }
  };

  const handleEditConversation = (id, newTitle) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, title: newTitle } : conv
      )
    );
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isFullscreen ? 'hidden' : ''}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="text-primary-foreground font-bold text-sm">D</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">Diana</span>
                  <span className="text-xs text-muted-foreground -mt-1">AI Assistant</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="md:hidden"
              >
                <icons.close className="w-5 h-5" />
              </Button>
            </div>
            
            {/* New Chat Button */}
            <Button
              onClick={handleNewChat}
              className="w-full flex items-center gap-3"
            >
              <icons.plus className="w-5 h-5" />
              New Chat
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Recent Conversations</h3>
            <AnimatePresence>
              {filteredConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`p-3 cursor-pointer transition-all duration-200 group ${
                      conversation.isActive
                        ? 'bg-primary/10 border-primary/20 shadow-md'
                        : 'hover:bg-secondary/50 hover:shadow-sm'
                    }`}
                    onClick={() => {
                      setConversations(prev => 
                        prev.map(conv => ({ ...conv, isActive: conv.id === conversation.id }))
                      );
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate mb-1">
                          {conversation.title}
                        </h4>
                        {conversation.lastMessage && (
                          <p className="text-xs text-muted-foreground truncate mb-2">
                            {conversation.lastMessage}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {conversation.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newTitle = prompt('Edit conversation title:', conversation.title);
                            if (newTitle && newTitle.trim()) {
                              handleEditConversation(conversation.id, newTitle.trim());
                            }
                          }}
                        >
                          <icons.edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConversation(conversation.id);
                          }}
                        >
                          <icons.trash className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-3">
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start">
                <icons.settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
            </Link>
            
            <Link href="/history">
              <Button variant="ghost" className="w-full justify-start">
                <icons.history className="w-4 h-4 mr-3" />
                Chat History
              </Button>
            </Link>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <icons.user className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">User Account</p>
                <p className="text-xs text-muted-foreground">Free Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}