/* Film grain — fixed overlay, z-index above everything except cursor/nav */
export default function GrainOverlay() {
  return (
    <div
      className="grain-overlay fixed inset-0 pointer-events-none"
      style={{ zIndex: 9990 }}
      aria-hidden="true"
    />
  )
}
