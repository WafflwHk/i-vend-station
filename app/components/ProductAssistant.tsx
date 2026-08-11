"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AssistantLink, getProductAssistantReply } from "../lib/product-assistant";
import styles from "./product-assistant.module.css";

type AssistantMessage = {
  id: string;
  role: "assistant" | "user";
  title?: string;
  text: string;
  links?: AssistantLink[];
};

type SpeechResultEvent = Event & {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: { transcript: string };
    };
  };
};

type SpeechErrorEvent = Event & { error: string };

type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: SpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

const welcomeMessage: AssistantMessage = {
  id: "welcome",
  role: "assistant",
  title: "Welcome to I Vend Station",
  text: "Tell me what you want to sell, where the machine will go, or whether you need cashless payments. I’ll help you find products worth comparing.",
  links: [{ label: "Browse machines", href: "/machines" }],
};

const suggestedQuestions = [
  "Which machine suits a small space?",
  "Show me the coffee machine",
  "How does T05 cashless work?",
  "How do I request a quote?",
];

export default function ProductAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState("Type a question or use the microphone.");
  const [recognitionAvailable, setRecognitionAvailable] = useState(false);
  const [speechOutputAvailable, setSpeechOutputAvailable] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const messageNumber = useRef(0);
  const submitRef = useRef<(question: string) => void>(() => undefined);

  const submitQuestion = useCallback((question: string) => {
    const trimmed = question.trim().slice(0, 240);
    if (!trimmed) return;

    const currentMachineSlug = pathname.startsWith("/machines/") ? pathname.split("/")[2] : undefined;
    const reply = getProductAssistantReply(trimmed, currentMachineSlug);
    messageNumber.current += 1;
    const number = messageNumber.current;
    setMessages((current) => [
      ...current,
      { id: `question-${number}`, role: "user", text: trimmed },
      {
        id: `reply-${number}`,
        role: "assistant",
        title: reply.title,
        text: reply.text,
        links: reply.links,
      },
    ]);
    setInput("");
    setSpeechStatus("Answer ready. You can ask another question.");
  }, [pathname]);

  useEffect(() => {
    submitRef.current = submitQuestion;
  }, [submitQuestion]);

  useEffect(() => {
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    const canRecognise = window.isSecureContext && Boolean(Recognition);
    const capabilityFrame = window.requestAnimationFrame(() => {
      setRecognitionAvailable(canRecognise);
      setSpeechOutputAvailable("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
      if (!canRecognise) setSpeechStatus("Microphone input is unavailable here. You can still type a question.");
    });

    if (!Recognition || !window.isSecureContext) {
      return () => window.cancelAnimationFrame(capabilityFrame);
    }

    const recognition = new Recognition();
    recognition.lang = navigator.language || "en-MY";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      setListening(true);
      setSpeechStatus("Listening… Speak now.");
    };
    recognition.onresult = (event) => {
      let transcript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        if (event.results[index].isFinal) transcript += event.results[index][0]?.transcript ?? "";
      }
      const question = transcript.trim();
      if (question) {
        submitRef.current(question);
      }
    };
    recognition.onerror = (event) => {
      setListening(false);
      const messagesByError: Record<string, string> = {
        "not-allowed": "Microphone permission was not allowed. You can still type.",
        "service-not-allowed": "Speech recognition is blocked by this browser. You can still type.",
        "audio-capture": "No working microphone was found. You can still type.",
        "no-speech": "I didn’t hear anything. Press the microphone and try again.",
        network: "The browser’s speech service could not connect. You can still type.",
        aborted: "Voice input stopped.",
      };
      setSpeechStatus(messagesByError[event.error] ?? "Voice input could not start. You can still type.");
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;

    return () => {
      window.cancelAnimationFrame(capabilityFrame);
      recognition.abort();
      recognitionRef.current = null;
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    recognitionRef.current?.abort();
    window.speechSynthesis?.cancel();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
      setOpen(false);
      window.requestAnimationFrame(() => launcherRef.current?.focus());
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    const closeForNavigation = () => {
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
      setOpen(false);
    };
    window.addEventListener("ivend-navigation-open", closeForNavigation);
    return () => window.removeEventListener("ivend-navigation-open", closeForNavigation);
  }, []);

  useEffect(() => {
    if (!open) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    logEndRef.current?.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, open]);

  const openAssistant = () => {
    window.dispatchEvent(new Event("ivend-assistant-open"));
    setOpen(true);
  };

  const closeAssistant = () => {
    recognitionRef.current?.abort();
    window.speechSynthesis?.cancel();
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitQuestion(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    submitQuestion(input);
  };

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition || !recognitionAvailable) return;
    if (listening) {
      recognition.stop();
      return;
    }
    try {
      recognition.start();
    } catch {
      setSpeechStatus("The microphone is already starting. Please try again in a moment.");
    }
  };

  const readReply = (text: string) => {
    if (!speechOutputAvailable) {
      setSpeechStatus("Spoken replies are unavailable in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = navigator.language || "en-MY";
    utterance.rate = 0.96;
    window.speechSynthesis.speak(utterance);
    setSpeechStatus("Reading the reply aloud.");
  };

  const startNewConversation = () => {
    recognitionRef.current?.abort();
    window.speechSynthesis?.cancel();
    setMessages([welcomeMessage]);
    setInput("");
    setSpeechStatus("New conversation started.");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className={styles.assistantRoot}>
      {!open ? (
        <button
          ref={launcherRef}
          className={styles.launcher}
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="ivend-product-assistant"
          aria-label="Open I Vend AI product assistant"
          onClick={openAssistant}
        >
          <span className={styles.launcherMic} aria-hidden="true"><i /></span>
          <span><strong>Speak with AI</strong><small>Product guide</small></span>
        </button>
      ) : (
        <section
          className={styles.panel}
          id="ivend-product-assistant"
          role="dialog"
          aria-modal="false"
          aria-labelledby="ivend-assistant-title"
        >
          <header className={styles.panelHeader}>
            <div className={styles.assistantIdentity}>
              <span className={styles.assistantMark} aria-hidden="true"><img src="/i-vend-station-icon.png" alt="" /></span>
              <div><strong id="ivend-assistant-title">I Vend AI</strong><small>Catalogue product guide</small></div>
            </div>
            <div className={styles.headerActions}>
              <button type="button" onClick={startNewConversation}>New</button>
              <button className={styles.closeButton} type="button" aria-label="Close product assistant" onClick={closeAssistant}><span aria-hidden="true" /></button>
            </div>
          </header>

          <div className={styles.quickQuestions} aria-label="Suggested questions">
            {suggestedQuestions.map((question) => (
              <button key={question} type="button" onClick={() => submitQuestion(question)}>{question}</button>
            ))}
          </div>

          <div className={styles.messageLog} role="log" aria-live="polite" aria-relevant="additions" aria-label="Product assistant conversation">
            {messages.map((message) => (
              <article key={message.id} className={message.role === "user" ? styles.userMessage : styles.assistantMessage}>
                {message.title ? <strong>{message.title}</strong> : null}
                <p>{message.text}</p>
                {message.links?.length ? (
                  <div className={styles.messageLinks}>
                    {message.links.map((link) => <a key={`${message.id}-${link.href}`} href={link.href}>{link.label}<span aria-hidden="true">&rarr;</span></a>)}
                  </div>
                ) : null}
                {message.role === "assistant" ? (
                  <button className={styles.readButton} type="button" onClick={() => readReply(`${message.title ? `${message.title}. ` : ""}${message.text}`)} disabled={!speechOutputAvailable}>
                    <span aria-hidden="true">◖</span> Read reply aloud
                  </button>
                ) : null}
              </article>
            ))}
            <div ref={logEndRef} />
          </div>

          <form className={styles.composer} onSubmit={handleSubmit}>
            <label className={styles.srOnly} htmlFor="ivend-assistant-question">Ask about machines or cashless payments</label>
            <textarea
              ref={inputRef}
              id="ivend-assistant-question"
              value={input}
              rows={2}
              maxLength={240}
              placeholder="Ask about machines, T05, or quotations…"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <div className={styles.composerButtons}>
              <button
                className={`${styles.micButton} ${listening ? styles.listening : ""}`}
                type="button"
                aria-pressed={listening}
                aria-label={listening ? "Stop listening" : "Speak your question"}
                title={recognitionAvailable ? "Speak your question" : "Microphone input is unavailable in this browser"}
                disabled={!recognitionAvailable}
                onClick={toggleListening}
              >
                <span aria-hidden="true"><i /></span>
              </button>
              <button className={styles.sendButton} type="submit" disabled={!input.trim()} aria-label="Send question"><span aria-hidden="true">&uarr;</span></button>
            </div>
          </form>

          <p className={styles.speechStatus} role="status">{speechStatus}</p>
          <p className={styles.disclosure}>Automated guidance from this website&apos;s catalogue. Voice starts only when you press the microphone. I Vend Station does not save recordings; your browser or device&apos;s speech service may process audio and use the internet. Do not share passwords or card details.</p>
        </section>
      )}
    </div>
  );
}
