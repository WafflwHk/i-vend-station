export default function MachineArt({ kind }: { kind: string }) {
  if (kind === "double-art") {
    return (
      <div className={`machine-art ${kind}`} aria-hidden="true">
        <div className="cabinet left-cab"><div className="art-glass">{[1, 2, 3, 4, 5].map((item) => <i key={item} />)}</div><b /></div>
        <div className="cabinet right-cab"><div className="art-screen" /><div className="art-pay" /><b /></div>
      </div>
    );
  }

  return (
    <div className={`machine-art ${kind}`} aria-hidden="true">
      <div className="cabinet">
        <img className="art-brand" src="/i-vend-station-icon.png" alt="" />
        <div className="art-glass">{[1, 2, 3, 4, 5].map((item) => <i key={item} />)}</div>
        <div className="art-screen" />
        <div className="art-pay" />
        <b />
      </div>
    </div>
  );
}
