import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

const skillCategories = [
  { icon: '🎨', title: 'Frontend', color: '#0071e3', skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Dart'] },
  { icon: '⚙️', title: 'Backend', color: '#34c759', skills: ['Laravel', 'Node.js', 'PHP', 'Go', 'Dart'] },
  { icon: '🗄️', title: 'Database', color: '#ff3b30', skills: ['MySQL', 'PostgreSQL', 'SQLite'] },
  { icon: '🐳', title: 'DevOps & Tools', color: '#4cc9f0', skills: ['Docker', 'Git', 'GitHub', 'VS Code', 'Laragon'] },
  { icon: '📱', title: 'Mobile & Systems', color: '#ff9f0a', skills: ['Flutter', 'Java', 'C', 'C++'] },
  { icon: '🎮', title: 'Game Dev', color: '#af52de', skills: ['GodotEngine', 'GDScript'] },
  { icon: '🖌️', title: 'Design & Edit', color: '#ff6b6b', skills: ['Figma', 'Canva', 'CapCut', 'Alight Motion'] },
]

export default function Skills() {
  const sectionRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(styles.visible) }), { threshold: 0.1 })
    const els = sectionRef.current?.querySelectorAll('[data-anim]')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.skills} id="skills" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-anim>
          <h2 className={styles.title}>Skills & Technologies</h2>
          <p className={styles.subtitle}>Technologies and tools I work with</p>
        </div>
        <div className={styles.grid}>
          {skillCategories.map((cat, i) => (
            <div key={cat.title} className={styles.card} data-anim style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap} style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}28` }}>
                  <span className={styles.icon}>{cat.icon}</span>
                </div>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
              </div>
              <div className={styles.tags}>
                {cat.skills.map((s) => (
                  <span key={s} className={styles.tag2} style={{ borderColor: `${cat.color}33`, color: cat.color }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
