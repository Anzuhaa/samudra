import { useEffect, useRef } from 'react'
import styles from './Portfolio.module.css'

const BASE = import.meta.env.BASE_URL

const projects = [
  {
    title: 'HRIS API — PT Tigapilar Maju Mandiri',
    image: `${BASE}assets/hris_cert.jpg`,
    isCert: true,
    tags: ['Golang', 'REST API', 'PostgreSQL', 'Backend'],
    desc: 'Contributed to developing an internal HRIS (Human Resource Information System) REST API during a 6-month internship. Handled employee data endpoints, authentication, and payroll integration.',
    link: null,
    badge: '🔒 Private — Company Project',
  },
  {
    title: 'Ocean Learn Backend REST API',
    image: `${BASE}assets/image/oceanlearn.png`,
    isCert: false,
    tags: ['Laravel', 'PHP', 'REST API', 'Backend'],
    desc: 'Backend developer specializing in Laravel — secure APIs, subscription systems, and payment integrations.',
    link: null,
    badge: '🔒 Internal Institution',
  },
  {
    title: 'Echo Cash Design',
    image: `${BASE}assets/image/echo.png`,
    isCert: false,
    tags: ['Figma', 'UI/UX'],
    desc: 'Designed frontend interface and UX for Echo Cash, a mobile-based e-wallet app focusing on clean UI and smooth user flow.',
    link: 'https://github.com/Anzuhaa/Echo_Cash',
    badge: null,
  },
  {
    title: 'Ocash Backend System',
    image: `${BASE}assets/image/ocash.png`,
    isCert: false,
    tags: ['Node.js', 'Backend'],
    desc: "Developed backend for O'Cash — secure peer-to-peer wallet transfers with efficient transaction handling.",
    link: 'https://github.com/KaisarAffan/O-cash',
    badge: null,
  },
]

export default function Portfolio() {
  const sectionRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(styles.visible) }), { threshold: 0.1 })
    const els = sectionRef.current?.querySelectorAll('[data-anim]')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.portfolio} id="portfolio" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-anim>
          <h2 className={styles.title}>My Portfolio</h2>
          <p className={styles.subtitle}>Projects I&apos;ve built and contributed to</p>
        </div>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={p.title} className={styles.card} data-anim style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className={`${styles.imageWrap} ${p.isCert ? styles.certWrap : ''}`}>
                <img src={p.image} alt={p.title} className={p.isCert ? styles.certImage : styles.image} />
                {!p.isCert && <div className={styles.imageOverlay} />}
              </div>
              <div className={styles.content}>
                <div className={styles.tagRow}>
                  {p.tags.map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.desc}>{p.desc}</p>
                <div className={styles.footer}>
                  {p.badge ? (
                    <span className={styles.badge}>{p.badge}</span>
                  ) : p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      View on GitHub
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
