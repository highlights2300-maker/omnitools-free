"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";

const textareaClass =
  "h-48 w-full resize-none rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-100 outline-none transition focus:border-violet-400/50";
const selectClass =
  "h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition focus:border-violet-400/50";

export default function TextToSpeechClient() {
  const [text, setText] = useState(
    "Type or paste any text here, choose a voice, and press Play to hear it read aloud."
  );
  const [voices, setVoices] = useState([]);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) setVoices(v);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (!supported || !text.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[voiceIndex]) utterance.voice = voices[voiceIndex];
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const togglePause = () => {
    if (!speaking) return;
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  if (!supported) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-400">
        Your browser doesn't support the built-in speech synthesis feature this tool relies on. Try a
        recent version of Chrome, Edge, Safari, or Firefox.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={textareaClass}
        placeholder="Type or paste text here…"
      />

      <div className="mt-4">
        <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Voice</label>
        <select
          value={voiceIndex}
          onChange={(e) => setVoiceIndex(Number(e.target.value))}
          className={selectClass}
        >
          {voices.length === 0 && <option>Loading voices…</option>}
          {voices.map((v, i) => (
            <option key={`${v.name}-${i}`} value={i}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            Speed — {rate.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="h-12 w-full accent-violet-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">
            Pitch — {pitch.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
            className="h-12 w-full accent-violet-400"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {!speaking ? (
          <button
            onClick={speak}
            disabled={!text.trim()}
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Play className="h-4 w-4" />
            Play
          </button>
        ) : (
          <button
            onClick={togglePause}
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {paused ? "Resume" : "Pause"}
          </button>
        )}
        <button
          onClick={stop}
          disabled={!speaking}
          className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Square className="h-4 w-4" />
          Stop
        </button>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-600">
        <Volume2 className="h-3 w-3" />
        Available voices depend on your device and browser — more voices usually means better quality.
      </p>
    </div>
  );
}
