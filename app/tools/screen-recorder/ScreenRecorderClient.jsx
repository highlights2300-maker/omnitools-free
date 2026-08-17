"use client";

import { useEffect, useRef, useState } from "react";
import { ScreenShare, Square, Download, CircleDot, AlertCircle } from "lucide-react";

function pickMimeType() {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  for (const type of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(type)) return type;
  }
  return "";
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function ScreenRecorderClient() {
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState("idle"); // idle | recording | stopped
  const [includeAudio, setIncludeAudio] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState(null);

  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getDisplayMedia || typeof MediaRecorder === "undefined") {
      setSupported(false);
    }
    return () => {
      cleanupStream();
      clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanupStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: includeAudio,
      });
      streamRef.current = stream;

      // If the user clicks the browser's own native "Stop sharing" button,
      // the video track ends — this needs to trigger the same stop logic
      // as clicking our own Stop button.
      stream.getVideoTracks()[0].addEventListener("ended", () => stopRecording());

      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || "video/webm" });
        setResultUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        setResultSize(blob.size);
        setStatus("stopped");
        cleanupStream();
        clearInterval(timerRef.current);
      };

      recorderRef.current = recorder;
      recorder.start();
      setStatus("recording");
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (e) {
      if (e.name !== "NotAllowedError") {
        setError("Couldn't start screen recording. Try again, or use a different browser.");
      }
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "screen-recording.webm";
    a.click();
  };

  const recordAgain = () => {
    setStatus("idle");
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setSeconds(0);
  };

  const formatBytes = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  if (!supported) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-400">
        Your browser doesn't support the screen-recording features this tool relies on. Try a recent
        version of Chrome, Edge, or Firefox on desktop.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {status === "idle" && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 px-6 py-16 text-center">
          <ScreenShare className="mb-3 h-9 w-9 text-slate-600" />
          <p className="text-sm font-medium text-slate-300">Record your screen, a window, or a tab</p>
          <p className="mt-1 text-xs text-slate-500">You'll be asked which one to share when you start</p>
          <label className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <input
              type="checkbox"
              checked={includeAudio}
              onChange={(e) => setIncludeAudio(e.target.checked)}
              className="h-4 w-4 accent-violet-400"
            />
            Include audio (if your browser and selection support it)
          </label>
          {error && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5" />
              {error}
            </p>
          )}
          <button
            onClick={startRecording}
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
          >
            <ScreenShare className="h-4 w-4" />
            Start recording
          </button>
        </div>
      )}

      {status === "recording" && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-red-400/30 bg-red-400/5 px-6 py-16 text-center">
          <div className="flex items-center gap-2 text-red-400">
            <CircleDot className="h-5 w-5 animate-pulse" />
            <span className="font-mono text-2xl font-semibold">{formatDuration(seconds)}</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Recording — this indicator, or the browser's own "Stop sharing" control, both end it.</p>
          <button
            onClick={stopRecording}
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-lg bg-red-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-red-300"
          >
            <Square className="h-4 w-4" />
            Stop recording
          </button>
        </div>
      )}

      {status === "stopped" && resultUrl && (
        <div>
          <video src={resultUrl} controls className="w-full rounded-xl border border-slate-800 bg-black" />
          <p className="mt-2 font-mono text-xs text-slate-500">
            {formatDuration(seconds)} · {formatBytes(resultSize)}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={download}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
            >
              <Download className="h-4 w-4" />
              Download .webm
            </button>
            <button
              onClick={recordAgain}
              className="inline-flex h-12 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Record again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
