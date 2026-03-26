const Footer = () => (
  <footer className="bg-navy-mid border-t border-gold/10 py-10">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Logo + tagline */}
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="font-cinzel text-gold text-xl tracking-widest">RS</span>
        <span className="font-heading text-xs tracking-wider text-cream-muted uppercase">
          Rohit Swerashi
        </span>
      </div>

      {/* Sanskrit quote */}
      <p className="font-heading text-xs tracking-wider text-cream-muted text-center italic opacity-60">
        "सत्यमेव जयते" — Truth alone triumphs
      </p>

      {/* Copyright */}
      <div className="font-body text-xs text-cream-muted opacity-50 text-center md:text-right">
        <p>© {new Date().getFullYear()} Rohit Swerashi. All rights reserved.</p>
      </div>
    </div>

    {/* Bottom gold line */}
    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
  </footer>
)

export default Footer
