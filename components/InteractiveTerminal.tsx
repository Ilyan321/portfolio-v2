"use client";

import React, { useState, useRef, useEffect } from "react";
import { site, techStack } from "@/lib/data";

type HistoryItem = {
  type: "command" | "output" | "error" | "system";
  content: React.ReactNode;
};

const PROMPT = (
  <span className="flex items-center gap-2 whitespace-nowrap">
    <span style={{ color: "#4ade80" }}>ilyan@workspace</span>
    <span style={{ color: "var(--muted)" }}>:~$</span>
  </span>
);

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      type: "system",
      content: (
        <div className="text-zinc-400 mb-2">
          IlyanOS v2.0.0 (x86_64-linux-gnu)
          <br />
          Type 'help' or just ask a question in plain English.
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleNLP = (text: string): React.ReactNode | null => {
    const lower = text.toLowerCase();
    if (lower.includes("who are you") || lower.includes("about you") || lower.includes("background")) {
      return site.about;
    }
    if (lower.includes("skill") || lower.includes("tech stack") || lower.includes("languages")) {
      return (
        <div className="space-y-2 text-zinc-300">
          {techStack.map(g => (
            <div key={g.group}>
              <span className="text-emerald-400">{g.group}:</span> {g.items.join(", ")}
            </div>
          ))}
        </div>
      );
    }
    if (lower.includes("project") || lower.includes("portfolio") || lower.includes("work")) {
      return "Navigating to projects... (or type 'cd projects')";
    }
    if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("reach")) {
      return `Email me at: ${site.email} or WhatsApp: ${site.phone}`;
    }
    if (lower.includes("hello") || lower.includes("hi ") || lower === "hi") {
      return "Hello! I am Ilyan's AI assistant shell. Ask me about his skills, projects, or contact info.";
    }
    if (lower.includes("joke")) {
      return "Why do programmers prefer dark mode? Because light attracts bugs.";
    }
    return null;
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { type: "command", content: cmd }]);
      return;
    }

    const newHistory: HistoryItem[] = [...history, { type: "command", content: trimmed }];
    const args = trimmed.split(" ");
    const command = args[0].toLowerCase();

    let output: React.ReactNode = "";

    // 1. Check strict commands
    switch (command) {
      case "help":
        output = (
          <div className="grid grid-cols-[80px_1fr] gap-2">
            <span className="text-emerald-400">ls</span><span>List portfolio sections</span>
            <span className="text-emerald-400">cd</span><span>Navigate to a section (e.g. cd projects)</span>
            <span className="text-emerald-400">cat</span><span>Read file contents (e.g. cat about.txt)</span>
            <span className="text-emerald-400">whoami</span><span>Print current user identity</span>
            <span className="text-emerald-400">clear</span><span>Clear terminal output</span>
            <span className="text-emerald-400">python</span><span>Run a script (try: python run_inference.py)</span>
          </div>
        );
        break;
      case "ls":
        output = (
          <div className="flex gap-4 text-blue-400">
            <span>about.txt</span>
            <span>skills/</span>
            <span>projects/</span>
            <span>experience/</span>
            <span>contact/</span>
          </div>
        );
        break;
      case "whoami":
        output = "ilyan khan - ai engineer & full-stack developer";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
        output = "ilyan is not in the sudoers file. This incident will be reported.";
        break;
      case "cd":
        const dir = args[1]?.replace('/', '');
        if (!dir) {
          output = "";
        } else if (["skills", "projects", "experience", "contact", "about"].includes(dir)) {
          output = `Navigating to /${dir}...`;
          window.location.hash = `#${dir}`;
        } else {
          output = `bash: cd: ${dir}: No such file or directory`;
        }
        break;
      case "cat":
        const file = args[1];
        if (file === "about.txt") {
          output = site.headline;
        } else {
          output = `cat: ${file || ''}: No such file or directory`;
        }
        break;
      case "python":
        if (args[1] === "run_inference.py" || args[1] === "run_inference_pipeline.py") {
          output = (
            <div className="space-y-1 font-mono">
              <div className="text-zinc-400">[INFO] Initializing FAISS vector store...</div>
              <div className="text-zinc-400">[INFO] Loading LoRA adapters into memory (3.2GB)...</div>
              <div className="text-emerald-400">[OK] Weights loaded successfully in 412ms.</div>
              <div className="text-zinc-300">Optimizing computation graph...</div>
              <div className="text-yellow-400 flex items-center gap-2">
                <span className="tracking-widest">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span> 100%
              </div>
              <div className="text-yellow-500">0:00:00</div>
              <pre className="text-blue-300 mt-2">
{`{
  "status": "online",
  "pipeline_latency": "47.5ms",
  "embedding_ms": 11.8,
  "retrieval_ms": 14.2,
  "active_nodes": 4
}`}
              </pre>
            </div>
          );
        } else {
          output = `python: can't open file '${args[1]}': [Errno 2] No such file or directory`;
        }
        break;
      default:
        // 2. Fallback to NLP if command not found
        const nlpResponse = handleNLP(trimmed);
        if (nlpResponse) {
          output = nlpResponse;
          if (trimmed.toLowerCase().includes("project") || trimmed.toLowerCase().includes("portfolio")) {
             setTimeout(() => { window.location.hash = "#projects"; }, 800);
          }
        } else {
          output = `bash: ${command}: command not found. (Try 'help' or ask a question in English!)`;
        }
    }

    if (output) {
      newHistory.push({ type: "output", content: output });
    }
    setHistory(newHistory);
    setInput("");
  };

  return (
    <div
      className="w-full h-[400px] lg:h-[500px] flex flex-col rounded-xl overflow-hidden shadow-2xl font-mono text-[13px] sm:text-sm"
      style={{ backgroundColor: "#0D1117", border: "1px solid #30363D" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Mac OS Window Header */}
      <div className="flex items-center px-4 py-3 bg-[#161B22] border-b border-[#30363D]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-xs text-zinc-400 tracking-wider">
          bash — 80x24
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ color: "#E6EDF3", scrollbarWidth: "thin", scrollbarColor: "#30363D transparent" }}
      >
        {history.map((item, i) => (
          <div key={i}>
            {item.type === "command" && (
              <div className="flex gap-2 items-start">
                {PROMPT}
                <span className="text-zinc-100 break-all">{item.content}</span>
              </div>
            )}
            {item.type === "output" && (
              <div className="mt-1 text-zinc-300 break-words whitespace-pre-wrap">
                {item.content}
              </div>
            )}
            {item.type === "system" && <div>{item.content}</div>}
          </div>
        ))}

        <div className="flex gap-2 items-center">
          {PROMPT}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCommand(input);
            }}
            className="flex-1 bg-transparent text-zinc-100 !outline-none !ring-0 !border-none !shadow-none"
            style={{ outline: "none", boxShadow: "none", border: "none" }}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
