"use client";

import React, { useState, useRef, useEffect } from "react";
import { site } from "@/lib/data";

type HistoryItem = {
  id: string;
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
      id: "init",
      type: "system",
      content: (
        <div className="text-zinc-400 mb-2">
          IlyanOS v2.0.0 (x86_64-linux-gnu)
          <br />
          Type 'help' or just ask a question in plain English (powered by Groq).
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<{role: string, content: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isProcessing]);

  const fetchLLMResponse = async (text: string, outputId: string, currentChatLog: {role: string, content: string}[]) => {
    setIsProcessing(true);
    try {
      const res = await fetch(process.env.NODE_ENV === "production" ? "https://ilyanos-backend.onrender.com/api/chat" : "http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...currentChatLog, { role: "user", content: text }] }),
      });

      if (!res.ok) throw new Error("API Error");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      let currentText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          currentText += chunk;

          setHistory((prev) => 
            prev.map(item => item.id === outputId ? { ...item, content: currentText } : item)
          );
        }
      }
    
      // Save assistant response to memory
      setChatLog(prev => [...prev, { role: "user", content: text }, { role: "assistant", content: currentText }]);
    } catch (error) {
      setHistory((prev) => 
        prev.map(item => item.id === outputId ? { ...item, content: "Error connecting to IlyanOS backend." } : item)
      );
    } finally {
      setIsProcessing(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleCommand = (cmd: string) => {
    if (isProcessing) return;
    
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { id: Date.now().toString(), type: "command", content: cmd }]);
      return;
    }

    const commandId = Date.now().toString();
    const outputId = (Date.now() + 1).toString();
    const newHistory: HistoryItem[] = [...history, { id: commandId, type: "command", content: trimmed }];
    
    const args = trimmed.split(" ");
    const command = args[0].toLowerCase();

    let output: React.ReactNode = "";
    let bypassLLM = false;

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
        bypassLLM = true;
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
        bypassLLM = true;
        break;
      case "whoami":
        output = "ilyan khan - ai engineer & full-stack developer";
        bypassLLM = true;
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
        output = "ilyan is not in the sudoers file. This incident will be reported.";
        bypassLLM = true;
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
        bypassLLM = true;
        break;
      case "cat":
        const file = args[1];
        if (file === "about.txt") {
          output = site.headline;
        } else {
          output = `cat: ${file || ''}: No such file or directory`;
        }
        bypassLLM = true;
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
        bypassLLM = true;
        break;
    }

    if (bypassLLM) {
      if (output) {
        newHistory.push({ id: outputId, type: "output", content: output });
      }
      setHistory(newHistory);
      setInput("");
    } else {
      // Send to Groq
      newHistory.push({ id: outputId, type: "output", content: "..." });
      setHistory(newHistory);
      setInput("");
      fetchLLMResponse(trimmed, outputId, chatLog);
    }
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
        {history.map((item) => (
          <div key={item.id}>
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
          {!isProcessing && PROMPT}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCommand(input);
            }}
            disabled={isProcessing}
            className="flex-1 bg-transparent text-zinc-100 !outline-none !ring-0 !border-none !shadow-none"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
