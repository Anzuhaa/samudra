import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#achievements', label: 'Achievement' },
]

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/anzuhaa?igsh=MTl4ZmdrcDFkZXhhbA==', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg> },
  { label: 'GitHub', href: 'https://github.com/Anzuhaa', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-2c-3.2.69-3.87-1.54-3.87-1.54-.53-1.33-1.3-1.68-1.3-1.68-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.74 1.26 3.41.96.1-.76.41-1.26.74-1.55-2.55-.3-5.24-1.28-5.24-5.67 0-1.25.44-2.26 1.17-3.05-.12-.3-.51-1.52.11-3.17 0 0 .96-.31 3.15 1.16.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.19-1.47 3.15-1.16 3.15-1.16.62 1.65.23 2.87.11 3.17.73.79 1.17 1.8 1.17 3.05 0 4.4-2.7 5.36-5.27 5.66.42.37.79 1.1.79 2.22v3.29c0 .31.21.66.79.55A10.5 10.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg> },
  { label: 'Discord', href: 'https://discord.com/users/1078672632125329489', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/></svg> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/satria-samudra-97ba9b293', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1-.01 5.01 2.5 2.5 0 0 1 .01-5Zm-.02 5.93h4.1v11.08h-4.1V9.43ZM14.7 9.43c-2.38 0-3.3 1.3-3.88 2.22v-2.22H6.7v11.08h4.12v-5.55c0-1.47.28-2.89 2.1-2.89 1.79 0 1.82 1.67 1.82 2.98v5.46h4.12v-5.87c0-2.9-.62-5.21-4.16-5.21Z"/></svg> },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['about', 'skills', 'portfolio', 'achievements']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault(); setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <a href="#" className={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className={styles.logoAccent}>Samu</span>dra
        </a>
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.active : ''}`} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.socials}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>{s.icon}</a>
          ))}
        </div>
        <button className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className={styles.mobileLink} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
        ))}
        <div className={styles.mobileSocials}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>{s.icon}</a>
          ))}
        </div>
      </div>
    </header>
  )
}
