"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { t05PhotoFrames } from "../data/t05-photos";
import styles from "./t05-photo-viewer.module.css";

type T05PhotoViewerProps = {
  className?: string;
  priority?: boolean;
};

type DragState = {
  active: boolean;
  pointerId: number;
  startX: number;
  startY: number;
};

const frameCount = t05PhotoFrames.length;
const dragThreshold = 38;

export default function T05PhotoViewer({ className, priority = false }: T05PhotoViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const stageId = useId();
  const captionId = useId();
  const motionNoteId = useId();
  const drag = useRef<DragState>({ active: false, pointerId: -1, startX: 0, startY: 0 });
  const frame = t05PhotoFrames[activeIndex];

  const announceFrame = useCallback((index: number) => {
    const selected = t05PhotoFrames[index];
    setAnnouncement(`${selected.label} selected, photo ${index + 1} of ${frameCount}.`);
  }, []);

  const selectFrame = useCallback((index: number, announce = true) => {
    const wrapped = (index + frameCount) % frameCount;
    setIsPlaying(false);
    setActiveIndex(wrapped);
    if (announce) announceFrame(wrapped);
  }, [announceFrame]);

  const stepFrame = useCallback((direction: number) => {
    setActiveIndex((current) => {
      const next = (current + direction + frameCount) % frameCount;
      announceFrame(next);
      return next;
    });
    setIsPlaying(false);
  }, [announceFrame]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(media.matches);
      if (media.matches) setIsPlaying(false);
    };

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const nextFrame = t05PhotoFrames[(activeIndex + 1) % frameCount];
    const preload = new Image();
    preload.src = nextFrame.src;
  }, [activeIndex]);

  useEffect(() => {
    if (!isPlaying || reducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % frameCount);
    }, 1450);
    const pauseWhenHidden = () => {
      if (!document.hidden) return;
      setIsPlaying(false);
      setAnnouncement("Photo cycle paused.");
    };

    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [isPlaying, reducedMotion]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepFrame(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stepFrame(1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectFrame(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectFrame(frameCount - 1);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current.active || current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - current.startX;
    const deltaY = event.clientY - current.startY;
    if (Math.abs(deltaX) < dragThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    stepFrame(deltaX < 0 ? 1 : -1);
    drag.current.startX = event.clientX;
    drag.current.startY = event.clientY;
  };

  const finishPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current.pointerId !== event.pointerId) return;
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const togglePlay = () => {
    if (reducedMotion) return;
    setIsPlaying((current) => {
      const next = !current;
      setAnnouncement(next ? "Four-photo cycle started." : "Photo cycle paused.");
      return next;
    });
  };

  return (
    <div className={[styles.viewer, className].filter(Boolean).join(" ")} role="group" aria-label="T05 four-angle photo viewer">
      <div
        id={stageId}
        className={styles.photoStage}
        tabIndex={0}
        role="slider"
        aria-label="T05 product photo view"
        aria-describedby={captionId}
        aria-keyshortcuts="ArrowLeft ArrowRight Home End"
        aria-valuemin={1}
        aria-valuemax={frameCount}
        aria-valuenow={activeIndex + 1}
        aria-valuetext={`${frame.label}, photo ${activeIndex + 1} of ${frameCount}`}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
      >
        <img
          key={frame.src}
          src={frame.src}
          width="1254"
          height="1254"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          draggable={false}
          alt={frame.alt}
        />
        <span className={styles.dragHint} aria-hidden="true">Swipe to change view</span>
      </div>

      <div className={styles.viewOptions} role="group" aria-label="Choose a T05 photo view">
        {t05PhotoFrames.map((option, index) => (
          <button
            key={option.id}
            type="button"
            aria-controls={stageId}
            aria-pressed={activeIndex === index}
            onClick={() => selectFrame(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.transport}>
        <button type="button" aria-label="Show previous T05 view" onClick={() => stepFrame(-1)}>
          <span aria-hidden="true">&#8592;</span>
        </button>
        <button
          type="button"
          aria-pressed={isPlaying}
          aria-describedby={reducedMotion ? motionNoteId : undefined}
          disabled={reducedMotion}
          onClick={togglePlay}
        >
          <span aria-hidden="true">{isPlaying ? "II" : "↻"}</span>
          {isPlaying ? "Pause views" : "Play four views"}
        </button>
        <button type="button" aria-label="Show next T05 view" onClick={() => stepFrame(1)}>
          <span aria-hidden="true">&#8594;</span>
        </button>
      </div>

      <div className={styles.viewerMeta}>
        <strong>{frame.label}</strong>
        <span>{activeIndex + 1} / {frameCount}</span>
      </div>
      <p className={styles.caption} id={captionId}>
        Four supplied T05 product photos with backgrounds removed. The front and angled views show the camera lens below the screen.
      </p>
      <p className={styles.motionNote} id={motionNoteId} hidden={!reducedMotion}>
        Automatic photo cycling is off because reduced motion is enabled. Manual views remain available.
      </p>
      <p className={styles.liveStatus} aria-live="polite" aria-atomic="true">{announcement}</p>
    </div>
  );
}
