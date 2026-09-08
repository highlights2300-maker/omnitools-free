// A self-contained catalog of every tool page, used only for cross-linking
// ("Related Tools") from within individual tool pages. Deliberately kept
// separate from the homepage's own TOOLS array so this can be safely
// imported by any of the 40+ tool page files without touching page.jsx.
//
// Relations are hand-picked for genuine workflow relevance, not just
// "same category" — e.g. PDF Watermarker links to E-Signature Pad because
// people signing a document often want to stamp it too, not just because
// both are document tools.

export const TOOL_CATALOG = {
  // Document Desk
  "pdf-merger": { name: "PDF Merger", desc: "Combine multiple PDFs into one, in order.", href: "/tools/pdf-merger" },
  "pdf-splitter": { name: "PDF Splitter", desc: "Break a large PDF into single-page files.", href: "/tools/pdf-splitter" },
  "image-to-pdf": { name: "Image → PDF", desc: "Turn scans into one clean, print-ready PDF.", href: "/tools/image-to-pdf" },
  "word-counter": { name: "Word Counter", desc: "Instant word, character & reading-time count.", href: "/tools/word-counter" },
  "e-signature-pad": { name: "E-Signature Pad", desc: "Draw a signature, export as transparent PNG.", href: "/tools/e-signature-pad" },
  "file-archiver": { name: "File Archiver", desc: "Zip up several files into one archive.", href: "/tools/file-archiver" },
  "pdf-compressor": { name: "PDF Compressor", desc: "Shrink a PDF by re-rendering pages as images.", href: "/tools/pdf-compressor" },
  "pdf-watermarker": { name: "PDF Watermarker", desc: "Stamp a diagonal text watermark on every page.", href: "/tools/pdf-watermarker" },
  "csv-json-converter": { name: "CSV ⇄ JSON Converter", desc: "Convert spreadsheet data to JSON, or back.", href: "/tools/csv-json-converter" },

  // Media Studio
  "image-compressor": { name: "Image Compressor", desc: "Shrink photos up to 80% with barely any quality loss.", href: "/tools/image-compressor" },
  "image-cropper": { name: "Image Cropper & Resizer", desc: "Crop, resize and export to exact dimensions.", href: "/tools/image-cropper" },
  "video-trimmer": { name: "Video Trimmer", desc: "Cut clips down to the moment that matters.", href: "/tools/video-trimmer" },
  "audio-converter": { name: "Audio Converter", desc: "Convert between MP3, WAV and OGG.", href: "/tools/audio-converter" },
  "qr-code-generator": { name: "QR Code Generator", desc: "Generate a scannable code for a link or text.", href: "/tools/qr-code-generator" },
  "background-remover": { name: "Background Remover", desc: "Lift subjects off their background with one click.", href: "/tools/background-remover" },
  "meme-generator": { name: "Meme Generator", desc: "Drop top & bottom captions on any image.", href: "/tools/meme-generator" },
  "photo-collage-maker": { name: "Photo Collage Maker", desc: "Arrange several photos into one grid layout.", href: "/tools/photo-collage-maker" },
  "image-format-converter": { name: "Image Format Converter", desc: "Convert between JPG, PNG, WebP and more.", href: "/tools/image-format-converter" },
  "gif-maker": { name: "GIF Maker", desc: "Turn a sequence of photos into a looping GIF.", href: "/tools/gif-maker" },
  "video-slideshow-maker": { name: "Video Slideshow Maker", desc: "Turn photos into a video with music & transitions.", href: "/tools/video-slideshow-maker" },

  // Business Kits
  "invoice-generator": { name: "Invoice Generator", desc: "Build a professional invoice, print to PDF.", href: "/tools/invoice-generator" },
  "quote-builder": { name: "Quote Builder", desc: "Put together a polished price quote.", href: "/tools/quote-builder" },
  "business-card-designer": { name: "Business Card Designer", desc: "Design a print-ready double-sided card.", href: "/tools/business-card-designer" },
  "contract-template-kit": { name: "Contract Template Kit", desc: "Fill in a simple service agreement.", href: "/tools/contract-template-kit" },
  "receipt-generator": { name: "Receipt Generator", desc: "Create a simple, printable payment receipt.", href: "/tools/receipt-generator" },
  "proposal-builder": { name: "Proposal Builder", desc: "Draft a clean project proposal.", href: "/tools/proposal-builder" },

  // Quick Calculators
  "unit-converter": { name: "Unit Converter", desc: "Convert length, weight & temperature — exact.", href: "/tools/unit-converter" },
  "tip-calculator": { name: "Tip Calculator", desc: "Split a bill and work out the tip in taps.", href: "/tools/tip-calculator" },
  "percentage-calculator": { name: "Percentage & Markup Calculator", desc: "Work out percentages and markups fast.", href: "/tools/percentage-calculator" },
  "age-calculator": { name: "Age Calculator", desc: "Find the exact age or duration between dates.", href: "/tools/age-calculator" },
  "timesheet-calculator": { name: "Timesheet Calculator", desc: "Add up hours worked and pay for the week.", href: "/tools/timesheet-calculator" },

  // Everyday Tools
  "password-generator": { name: "Password Generator", desc: "Create a strong, random password instantly.", href: "/tools/password-generator" },
  "typing-speed-test": { name: "Typing Speed Test", desc: "Measure your typing speed in WPM.", href: "/tools/typing-speed-test" },
  "countdown-timer-stopwatch": { name: "Timer & Stopwatch", desc: "A countdown timer plus a lap-tracking stopwatch.", href: "/tools/countdown-timer-stopwatch" },
  "text-case-converter": { name: "Text Case Converter", desc: "Convert text to UPPERCASE, camelCase & more.", href: "/tools/text-case-converter" },
  "color-picker-converter": { name: "Color Picker & Converter", desc: "Pick a color, convert HEX, RGB, HSL.", href: "/tools/color-picker-converter" },
  "json-formatter": { name: "JSON Formatter & Validator", desc: "Beautify, minify, and validate JSON.", href: "/tools/json-formatter" },
  "text-diff-checker": { name: "Text Diff Checker", desc: "Compare two texts and see what changed.", href: "/tools/text-diff-checker" },
  "text-to-speech": { name: "Text to Speech", desc: "Convert text to spoken audio.", href: "/tools/text-to-speech" },
  "hash-generator": { name: "Hash Generator", desc: "Generate MD5, SHA-1, SHA-256 & SHA-512 hashes.", href: "/tools/hash-generator" },
  "lorem-ipsum-generator": { name: "Lorem Ipsum Generator", desc: "Generate placeholder text instantly.", href: "/tools/lorem-ipsum-generator" },
  "screen-recorder": { name: "Screen Recorder", desc: "Record your screen, a window, or a tab.", href: "/tools/screen-recorder" },
  "audio-noise-remover": { name: "Audio Noise Remover & Enhancer", desc: "Reduce background hiss and even out volume.", href: "/tools/audio-noise-remover" },
  "audio-transcriber": { name: "Audio Transcriber & Subtitle Generator", desc: "Transcribe speech to text and generate SRT subtitles.", href: "/tools/audio-transcriber" },
};

export const RELATED_TOOLS = {
  "pdf-merger": ["pdf-splitter", "pdf-compressor", "image-to-pdf", "file-archiver"],
  "pdf-splitter": ["pdf-merger", "pdf-compressor", "file-archiver"],
  "image-to-pdf": ["pdf-merger", "image-compressor", "pdf-watermarker"],
  "word-counter": ["text-case-converter", "text-diff-checker", "lorem-ipsum-generator"],
  "e-signature-pad": ["contract-template-kit", "invoice-generator", "pdf-watermarker"],
  "file-archiver": ["pdf-merger", "pdf-splitter", "image-to-pdf"],
  "pdf-compressor": ["pdf-merger", "pdf-splitter", "pdf-watermarker"],
  "pdf-watermarker": ["pdf-compressor", "pdf-merger", "e-signature-pad"],
  "csv-json-converter": ["json-formatter", "text-diff-checker", "hash-generator"],

  "image-compressor": ["image-cropper", "image-format-converter", "background-remover"],
  "image-cropper": ["image-compressor", "image-format-converter", "photo-collage-maker"],
  "video-trimmer": ["video-slideshow-maker", "gif-maker", "audio-converter", "screen-recorder"],
  "audio-converter": ["video-trimmer", "text-to-speech", "audio-noise-remover"],
  "qr-code-generator": ["color-picker-converter", "business-card-designer", "hash-generator"],
  "background-remover": ["photo-collage-maker", "meme-generator", "image-format-converter", "image-cropper"],
  "meme-generator": ["background-remover", "photo-collage-maker", "image-format-converter"],
  "photo-collage-maker": ["background-remover", "meme-generator", "video-slideshow-maker", "gif-maker"],
  "image-format-converter": ["image-compressor", "image-cropper", "background-remover"],
  "gif-maker": ["video-slideshow-maker", "video-trimmer", "photo-collage-maker"],
  "video-slideshow-maker": ["gif-maker", "video-trimmer", "photo-collage-maker", "audio-converter"],

  "invoice-generator": ["quote-builder", "receipt-generator", "business-card-designer", "timesheet-calculator"],
  "quote-builder": ["invoice-generator", "proposal-builder", "business-card-designer"],
  "business-card-designer": ["invoice-generator", "quote-builder", "qr-code-generator"],
  "contract-template-kit": ["e-signature-pad", "invoice-generator", "proposal-builder"],
  "receipt-generator": ["invoice-generator", "quote-builder"],
  "proposal-builder": ["quote-builder", "contract-template-kit", "invoice-generator"],

  "unit-converter": ["percentage-calculator", "tip-calculator", "age-calculator"],
  "tip-calculator": ["percentage-calculator", "unit-converter", "timesheet-calculator"],
  "percentage-calculator": ["tip-calculator", "unit-converter", "timesheet-calculator"],
  "age-calculator": ["timesheet-calculator", "unit-converter", "countdown-timer-stopwatch"],
  "timesheet-calculator": ["invoice-generator", "tip-calculator", "age-calculator"],

  "password-generator": ["hash-generator", "text-case-converter", "color-picker-converter"],
  "typing-speed-test": ["text-case-converter", "word-counter", "countdown-timer-stopwatch"],
  "countdown-timer-stopwatch": ["typing-speed-test", "timesheet-calculator", "age-calculator"],
  "text-case-converter": ["word-counter", "text-diff-checker", "lorem-ipsum-generator"],
  "color-picker-converter": ["qr-code-generator", "password-generator", "hash-generator"],
  "json-formatter": ["csv-json-converter", "text-diff-checker", "hash-generator"],
  "text-diff-checker": ["word-counter", "text-case-converter", "json-formatter"],
  "text-to-speech": ["audio-converter", "video-trimmer", "word-counter"],
  "hash-generator": ["password-generator", "json-formatter", "csv-json-converter"],
  "lorem-ipsum-generator": ["word-counter", "text-case-converter", "text-diff-checker"],
  "screen-recorder": ["video-trimmer", "video-slideshow-maker", "audio-converter"],
  "audio-noise-remover": ["audio-converter", "video-trimmer", "audio-transcriber"],
  "audio-transcriber": ["audio-noise-remover", "audio-converter", "text-to-speech", "video-trimmer"],
};
