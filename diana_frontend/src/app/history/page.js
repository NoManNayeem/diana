"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { icons } from "@/config/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HistoryPage() {
  const [histories, setHistories] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem('diana_chat_messages');
      if (raw) {
        const msgs = JSON.parse(raw);
        const title = msgs[0]?.content?.slice(0, 40) || 'Conversation';
        const last = msgs[msgs.length - 1];
        const preview = last?.content?.slice(0, 80) || '';
        const updatedAt = last?.createdAt ? new Date(last.createdAt) : new Date();
        setHistories([{ id: 1, title, preview, updatedAt }]);
      }
    } catch (e) {
      console.warn('history:load:error', e);
    }
  }, []);

  const filtered = histories.filter(h =>
    h.title.toLowerCase().includes(query.toLowerCase()) ||
    h.preview.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm("Delete this chat permanently?")) {
      setHistories(prev => prev.filter(h => h.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
              <icons.history className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Chat History</h1>
              <p className="text-sm text-muted-foreground">Manage and revisit past conversations</p>
            </div>
          </div>
          <Link href="/chat">
            <Button className="gap-2">
              <icons.plus className="w-4 h-4" /> New Chat
            </Button>
          </Link>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-4">
          <div className="relative">
            <icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <AnimatePresence>
            {filtered.map((h, idx) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: idx * 0.03 }}
              >
                <Card className="p-4 flex items-start justify-between hover:bg-secondary/40 transition-colors">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium truncate">{h.title}</h3>
                    <p className="text-xs text-muted-foreground truncate mt-1">{h.preview}</p>
                    <p className="text-[11px] text-muted-foreground mt-2">{h.updatedAt.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <Link href={`/chat?id=${h.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <icons.comments className="w-3.5 h-3.5" /> Open
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newTitle = prompt("Rename chat:", h.title);
                        if (newTitle && newTitle.trim()) {
                          setHistories(prev => prev.map(x => x.id === h.id ? { ...x, title: newTitle.trim() } : x));
                        }
                      }}
                    >
                      <icons.edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(h.id)}>
                      <icons.trash className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-sm text-muted-foreground mt-10 text-center">No chats found.</div>
        )}
      </div>
    </div>
  );
}
