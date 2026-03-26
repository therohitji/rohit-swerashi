import { useState } from 'react'
import { Send, Github, Linkedin, Mail } from 'lucide-react'

export default function ContactSection({ accent }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // ← Wire to EmailJS / Formspree / your backend
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        Moksha Sanyasa Yoga · Chapter XVIII
      </span>

      <h2 className="font-cinzel text-5xl md:text-7xl text-cream mb-2 leading-tight">
        Liberation
      </h2>
      <h2 className="font-cinzel text-5xl md:text-7xl leading-tight mb-4" style={{ color: accent }}>
        Begins Here.
      </h2>

      <div className="h-px w-24 mb-8" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <p className="font-body text-cream/55 leading-relaxed max-w-md mb-12 text-base md:text-lg">
        The Gita ends with action — not contemplation.
        If you have a project, a vision, or a battle that needs winning, I am ready.
      </p>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {[
            { name: 'name', type: 'text', placeholder: 'Your Name' },
            { name: 'email', type: 'email', placeholder: 'Your Email' },
          ].map(({ name, type, placeholder }) => (
            <input
              key={name}
              type={type}
              name={name}
              value={form[name]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              required
              placeholder={placeholder}
              className="w-full bg-navy-light/60 border text-cream placeholder:text-cream/25 font-body text-sm px-4 py-3.5 rounded-sm focus:outline-none transition-colors"
              style={{ borderColor: `${accent}25` }}
            />
          ))}
          <textarea
            name="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            placeholder="Describe your mission..."
            className="w-full bg-navy-light/60 border text-cream placeholder:text-cream/25 font-body text-sm px-4 py-3.5 rounded-sm focus:outline-none resize-none transition-colors"
            style={{ borderColor: `${accent}25` }}
          />
          <button
            type="submit"
            className="self-start flex items-center gap-2 font-heading text-sm tracking-wider px-8 py-3.5 rounded-sm font-semibold transition-all duration-300"
            style={{ background: accent, color: '#050b1a', boxShadow: `0 0 30px ${accent}44` }}
          >
            {sent ? '✓ Sent!' : <><Send size={14} /> Send Message</>}
          </button>
        </form>

        {/* Links */}
        <div className="flex flex-col gap-4">
          {[
            { icon: Github, label: 'GitHub', href: 'https://github.com/therohitji', value: '@therohitji' },
            { icon: Linkedin, label: 'LinkedIn', href: '#', value: 'linkedin.com/in/rohit' },     // ← Update
            { icon: Mail, label: 'Email', href: 'mailto:hello@rohitswerashi.com', value: 'hello@rohitswerashi.com' }, // ← Update
          ].map(({ icon: Icon, label, href, value }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border rounded-sm transition-all duration-300 group"
              style={{ borderColor: `${accent}15`, background: 'rgba(5,11,26,0.3)' }}
            >
              <div className="w-10 h-10 flex items-center justify-center border rounded-sm transition-colors" style={{ borderColor: `${accent}30` }}>
                <Icon size={16} style={{ color: accent }} />
              </div>
              <div>
                <div className="font-heading text-xs tracking-wider text-cream/35 uppercase">{label}</div>
                <div className="font-body text-sm text-cream/60 group-hover:text-cream transition-colors">{value}</div>
              </div>
            </a>
          ))}

          {/* Availability */}
          <div className="p-4 border rounded-sm mt-2" style={{ borderColor: '#1a9b8a33', background: 'rgba(26,155,138,0.05)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-peacock-light animate-pulse" />
              <span className="font-heading text-xs tracking-wider text-peacock-light uppercase">Available for Work</span>
            </div>
            <p className="font-body text-xs text-cream/45 leading-relaxed">
              Open to full-time roles and ambitious freelance projects. Response within 24h.
            </p>
          </div>
        </div>
      </div>

      {/* Footer line */}
      <div className="mt-20 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: `${accent}15` }}>
        <span className="font-cinzel text-lg" style={{ color: accent }}>RS</span>
        <p className="font-heading text-xs tracking-wider text-cream/25 italic">"सत्यमेव जयते" — Truth alone triumphs</p>
        <p className="font-body text-xs text-cream/20">© {new Date().getFullYear()} Rohit Swerashi</p>
      </div>
    </div>
  )
}
