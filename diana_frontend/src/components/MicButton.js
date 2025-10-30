"use client";

import { useEffect, useRef, useState } from "react";
import { icons } from "@/config/icons";
import { Button } from "@/components/ui/button";

export default function MicButton({ onTranscript, disabled = false }) {
  const recognitionRef = useRef(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (SpeechRecognition) {
      setIsSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = "en-US";
      rec.onresult = (event) => {
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalText += transcript;
        }
        if (finalText && onTranscript) onTranscript(finalText.trim());
      };
      rec.onend = () => setIsListening(false);
      rec.onerror = (e) => {
        setError(e.error || "mic_error");
        setIsListening(false);
      };
      recognitionRef.current = rec;
    }
  }, [onTranscript]);

  const toggle = () => {
    if (!isSupported || disabled) return;
    try {
      if (!isListening) {
        setError(null);
        recognitionRef.current?.start();
        setIsListening(true);
      } else {
        recognitionRef.current?.stop();
        setIsListening(false);
      }
    } catch (e) {
      setError(e?.message || "mic_toggle_error");
      setIsListening(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        size="icon"
        variant={isListening ? "default" : "outline"}
        onClick={toggle}
        aria-pressed={isListening}
        aria-label={isListening ? "Stop recording" : "Start recording"}
        disabled={!isSupported || disabled}
      >
        {isListening ? (
          <icons.microphone className="w-4 h-4" />
        ) : (
          <icons.micOff className="w-4 h-4" />
        )}
      </Button>
      {!isSupported && (
        <span className="text-xs text-muted-foreground">Mic not supported</span>
      )}
      {error && (
        <span className="text-xs text-destructive" role="status">{error}</span>
      )}
    </div>
  );
}


