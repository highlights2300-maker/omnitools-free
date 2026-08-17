"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Hash } from "lucide-react";

const textareaClass =
  "h-40 w-full resize-none rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-100 outline-none transition focus:border-violet-400/50";

// Verified against RFC 1321 test vectors (see project notes) — MD5 isn't
// available via the browser's native Web Crypto API, so it's implemented
// here directly.
function md5(input) {
  function rotl(n, s) {
    return (n << s) | (n >>> (32 - s));
  }
  const K = new Int32Array([
    -680876936, -389564586, 606105819, -1044525330, -176418897, 1200080426, -1473231341, -45705983,
    1770035416, -1958414417, -42063, -1990404162, 1804603682, -40341101, -1502002290, 1236535329,
    -165796510, -1069501632, 643717713, -373897302, -701558691, 38016083, -660478335, -405537848,
    568446438, -1019803690, -187363961, 1163531501, -1444681467, -51403784, 1735328473, -1926607734,
    -378558, -2022574463, 1839030562, -35309556, -1530992060, 1272893353, -155497632, -1094730640,
    681279174, -358537222, -722521979, 76029189, -640364487, -421815835, 530742520, -995338651,
    -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606, -1051523, -2054922799,
    1873313359, -30611744, -1560198380, 1309151649, -145523070, -1120210379, 718787259, -343485551,
  ]);
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  const bytes = new TextEncoder().encode(input);
  const bitLen = bytes.length * 8;
  const padLen = ((bytes.length + 8) >>> 6 << 6) + 64 - bytes.length;
  const padded = new Uint8Array(bytes.length + padLen);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(padded.length - 8, bitLen >>> 0, true);
  dv.setUint32(padded.length - 4, Math.floor(bitLen / 4294967296), true);

  let a0 = 1732584193, b0 = -271733879, c0 = -1732584194, d0 = 271733878;

  for (let chunkStart = 0; chunkStart < padded.length; chunkStart += 64) {
    const M = new Int32Array(16);
    for (let j = 0; j < 16; j++) M[j] = dv.getInt32(chunkStart + j * 4, true);
    let A = a0, B = b0, C = c0, D = d0;
    for (let i = 0; i < 64; i++) {
      let F, g;
      if (i < 16) { F = (B & C) | (~B & D); g = i; }
      else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
      else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * i) % 16; }
      F = (F + A + K[i] + M[g]) | 0;
      A = D; D = C; C = B;
      B = (B + rotl(F, S[i])) | 0;
    }
    a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
  }

  const toHex = (n) =>
    [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}

async function sha(algo, input) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function HashRow({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div>
      <label className="mb-1 block text-[11px] uppercase tracking-wider text-slate-500">{label}</label>
      <div className="flex gap-2">
        <div className="h-11 flex-1 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60 px-3 font-mono text-xs leading-[2.75rem] text-slate-200">
          {value || "…"}
        </div>
        <button
          onClick={copy}
          disabled={!value}
          aria-label={`Copy ${label}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100 disabled:opacity-40"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export default function HashGeneratorClient() {
  const [input, setInput] = useState("Hello, QuickZeta!");
  const [hashes, setHashes] = useState({ md5: "", sha1: "", sha256: "", sha512: "" });

  useEffect(() => {
    let cancelled = false;
    async function compute() {
      const md5Hash = input ? md5(input) : "";
      const [sha1Hash, sha256Hash, sha512Hash] = input
        ? await Promise.all([sha("SHA-1", input), sha("SHA-256", input), sha("SHA-512", input)])
        : ["", "", ""];
      if (!cancelled) {
        setHashes({ md5: md5Hash, sha1: sha1Hash, sha256: sha256Hash, sha512: sha512Hash });
      }
    }
    compute();
    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <label className="mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
        <Hash className="h-3 w-3" />
        Input text
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
        className={textareaClass}
        placeholder="Type or paste text here…"
      />

      <div className="mt-4 flex flex-col gap-4">
        <HashRow label="MD5" value={hashes.md5} />
        <HashRow label="SHA-1" value={hashes.sha1} />
        <HashRow label="SHA-256" value={hashes.sha256} />
        <HashRow label="SHA-512" value={hashes.sha512} />
      </div>
    </div>
  );
}
