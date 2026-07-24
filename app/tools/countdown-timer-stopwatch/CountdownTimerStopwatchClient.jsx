"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Flag, Timer as TimerIcon, Watch } from "lucide-react";

function formatStopwatch(ms) {
  const totalMs = Math.max(0, ms);
  const m = Math.floor(totalMs / 60000);
  const s = Math.floor((totalMs % 60000) / 1000);
  const cs = Math.floor((totalMs % 1000) / 10);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

function formatCountdown(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return h > 0
    ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    // Audio not available — silently skip, visual alert still shows
  }
}

export default function CountdownTimerStopwatchClient() {
  const [mode, setMode] = useState("timer");

  // Stopwatch state
  const [swElapsed, setSwElapsed] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const swStartRef = useRef(null);

  // Timer state
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [remainingMs, setRemainingMs] = useState(5 * 60000);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const timerEndRef = useRef(null);

  useEffect(() => {
    if (!swRunning) return;
    const id = setInterval(() => setSwElapsed(Date.now() - swStartRef.current), 30);
    return () => clearInterval(id);
  }, [swRunning]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      const left = timerEndRef.current - Date.now();
      if (left <= 0) {
        setRemainingMs(0);
        setTimerRunning(false);
        setTimerDone(true);
        playBeep();
        clearInterval(id);
      } else {
        setRemainingMs(left);
      }
    }, 200);
    return () => clearInterval(id);
  }, [timerRunning]);

  const startStopwatch = () => {
    swStartRef.current = Date.now() - swElapsed;
    setSwRunning(true);
  };
  const pauseStopwatch = () => setSwRunning(false);
  const resetStopwatch = () => {
    setSwRunning(false);
    setSwElapsed(0);
    setLaps([]);
  };
  const addLap = () => setLaps((prev) => [swElapsed, ...prev]);

  const startTimer = () => {
    const totalMs = remainingMs > 0 ? remainingMs : (Number(inputMinutes) * 60 + Number(inputSeconds)) * 1000;
    timerEndRef.current = Date.now() + totalMs;
    setRemainingMs(totalMs);
    setTimerRunning(true);
    setTimerDone(false);
  };
  const pauseTimer = () => setTimerRunning(false);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimerDone(false);
    setRemainingMs((Number(inputMinutes) * 60 + Number(inputSeconds)) * 1000);
  };

  const presetMinutes = [1, 5, 10, 15, 25];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-5 flex gap-2">
        {[
          ["timer", "Timer", TimerIcon],
          ["stopwatch", "Stopwatch", Watch],
        ].map(([m, label, Icon]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-xs font-medium transition ${
              mode === m ? "bg-violet-400 text-slate-950" : "border border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {mode === "timer" ? (
        <div>
          <div
            className={`flex items-center justify-center rounded-xl border p-8 text-center font-mono text-5xl font-bold transition sm:text-6xl ${
              timerDone
                ? "border-violet-400/40 bg-violet-400/10 text-violet-300"
                : "border-slate-800 bg-slate-950/60 text-slate-100"
            }`}
          >
            {formatCountdown(remainingMs)}
          </div>

          {timerDone && (
            <p className="mt-3 text-center text-sm font-medium text-violet-300">Time's up!</p>
          )}

          {!timerRunning && !timerDone && (
            <div className="mt-4 flex flex-col gap-3 sm:grid sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Minutes</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  className="h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:border-violet-400/50"
                  value={inputMinutes}
                  onChange={(e) => {
                    setInputMinutes(e.target.value);
                    setRemainingMs((Number(e.target.value) * 60 + Number(inputSeconds)) * 1000);
                  }}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">Seconds</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="59"
                  className="h-12 w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:border-violet-400/50"
                  value={inputSeconds}
                  onChange={(e) => {
                    setInputSeconds(e.target.value);
                    setRemainingMs((Number(inputMinutes) * 60 + Number(e.target.value)) * 1000);
                  }}
                />
              </div>
            </div>
          )}

          {!timerRunning && !timerDone && (
            <div className="mt-3 flex flex-wrap gap-2">
              {presetMinutes.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setInputMinutes(m);
                    setInputSeconds(0);
                    setRemainingMs(m * 60000);
                  }}
                  className="h-9 rounded-lg border border-slate-700 px-3 text-xs text-slate-300 transition hover:bg-slate-800"
                >
                  {m} min
                </button>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            {!timerRunning ? (
              <button
                onClick={startTimer}
                disabled={remainingMs <= 0}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:opacity-40"
              >
                <Play className="h-4 w-4" />
                Start
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
              >
                <Pause className="h-4 w-4" />
                Pause
              </button>
            )}
            <button
              onClick={resetTimer}
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 p-8 text-center font-mono text-5xl font-bold text-slate-100 sm:text-6xl">
            {formatStopwatch(swElapsed)}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {!swRunning ? (
              <button
                onClick={startStopwatch}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
              >
                <Play className="h-4 w-4" />
                {swElapsed > 0 ? "Resume" : "Start"}
              </button>
            ) : (
              <button
                onClick={pauseStopwatch}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
              >
                <Pause className="h-4 w-4" />
                Pause
              </button>
            )}
            <button
              onClick={addLap}
              disabled={!swRunning}
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-40"
            >
              <Flag className="h-4 w-4" />
              Lap
            </button>
            <button
              onClick={resetStopwatch}
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          {laps.length > 0 && (
            <div className="mt-4 max-h-48 overflow-y-auto rounded-lg border border-slate-800">
              {laps.map((lap, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-sm last:border-0"
                >
                  <span className="text-slate-500">Lap {laps.length - i}</span>
                  <span className="font-mono text-slate-200">{formatStopwatch(lap)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
