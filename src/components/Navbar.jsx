import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy/95 backdrop-blur-md border-b border-gold/20 shadow-lg shadow-navy-mid/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="font-cinzel text-gold text-lg tracking-widest hover:text-gold-light transition-colors"
        >
          RS
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-heading text-sm tracking-wider text-cream-dark hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="font-heading text-sm tracking-wider px-5 py-2 border border-gold/50 text-gold hover:bg-gold hover:text-navy transition-all duration-300 rounded-sm"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gold hover:text-gold-light transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-light/98 backdrop-blur-md border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-heading text-sm tracking-wider text-cream-dark hover:text-gold transition-colors py-2 border-b border-gold/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
