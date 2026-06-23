'use client';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { runCommand, CmdOutput } from '@/lib/terminal';

type HistoryEntry = { input: string; output: CmdOutput };

const PROMPT = 'luv@portfolio:~$';

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Welcome message
  useEffect(() => {
    setHistory([
      {
        input: '',
        output: {
          type: 'text',
          lines: [
            "welcome. you've reached luv pahwa's portfolio.",
            "type 'help' to see what's possible. type 'cd work' to jump to projects.",
            '',
          ],
        },
      },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const out = runCommand(input);
      if (out.lines[0] === '__CLEAR__') {
        setHistory([]);
      } else {
        setHistory((h) => [...h, { input, output: out }]);
      }
      if (input.trim()) setCmdHistory((c) => [...c, input]);
      setInput('');
      setHistoryIdx(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const all = ['help', 'about', 'projects', 'skills', 'contact', 'whoami', 'socials', 'ls', 'cd', 'clear', 'date', 'echo', 'sudo hire-me'];
      const match = all.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const renderOutput = (out: CmdOutput) => {
    const color =
      out.type === 'error' ? 'text-red-400' :
      out.type === 'ascii' ? 'text-accent' :
      out.type === 'link' ? 'text-accent underline' :
      'text-fg/80';
    return (
      <div className={`${color} whitespace-pre-wrap leading-relaxed`}>
        {out.lines.map((l, i) => (
          <div key={i}>{l || '\u00A0'}</div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      onClick={focusInput}
      className="bg-[#0d0d0d] border border-border rounded-lg overflow-hidden shadow-2xl shadow-accent/5 cursor-text"
      data-hover
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#0a0a0a]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <p className="text-xs text-muted ml-3 font-mono">~/portfolio — zsh</p>
      </div>

      {/* Terminal body */}
      <div
        data-lenis-prevent
        className="p-5 md:p-6 font-mono text-sm md:text-base max-h-[60vh] overflow-y-auto terminal-scroll"
      >
        {history.map((h, i) => (
          <div key={i} className="mb-3">
            {h.input && (
              <div className="flex gap-2">
                <span className="text-accent">{PROMPT}</span>
                <span>{h.input}</span>
              </div>
            )}
            {renderOutput(h.output)}
          </div>
        ))}

        {/* Active input line — left-aligned, cursor sits right after text */}
        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-accent whitespace-nowrap">{PROMPT}</span>

          {/* input auto-sizes to its content via field-sizing */}
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            spellCheck={false}
            autoComplete="off"
            className="bg-transparent outline-none border-none text-fg caret-transparent min-w-[1ch] terminal-input"
          />

          {/* block cursor — sits right after input */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-[8px] h-[18px] bg-accent inline-block -ml-2 align-middle"
            aria-hidden
          />
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Footer hint */}
      <div className="px-5 py-2 border-t border-border bg-[#0a0a0a] text-[10px] text-muted flex justify-between">
        <span>tip: try <span className="text-accent">help</span> · <span className="text-accent">cd work</span> · <span className="text-accent">sudo hire-me</span></span>
        <span>↑↓ history · tab to autocomplete</span>
      </div>
    </motion.div>
  );
}