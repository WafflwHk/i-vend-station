"use client";

import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Machine } from "../data/machines";
import styles from "./machine-viewer.module.css";

type Props = {
  machine: Machine;
};

const views = [
  { label: "Front", angle: 0 },
  { label: "Right", angle: -90 },
  { label: "Back", angle: 180 },
  { label: "Left", angle: 90 },
] as const;

export default function MachineViewer({ machine }: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const yawRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; yaw: number } | null>(null);
  const [activeView, setActiveView] = useState<string>("Front");
  const [spinning, setSpinning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [status, setStatus] = useState("Front illustrative view selected");

  const writeYaw = useCallback((yaw: number, moving: boolean) => {
    yawRef.current = yaw;
    if (!modelRef.current) return;
    modelRef.current.style.setProperty("--viewer-yaw", `${yaw}deg`);
    modelRef.current.dataset.moving = moving ? "true" : "false";
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(query.matches);
      if (query.matches) setSpinning(false);
    };
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!spinning || reducedMotion) return;
    let previous = performance.now();
    const rotate = (now: number) => {
      const elapsed = Math.min(now - previous, 40);
      previous = now;
      writeYaw(yawRef.current - elapsed * 0.025, true);
      frameRef.current = requestAnimationFrame(rotate);
    };
    frameRef.current = requestAnimationFrame(rotate);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [reducedMotion, spinning, writeYaw]);

  const selectView = (label: string, target: number) => {
    setSpinning(false);
    setActiveView(label);
    const nearestTarget = target + Math.round((yawRef.current - target) / 360) * 360;
    writeYaw(nearestTarget, false);
    setStatus(`${label} illustrative view selected`);
  };

  const nudge = (amount: number) => {
    setSpinning(false);
    setActiveView("");
    writeYaw(yawRef.current + amount, false);
    setStatus("Custom illustrative angle selected");
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setSpinning(false);
    setActiveView("");
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, yaw: yawRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    writeYaw(yawRef.current, true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    writeYaw(drag.yaw + (event.clientX - drag.x) * 0.55, true);
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    writeYaw(yawRef.current, false);
    setStatus("Custom illustrative angle selected");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-15);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nudge(15);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectView("Front", 0);
    }
  };

  const toggleSpin = () => {
    if (reducedMotion) return;
    setActiveView("");
    setSpinning((current) => {
      setStatus(current ? "360 degree spin paused" : "Illustrative 360 degree spin started");
      return !current;
    });
  };

  const modelStyle = {
    "--machine-w": `${machine.viewer.width}px`,
    "--machine-h": `${machine.viewer.height}px`,
    "--machine-d": `${machine.viewer.depth}px`,
    "--machine-body": machine.viewer.body,
    "--machine-trim": machine.viewer.trim,
    "--machine-accent": machine.viewer.accent,
    "--viewer-yaw": "0deg",
  } as CSSProperties;

  return (
    <section className={styles.viewer} aria-labelledby="viewer-title">
      <div className={styles.viewerTop}>
        <div><small>INTERACTIVE PRODUCT VIEW</small><h2 id="viewer-title">See every side.</h2></div>
        <span className={styles.illustrativeBadge}>Illustrative 360&deg; view</span>
      </div>

      <div className={styles.controls} aria-label="Choose a machine view">
        <div className={styles.viewButtons}>
          {views.map((view) => (
            <button key={view.label} type="button" aria-pressed={activeView === view.label} onClick={() => selectView(view.label, view.angle)}>{view.label}</button>
          ))}
        </div>
        <button className={styles.spinButton} type="button" aria-pressed={spinning} disabled={reducedMotion} onClick={toggleSpin}>
          <span aria-hidden="true">&#8635;</span>{spinning ? "Pause spin" : "Spin 360&deg;"}
        </button>
      </div>

      <div
        className={styles.stage}
        role="application"
        aria-label={`Rotatable illustrative view of ${machine.name}. Drag left or right, or use the arrow keys.`}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onKeyDown={onKeyDown}
      >
        <div className={styles.floor} />
        <div className={styles.model} data-variant={machine.viewer.variant} data-moving="false" ref={modelRef} style={modelStyle}>
          <div className={`${styles.face} ${styles.front}`}>
            <img className={styles.frontBrand} src="/i-vend-station-icon.png" alt="" />
            <div className={styles.frontWindow}>{[1, 2, 3, 4, 5].map((item) => <i key={item} />)}</div>
            <div className={styles.frontScreen} /><div className={styles.frontPay} /><div className={styles.collectionBay} />
            {machine.viewer.variant === "double" ? <div className={styles.cabinetSeam} /> : null}
          </div>
          <div className={`${styles.face} ${styles.back}`}><div className={styles.servicePanel} /><div className={styles.backVents}>{[1, 2, 3, 4, 5, 6].map((item) => <i key={item} />)}</div><span>BACK</span></div>
          <div className={`${styles.face} ${styles.right}`}><div className={styles.sideVents}>{[1, 2, 3, 4, 5].map((item) => <i key={item} />)}</div><div className={styles.sideHandle} /><span>RIGHT</span></div>
          <div className={`${styles.face} ${styles.left}`}><div className={styles.sideVents}>{[1, 2, 3, 4, 5].map((item) => <i key={item} />)}</div><div className={styles.sidePanel} /><span>LEFT</span></div>
          <div className={`${styles.face} ${styles.top}`} />
          <div className={`${styles.face} ${styles.bottom}`} />
        </div>
      </div>

      <div className={styles.viewerFoot}>
        <p><strong>Drag to rotate</strong><span>Use a mouse, swipe, or the left and right arrow keys.</span></p>
        <p className={styles.disclaimer}>Side and rear views are illustrative. Final appearance and specifications must be confirmed for the exact machine model.</p>
      </div>
      <p className={styles.liveStatus} aria-live="polite">{status}</p>
    </section>
  );
}
