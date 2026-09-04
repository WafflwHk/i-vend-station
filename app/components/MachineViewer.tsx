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

const normaliseAngle = (angle: number) => Math.round(((angle % 360) + 360) % 360);

export default function MachineViewer({ machine }: Props) {
  const modelRef = useRef<HTMLDivElement>(null);
  const yawRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; yaw: number; moved: boolean } | null>(null);
  const [activeView, setActiveView] = useState<string>("Front");
  const [spinning, setSpinning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [status, setStatus] = useState("Front illustrative view selected");
  const [accessibleAngle, setAccessibleAngle] = useState(0);
  const [selectedFinishId, setSelectedFinishId] = useState(machine.viewer.defaultFinishId);
  const [configurationStatus, setConfigurationStatus] = useState("");

  const selectedFinish = machine.viewer.finishes.find((finish) => finish.id === selectedFinishId) ?? machine.viewer.finishes[0];
  const finishHintId = `finish-preview-note-${machine.slug}`;

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
    setAccessibleAngle(normaliseAngle(nearestTarget));
    setStatus(`${label} illustrative view selected`);
  };

  const nudge = (amount: number) => {
    setSpinning(false);
    setActiveView("");
    const nextAngle = yawRef.current + amount;
    writeYaw(nextAngle, false);
    setAccessibleAngle(normaliseAngle(nextAngle));
    setStatus("Custom illustrative angle selected");
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (spinning) setStatus("360 degree spin paused");
    setSpinning(false);
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, yaw: yawRef.current, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 5) return;
    if (!drag.moved) {
      drag.moved = true;
      setActiveView("");
    }
    writeYaw(drag.yaw + distance * 0.55, true);
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    const moved = dragRef.current.moved;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (moved) {
      writeYaw(yawRef.current, false);
      setAccessibleAngle(normaliseAngle(yawRef.current));
      setStatus("Custom illustrative angle selected");
    }
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

  const selectFinish = (finishId: string) => {
    const finish = machine.viewer.finishes.find((option) => option.id === finishId) ?? machine.viewer.finishes[0];
    setSelectedFinishId(finish.id);
    setConfigurationStatus(`${finish.label} finish selected. ${finish.illustrative ? "Illustrative finish preview." : "Current finish preview."}`);
  };

  const modelStyle = {
    "--machine-w": `${machine.viewer.width}px`,
    "--machine-h": `${machine.viewer.height}px`,
    "--machine-d": `${machine.viewer.depth}px`,
    "--machine-body": selectedFinish.body,
    "--machine-trim": selectedFinish.trim,
    "--machine-accent": selectedFinish.accent,
  } as CSSProperties;

  return (
    <section className={styles.viewer} aria-labelledby="viewer-title" data-animate="scale">
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

      <div className={styles.configurator} role="group" aria-label="Illustrative machine configuration preview">
        <fieldset className={styles.optionGroup} aria-describedby={finishHintId}>
          <legend>Finish</legend>
          <div className={styles.optionHeading}>
            <strong>{selectedFinish.label}</strong>
            <span>{selectedFinish.illustrative ? "Illustrative" : "Current preview"}</span>
          </div>
          <div className={styles.finishOptions}>
            {machine.viewer.finishes.map((finish) => (
              <label className={styles.finishOption} key={finish.id}>
                <input
                  className={styles.optionInput}
                  type="radio"
                  name={`finish-${machine.slug}`}
                  value={finish.id}
                  checked={selectedFinish.id === finish.id}
                  onChange={() => selectFinish(finish.id)}
                />
                <span className={styles.finishSwatch} style={{ "--finish-swatch": finish.swatch } as CSSProperties} aria-hidden="true"><i /></span>
                <span className={styles.optionName}>{finish.label}</span>
                <small>{finish.illustrative ? "Illustrative" : "Current"}</small>
              </label>
            ))}
          </div>
          <p className={styles.optionNote} id={finishHintId}>Alternative finishes are illustrative and do not confirm product availability.</p>
        </fieldset>
      </div>

      <div
        className={styles.stage}
        role="slider"
        aria-roledescription="3D product viewer"
        aria-label={`Rotatable illustrative view of ${machine.name} in ${selectedFinish.label} finish. Drag left or right, or use the arrow keys.`}
        aria-keyshortcuts="ArrowLeft ArrowRight Home"
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={accessibleAngle}
        aria-valuetext={spinning ? "Illustrative 360 degree spin in progress" : status}
        aria-orientation="horizontal"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onKeyDown={onKeyDown}
      >
        <span className={styles.swipeHint}>Swipe to rotate</span>
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
      <p className={styles.liveStatus} aria-live="polite" aria-atomic="true">{configurationStatus}</p>
    </section>
  );
}
