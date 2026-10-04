"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const terminalSteps = [
  { text: "ilyan@workspace:~$ ", delay: 500, type: "prompt" },
  { text: "python run_inference_pipeline.py --model lora-v2", delay: 50, type: "typing" },
  { text: "[INFO] Initializing FAISS vector store...", delay: 400, type: "log" },
  { text: "[INFO] Loading LoRA adapters into memory (3.2GB)...", delay: 600, type: "log" },
  { text: "[OK] Weights loaded successfully in 412ms.", delay: 300, type: "success" },
  { text: "Optimizing computation graph...", delay: 400, type: "log" },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00", delay: 800, type: "progress" },
  { text: " ", delay: 100, type: "log" },
  { text: "{", delay: 100, type: "json" },
  { text: '  "status": "online",', delay: 100, type: "json" },
  { text: '  "pipeline_latency": "47.5ms",', delay: 100, type: "json" },
  { text: '  "embedding_ms": 11.8,', delay: 100, type: "json" },
  { text: '  "retrieval_ms": 14.2,', delay: 100, type: "json" },
  { text: '  "active_nodes": 4', delay: 100, type: "json" },
  { text: "}", delay: 100, type: "json" },
  { text: " ", delay: 200, type: "log" },
  { text: "[SYSTEM] Pipeline ready for requests.", delay: 200, type: "success" },
  { text: "ilyan@workspace:~$ ", delay: 0, type: "prompt" },
];

export default function HeroAnimation() {
  const [lines, setLines] = useState<typeof terminalSteps>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [typedChars, setTypedChars] = useState("");
  
  useEffect(() => {
    if (currentStep >= terminalSteps.length) return;

    const step = terminalSteps[currentStep];
    
    let timeout: NodeJS.Timeout;

    if (step.type === "typing") {
      let charIndex = 0;
      const typeNextChar = () => {
        if (charIndex < step.text.length) {
          setTypedChars(step.text.substring(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typeNextChar, step.delay);
        } else {
          setLines(prev => [...prev, { ...step, text: step.text }]);
          setTypedChars("");
          setCurrentStep(prev => prev + 1);
        }
      };
      typeNextChar();
    } else {
      timeout = setTimeout(() => {
        setLines(prev => [...prev, step]);
        setCurrentStep(prev => prev + 1);
      }, step.delay);
    }

    return () => clearTimeout(timeout);
  }, [currentStep]);

  return (
    <div className="h-full w-full relative flex items-center justify-center rounded-sm overflow-hidden p-2 sm:p-4">
      <div 
        className="w-full h-full max-h-[400px] flex flex-col rounded-md border overflow-hidden shadow-2xl"
        style={{ borderColor: "var(--border)", backgroundColor: "#0A0A0A" }}
      >
        {/* Terminal Header */}
        <div 
          className="flex items-center px-4 py-3 border-b"
          style={{ borderColor: "var(--border)", backgroundColor: "#111111" }}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="mx-auto font-mono-label text-[10px] text-muted tracking-widest">
            bash — 80x24
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed" style={{ color: "#E5E5E5" }}>
          {lines.map((line, i) => {
            if (line.type === "prompt" && i !== lines.length - 1) {
               // Only show the last prompt actively. Combine previous prompt with typed command.
               return null;
            }
            if (line.type === "typing") {
               // Rendered alongside the prompt
               const promptText = terminalSteps[i - 1]?.text || "";
               return (
                 <div key={i} className="flex flex-wrap gap-2 text-muted mb-1">
                   <span style={{ color: "#4ade80" }}>{promptText.replace("ilyan@workspace:~$", "ilyan@workspace")}</span>
                   <span style={{ color: "#60a5fa" }}>:~$</span>
                   <span style={{ color: "#E5E5E5" }}>{line.text}</span>
                 </div>
               );
            }
            if (line.type === "success") {
              return <div key={i} style={{ color: "#4ade80" }} className="mb-1">{line.text}</div>;
            }
            if (line.type === "json") {
              return <div key={i} style={{ color: "#93c5fd" }} className="ml-4">{line.text}</div>;
            }
            if (line.type === "progress") {
              return <div key={i} style={{ color: "#fcd34d" }} className="mb-1">{line.text}</div>;
            }
            return <div key={i} className="mb-1 text-muted">{line.text}</div>;
          })}

          {/* Active Typing Line */}
          {currentStep < terminalSteps.length && terminalSteps[currentStep].type === "typing" && (
            <div className="flex flex-wrap gap-2 text-muted mb-1">
               <span style={{ color: "#4ade80" }}>ilyan@workspace</span>
               <span style={{ color: "#60a5fa" }}>:~$</span>
               <span style={{ color: "#E5E5E5" }}>
                 {typedChars}
                 <motion.span 
                   animate={{ opacity: [1, 0] }} 
                   transition={{ repeat: Infinity, duration: 0.8 }}
                   className="inline-block w-2 h-4 ml-0.5 align-middle"
                   style={{ backgroundColor: "#E5E5E5" }}
                 />
               </span>
            </div>
          )}

          {/* Static Cursor on Prompt */}
          {currentStep < terminalSteps.length && terminalSteps[currentStep].type === "prompt" && (
            <div className="flex flex-wrap gap-2 text-muted mb-1">
               <span style={{ color: "#4ade80" }}>ilyan@workspace</span>
               <span style={{ color: "#60a5fa" }}>:~$</span>
               <motion.span 
                 animate={{ opacity: [1, 0] }} 
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="inline-block w-2 h-4 align-middle"
                 style={{ backgroundColor: "#E5E5E5" }}
               />
            </div>
          )}

          {/* Final Blinking Cursor */}
          {currentStep >= terminalSteps.length && (
            <div className="flex flex-wrap gap-2 text-muted mb-1">
               <span style={{ color: "#4ade80" }}>ilyan@workspace</span>
               <span style={{ color: "#60a5fa" }}>:~$</span>
               <motion.span 
                 animate={{ opacity: [1, 0] }} 
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="inline-block w-2 h-4 align-middle"
                 style={{ backgroundColor: "#E5E5E5" }}
               />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
