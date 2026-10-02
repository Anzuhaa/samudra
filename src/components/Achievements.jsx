import { useEffect, useRef, useState } from 'react'
import styles from './Achievements.module.css'

const BASE = import.meta.env.BASE_URL

const achievements = [
  {
    year: '2023 — 2026',
    icon: '🎮',
    title: '3 Years on RUS Esport Organization',
    game: 'SMK Raden Umar Said Kudus',
    result: 'Core Team Member — Honor of Kings & Mobile Legends',
    color: '#0071e3',
    photos: [
      { src: `${BASE}assets/achievements/RUS_team1.jpg`, caption: 'RUS Esport Core Team — JUARA 1 LENP HOK 2025' },
      { src: `${BASE}assets/achievements/RUS_team2.jpg`, caption: 'RUS Esport Official Team Photo — LENP HOK 2025' },
      { src: `${BASE}assets/achievements/RUS_team3.jpg`, caption: 'RUS Esport Team Celebration — LENP HOK 2025' },
    ],
  },
  {
    year: '2025',
    icon: '🥇',
    title: 'Liga Esport Nasional Pelajar (LENP)',
    game: 'Honor of Kings',
    result: 'Juara 1 🥇 + MVP Grand Final — Rp35.000.000 Prize Pool',
    color: '#34c759',
    photos: [
      { src: `${BASE}assets/achievements/DSC05645.jpg`, caption: 'JUARA 1 + MVP — LENP HOK 2025' },
      { src: `${BASE}assets/achievements/DSC05702.jpg`, caption: 'MVP Grand Final — LENP HOK 2025' },
      { src: `${BASE}assets/achievements/DSC05667.jpg`, caption: 'Champion Stage — LENP HOK 2025' },
    ],
  },
  {
    year: '2024',
    icon: '🥇',
    title: 'Liga Esport Nasional Pelajar (LENP)',
    game: 'Honor of Kings',
    result: 'Juara 1 🥇 — Rp35.000.000 Prize Pool',
    color: '#ff9f0a',
    photos: [
      { src: `${BASE}assets/achievements/DSC02904.jpg`, caption: 'Medal Ceremony — LENP HOK 2024' },
      { src: `${BASE}assets/achievements/DSC02824.jpg`, caption: 'Trophy Lifting — LENP HOK 2024' },
    ],
  },
  {
    year: '2024',
    icon: '🥉',
    title: 'Liga Ekskul Esport (LEA)',
    game: 'Mobile Legends Bang Bang',
    result: 'Bronze 🥉 — 3rd Place',
    color: '#a2845e',
    photos: [],
    noPhotosYet: true,
  },
  {
    year: '2025',
    icon: '💻',
    title: 'TECHCOMFEST',
    game: 'Web Application Competition',
    result: 'Participant',
    color: '#af52de',
    photos: [],
  },
  {
    year: '2024',
    icon: '🎓',
    title: 'Bootcamp Certificate',
    game: '"Belajar Dasar Pemrograman Web"',
    result: 'Certified',
    color: '#5856d6',
    photos: [],
  },
]

export default function Achievements() {
  const sectionRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(styles.visible) }), { threshold: 0.08 })
    const els = sectionRef.current?.querySelectorAll('[data-anim]')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(l => ({ ...l, index: (l.index + 1) % l.photos.length }))
      if (e.key === 'ArrowLeft') setLightbox(l => ({ ...l, index: (l.index - 1 + l.photos.length) % l.photos.length }))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  return (
    <section className={styles.achievements} id="achievements" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-anim>
          <h2 className={styles.title}>Achievements</h2>
          <p className={styles.subtitle}>Milestones, competitions, and recognition</p>
        </div>
        <div className={styles.list}>
          {achievements.map((a, i) => (
            <div key={`${a.year}-${a.title}`} className={styles.card} data-anim style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className={styles.cardLeft}>
                <div className={styles.iconWrap} style={{ background: `${a.color}12`, border: `1px solid ${a.color}28` }}>
                  <span className={styles.icon}>{a.icon}</span>
                </div>
                <span className={styles.yearTag} style={{ color: a.color }}>{a.year}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <h3 className={styles.cardTitle}>{a.title}</h3>
                  <span className={styles.gameTag}>{a.game}</span>
                </div>
                <p className={styles.result}>{a.result}</p>
                {a.photos && a.photos.length > 0 && (
                  <div className={styles.photoGrid}>
                    {a.photos.map((photo, pi) => (
                      <button key={pi} className={styles.photoThumb} onClick={() => setLightbox({ photos: a.photos, index: pi })} aria-label={photo.caption}>
                        <img src={photo.src} alt={photo.caption} className={styles.thumbImg} />
                        <div className={styles.thumbOverlay}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                        </div>
                      </button>
                    ))}
                    <button className={styles.morePhotos} onClick={() => setLightbox({ photos: a.photos, index: 0 })}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      {a.photos.length} photos
                    </button>
                  </div>
                )}
                {a.noPhotosYet && <p className={styles.comingSoon}>📸 Photos coming soon</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className={styles.lightboxOverlay} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lbClose} onClick={() => setLightbox(null)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <img src={lightbox.photos[lightbox.index].src} alt={lightbox.photos[lightbox.index].caption} className={styles.lbImage} />
            <div className={styles.lbBottom}>
              <p className={styles.lbCaption}>{lightbox.photos[lightbox.index].caption}</p>
              {lightbox.photos.length > 1 && (
                <div className={styles.lbNav}>
                  <button className={styles.lbBtn} onClick={() => setLightbox(l => ({ ...l, index: (l.index - 1 + l.photos.length) % l.photos.length }))} aria-label="Previous">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <span className={styles.lbCounter}>{lightbox.index + 1} / {lightbox.photos.length}</span>
                  <button className={styles.lbBtn} onClick={() => setLightbox(l => ({ ...l, index: (l.index + 1) % l.photos.length }))} aria-label="Next">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
