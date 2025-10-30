"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useUserPrefs } from "@/hooks/useUserPrefs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { prefs, updatePref, ready } = useUserPrefs();

  useEffect(() => {
    // honor reduced motion preference
    if (!ready) return;
    try {
      const el = document.documentElement;
      if (prefs.reducedMotion) {
        el.style.setProperty("scroll-behavior", "auto");
      } else {
        el.style.setProperty("scroll-behavior", "smooth");
      }
    } catch {}
  }, [prefs.reducedMotion, ready]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Settings</h1>
            <p className="text-sm text-muted-foreground">Customize your Diana experience</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 space-y-4">
            <h2 className="text-sm font-medium">Appearance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Theme</label>
                <div className="mt-2">
                  <Select value={theme} onValueChange={(v) => setTheme(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Current: {resolvedTheme}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Density</label>
                <div className="mt-2">
                  <Select value={prefs.density} onValueChange={(v) => updatePref("density", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Font size</label>
                <div className="mt-2">
                  <Select value={prefs.fontSize} onValueChange={(v) => updatePref("fontSize", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 space-y-4">
            <h2 className="text-sm font-medium">Voice</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">STT language</label>
                <div className="mt-2">
                  <Input
                    value={prefs.sttLanguage}
                    onChange={(e) => updatePref("sttLanguage", e.target.value)}
                    placeholder="e.g. en-US"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">TTS rate</label>
                <div className="mt-2">
                  <Input
                    type="number"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={prefs.ttsRate}
                    onChange={(e) => updatePref("ttsRate", Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    try {
                      const utter = new SpeechSynthesisUtterance("This is Diana speaking.");
                      utter.rate = Number(prefs.ttsRate) || 1.0;
                      window.speechSynthesis.speak(utter);
                    } catch {}
                  }}
                >
                  Test TTS
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 space-y-4">
            <h2 className="text-sm font-medium">Accessibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Reduced motion</label>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    type="button"
                    variant={prefs.reducedMotion ? "default" : "outline"}
                    onClick={() => updatePref("reducedMotion", !prefs.reducedMotion)}
                  >
                    {prefs.reducedMotion ? "On" : "Off"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
