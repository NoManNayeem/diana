"use client";

import { useEffect, useState, useCallback } from "react";

const DEFAULT_PREFS = {
  density: "comfortable", // comfortable | compact
  fontSize: "md", // sm | md | lg
  sttLanguage: "en-US",
  ttsRate: 1.0,
  reducedMotion: false,
};

export function useUserPrefs() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("diana_user_prefs") : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        setPrefs({ ...DEFAULT_PREFS, ...parsed });
      }
    } catch (e) {
      console.warn("prefs:init:error", e);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("diana_user_prefs", JSON.stringify(prefs));
    } catch (e) {
      console.warn("prefs:persist:error", e);
    }
  }, [prefs, ready]);

  const updatePref = useCallback((key, value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { prefs, setPrefs, updatePref, ready };
}


