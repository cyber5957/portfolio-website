"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const LINES = [
  "Initializing SOC environment...",
  "Collecting Windows Event Logs...",
  "Parsing network traffic...",
  "Running threat intelligence checks...",
  "Suspicious login detected",
  "Investigating endpoint activity...",
  "IOC matched successfully",
  "Incident severity: Medium",
  "Containment completed",
  "Report generated"
];

export function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    function tick() {
      const current = LINES[lineIndex];
      if (!current) return;
      if (charIndex < current.length) {
        setVisibleLines((prev) => {
          const copy = prev.slice();
          copy[lineIndex] = (copy[lineIndex] || "") + current[charIndex];
          return copy;
        });
        setCharIndex((c) => c + 1);
        timeoutRef.current = window.setTimeout(tick, 28);
      } else {
        // line finished, pause then move to next
        timeoutRef.current = window.setTimeout(() => {
          const next = lineIndex + 1;
          if (next >= LINES.length) {
            // loop: clear and restart after short pause
            timeoutRef.current = window.setTimeout(() => {
              setVisibleLines([]);
              setLineIndex(0);
              setCharIndex(0);
            }, 1400);
          } else {
            setLineIndex(next);
            setCharIndex(0);
          }
        }, 480);
      }
    }

    timeoutRef.current = window.setTimeout(tick, 400);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex, charIndex]);

  // auto-scroll when visibleLines changes
  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className="w-full">
      <div className="h-[260px] min-h-[240px] w-full rounded-[1.2rem] border border-cyan-400/20 bg-[#071127] shadow-[0_20px_60px_rgba(30,144,255,0.08)] p-3 text-sm text-slate-200">
        <div className="flex items-center gap-3 border-b border-white/6 pb-2">
          <div className="flex items-center gap-2 px-2">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
          </div>
          <div className="ml-1 font-dashboard text-xs uppercase tracking-[0.16em] text-cyan-300">Security Terminal</div>
        </div>

        <div className="mt-3 h-[calc(100%-3.25rem)] overflow-hidden">
          <pre ref={preRef} className="m-0 h-full overflow-y-auto whitespace-pre-wrap font-mono text-[13px] leading-6">
            {visibleLines.map((line, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-cyan-300">&gt;</span>
                <span className="flex-1">{line}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-cyan-300">&gt;</span>
              <motion.span
                className="inline-block"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="font-mono">_</span>
              </motion.span>
            </div>
          </pre>
        </div>
      </div>
    </div>
  );
}

// no default export to avoid CJS/ESM interop issues in the build
