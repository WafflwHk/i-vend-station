"use client";

import { useRef, useState } from "react";
import { searchSite } from "../lib/site-search";
import styles from "./site-search.module.css";

export default function SiteSearch({ onOpen }: { onOpen: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = searchSite(query);

  const closeSearch = () => dialogRef.current?.close();
  const openSearch = () => {
    onOpen();
    window.dispatchEvent(new Event("ivend-navigation-open"));
    setQuery("");
    dialogRef.current?.showModal();
    setOpen(true);
    inputRef.current?.focus({ preventScroll: true });
  };

  return <>
    <button ref={buttonRef} className={styles.trigger} type="button" aria-label="Search IVEND" aria-haspopup="dialog" aria-expanded={open} aria-controls="ivend-site-search" onClick={openSearch}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
    </button>
    {/* Native modal dialog handles Escape and backdrop dismissal; it is intentionally interactive. */}
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
    <dialog ref={dialogRef} id="ivend-site-search" className={styles.panel} aria-labelledby="ivend-search-title" onClick={(event) => { if (event.target === event.currentTarget) closeSearch(); }} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); closeSearch(); } }} onCancel={(event) => { event.preventDefault(); closeSearch(); }} onClose={() => { setOpen(false); buttonRef.current?.focus({ preventScroll: true }); }}>
      <div className={styles.content}>
        <div className={styles.topline}><h2 id="ivend-search-title">Search IVEND</h2><button className={styles.close} type="button" aria-label="Close search" onClick={closeSearch}>×</button></div>
        <form role="search" onSubmit={(event) => event.preventDefault()}>
          <label className={styles.label} htmlFor="ivend-search-input">Machines, services and pages</label>
          <input ref={inputRef} id="ivend-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try coffee, T05 or service" autoComplete="off" maxLength={160} />
        </form>
        <p className={styles.status} role="status">{query.trim() ? (results.length ? `${results.length} result${results.length === 1 ? "" : "s"}` : "No results found") : "Explore IVEND"}</p>
        <ul className={styles.results} aria-label="Search results">
          {results.map((result) => <li key={result.href}><a href={result.href} onClick={closeSearch}><span><strong>{result.title}</strong><small>{result.description}</small></span><span aria-hidden="true">↗</span></a></li>)}
        </ul>
      </div>
    </dialog>
  </>;
}
