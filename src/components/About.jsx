import { useEffect, useRef } from 'react'
import styles from './About.module.css'

const timeline = [
  { year: '2026 — present', icon: '🎓', title: 'S1 Informatika', subtitle: 'Universitas Pelita Harapan (UPH)', desc: 'Fakultas Kecerdasan Buatan dan Sains Data — Angkatan 2026' },
  { year: '2023 — 2026', icon: '🏫', title: 'SMK Raden Umar Said Kudus', subtitle: 'Jurusan PPLG — Pengembangan Perangkat Lunak dan Gim', desc: 'Belajar dasar pemrograman, web development, dan pengembangan game.' },
  { year: '2025', icon: '💼', title: 'Software Developer Intern', subtitle: 'PT Tigapilar Maju Mandiri — Jakarta Selatan', desc: 'Praktik Kerja Lapangan (PKL) selama 6 bulan — Kompetensi Keahlian Rekayasa Perangkat Lunak.' },
]

export default function About() {
  const sectionRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(styles.visible) }), { threshold: 0.1 })
    const els = sectionRef.current?.querySelectorAll('[data-anim]')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.about} id="about" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-anim>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.subtitle}>Get to know more about who I am and what I do</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.bio} data-anim>
            <div className={styles.bioCard}>
              <div className={styles.bioTop}>
                <div className={styles.avatar}>SJS</div>
                <div><h3 className={styles.bioName}>Satria Jagad Samudra</h3><p className={styles.bioAlias}>a.k.a. Anzuhaa</p></div>
              </div>
              <p className={styles.bioText}>Software developer with a passion for <strong>backend development</strong>. Currently studying at Universitas Pelita Harapan, Faculty of Artificial Intelligence and Data Science.</p>
              <p className={styles.bioText}>My journey started with curiosity about how applications communicate with servers — and has evolved into a love for building innovative solutions that solve real-world problems.</p>
              <div className={styles.bioTags}>
                <span className={styles.bioTag}>⚡ Backend</span>
                <span className={styles.bioTag}>🎮 Game Dev</span>
                <span className={styles.bioTag}>🏆 Esports</span>
              </div>
            </div>
          </div>
          <div className={styles.timeline} data-anim>
            <h3 className={styles.timelineHeading}>Journey</h3>
            {timeline.map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={styles.timelineIcon}>{item.icon}</div>
                  {i < timeline.length - 1 && <div className={styles.timelineLine} />}
                </div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h4 className={styles.timelineTitle}>{item.title}</h4>
                  <p className={styles.timelineSub}>{item.subtitle}</p>
                  <p className={styles.timelineDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}