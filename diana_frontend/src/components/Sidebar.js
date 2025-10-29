"use client";

import { useState } from "react";
import Link from "next/link";
import { icons } from "@/config/icons";

export default function Sidebar({ isOpen, onClose }) {
  const [conversations, setConversations] = useState([
    { id: 1, title: "New Conversation", isActive: true },
    { id: 2, title: "AI Development Discussion", isActive: false },
    { id: 3, title: "Voice Recognition Setup", isActive: false },
  ]);

  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  const handleNewChat = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Conversation",
      isActive: true,
    };
    setConversations(prev => 
      prev.map(conv => ({ ...conv, isActive: false })).concat(newConversation)
    );
    setIsNewChatOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-auto
      `}>
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
              <button
                onClick={onClose}
                className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <icons.close className="w-5 h-5" />
              </button>
            </div>
            
            {/* New Chat Button */}
            <button
              onClick={handleNewChat}
              className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <icons.plus className="w-5 h-5" />
              New Chat
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Recent Conversations</h3>
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`w-full text-left p-3 rounded-lg transition-colors group ${
                  conversation.isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{conversation.title}</span>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-secondary rounded">
                      <icons.edit className="w-3 h-3" />
                    </button>
                    <button className="p-1 hover:bg-secondary rounded">
                      <icons.trash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <icons.user className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">User Account</p>
                <p className="text-xs text-muted-foreground">Free Plan</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <icons.settings className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
