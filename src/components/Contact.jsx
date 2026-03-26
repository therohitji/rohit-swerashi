import { useState } from 'react'
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/therohitji', value: '@therohitji' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', value: 'linkedin.com/in/rohit' },       // ← Update
  { icon: Twitter, label: 'Twitter / X', href: '#', value: '@rohitswerashi' },             // ← Update
  { icon: Mail, label: 'Email', href: 'mailto:hello@rohitswerashi.com', value: 'hello@rohitswerashi.com' },  // ← Update
]

const Contact = () => {
  const { ref, isVisible } = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // ← Wire this up to your email service (EmailJS, Formspree, etc.)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-24 bg-navy overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 65%)',
        }}
      />

      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <span className="font-heading text-xs tracking-[0.35em] text-gold uppercase opacity-70">
            Send a Message
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl text-cream text-center">
            Summon the Warrior
          </h2>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent mt-2" />
          <p className="font-body text-cream-dark text-center max-w-md mt-2 text-sm leading-relaxed">
            Whether you have a project, an opportunity, or simply wish to talk —
            I am ready to answer the call.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="font-heading text-xs tracking-wider text-cream-dark uppercase block mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Arjuna"
                className="w-full bg-navy-light border border-gold/20 text-cream placeholder:text-cream-muted font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-heading text-xs tracking-wider text-cream-dark uppercase block mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="arjuna@pandavas.com"
                className="w-full bg-navy-light border border-gold/20 text-cream placeholder:text-cream-muted font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-heading text-xs tracking-wider text-cream-dark uppercase block mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe your battlefield..."
                className="w-full bg-navy-light border border-gold/20 text-cream placeholder:text-cream-muted font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 font-heading text-sm tracking-wider px-8 py-3 bg-gold text-navy font-semibold hover:bg-gold-light transition-all duration-300 rounded-sm shadow-lg shadow-gold/20 self-start"
            >
              {sent ? (
                '✓ Message Sent!'
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Social / contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-heading text-sm tracking-widest text-gold uppercase mb-6">
                Find Me On
              </h3>
              <div className="flex flex-col gap-4">
                {socials.map(({ icon: Icon, label, href, value }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-4 border border-gold/10 hover:border-gold/30 hover:bg-navy-light/60 rounded-sm transition-all duration-300"
                  >
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 rounded-sm transition-colors">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <div className="font-heading text-xs tracking-wider text-cream-dark uppercase">
                        {label}
                      </div>
                      <div className="font-body text-sm text-cream-dark group-hover:text-gold transition-colors">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="p-5 border border-peacock/20 bg-peacock/5 rounded-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-peacock-light animate-pulse" />
                <span className="font-heading text-xs tracking-wider text-peacock-light uppercase">
                  Available for Work
                </span>
              </div>
              <p className="font-body text-sm text-cream-dark leading-relaxed">
                {/* ← Update with your actual availability */}
                Currently open to full-time roles and interesting freelance projects.
                Response time: within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
