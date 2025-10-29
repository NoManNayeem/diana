"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { icons } from "@/config/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "system",
    language: "en",
    voiceEnabled: true,
    autoSave: true,
    notifications: true,
    apiEndpoint: "http://localhost:8000",
    maxTokens: 1000,
    temperature: 0.7,
    systemPrompt: "You are Diana, a helpful AI assistant. Be concise and helpful in your responses.",
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: Implement settings save to localStorage or backend
    localStorage.setItem('diana-settings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        theme: "system",
        language: "en",
        voiceEnabled: true,
        autoSave: true,
        notifications: true,
        apiEndpoint: "http://localhost:8000",
        maxTokens: 1000,
        temperature: 0.7,
        systemPrompt: "You are Diana, a helpful AI assistant. Be concise and helpful in your responses.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <icons.settings className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground">Customize your Diana experience</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <icons.cogs className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic configuration for your Diana assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background"
                  >
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Voice Mode</label>
                    <p className="text-xs text-muted-foreground">Enable voice interactions</p>
                  </div>
                  <Button
                    variant={settings.voiceEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSettingChange('voiceEnabled', !settings.voiceEnabled)}
                  >
                    {settings.voiceEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Auto Save</label>
                    <p className="text-xs text-muted-foreground">Automatically save conversations</p>
                  </div>
                  <Button
                    variant={settings.autoSave ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                  >
                    {settings.autoSave ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Notifications</label>
                    <p className="text-xs text-muted-foreground">Show desktop notifications</p>
                  </div>
                  <Button
                    variant={settings.notifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSettingChange('notifications', !settings.notifications)}
                  >
                    {settings.notifications ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <icons.rocket className="w-5 h-5" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Configure your AI model and backend settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">API Endpoint</label>
                <input
                  type="url"
                  value={settings.apiEndpoint}
                  onChange={(e) => handleSettingChange('apiEndpoint', e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background"
                  placeholder="http://localhost:8000"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Tokens</label>
                  <input
                    type="number"
                    value={settings.maxTokens}
                    onChange={(e) => handleSettingChange('maxTokens', parseInt(e.target.value))}
                    className="w-full p-2 border border-border rounded-lg bg-background"
                    min="100"
                    max="4000"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperature</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={settings.temperature}
                    onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    {settings.temperature} (0 = Focused, 2 = Creative)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Prompt */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <icons.brain className="w-5 h-5" />
                System Prompt
              </CardTitle>
              <CardDescription>
                Customize how Diana behaves and responds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={settings.systemPrompt}
                onChange={(e) => handleSettingChange('systemPrompt', e.target.value)}
                placeholder="Enter your custom system prompt..."
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
