// Ambient animated gradient mesh — slow-drifting blobs behind all content.
// Pure CSS animation (GPU-friendly); frozen under prefers-reduced-motion via globals.css.
export default function Atmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="atmo atmo-1" />
      <div className="atmo atmo-2" />
      <div className="atmo atmo-3" />
    </div>
  );
}
