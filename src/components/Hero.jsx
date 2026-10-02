import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const WORDS = ['Software Developer.', 'Backend Engineer.', 'Problem Solver.', 'CS Student.']

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const currentWord = WORDS[wordIdx]
    const speed = isDeleting ? 50 : 100
    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(currentWord.slice(0, displayed.length + 1))
        if (displayed.length + 1 === currentWord.length) setTimeout(() => setIsDeleting(true), 1200)
      } else {
        setDisplayed(currentWord.slice(0, displayed.length - 1))
        if (displayed.length - 1 === 0) { setIsDeleting(false); setWordIdx((i) => (i + 1) % WORDS.length) }
      }
    }, speed)
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, isDeleting, wordIdx])

  return (
    <section className={styles.hero}>
      <div className={styles.bgGradient} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}><span className={styles.dot} />Available for opportunities</div>
          <h1 className={styles.title}>
            Hey, I&apos;m a{' '}
            <span className={styles.typed}>{displayed}<span className={styles.cursor} aria-hidden="true">|</span></span>
          </h1>
          <div className={styles.info}>
            <p>My name is <span className={styles.highlight}>Satria Jagad Samudra</span>.</p>
            <p>Passionate about <span className={styles.highlight}>backend development</span>, but also capable in <span className={styles.highlight2}>frontend</span>.</p>
            <p className={styles.sub}>📍 Mahasiswa S1 Informatika — Universitas Pelita Harapan</p>
          </div>
          <div className={styles.cta}>
            <a href="#portfolio" className={styles.btnPrimary} onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}>
              View My Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#about" className={styles.btnSecondary} onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) }}>About Me</a>
          </div>
        </div>
        <div className={styles.imageWrap}>
          <div className={styles.imageContainer}>
            <img src="/assets/image/IM_04383.jpg" alt="Satria Jagad Samudra" className={styles.profileImg} />
          </div>
          <div className={`${styles.floatBadge} ${styles.floatBadge1}`}><span>⚡</span> Backend Dev</div>
          <div className={`${styles.floatBadge} ${styles.floatBadge2}`}><span>🎓</span> UPH 2026</div>
        </div>
      </div>
      <div className={styles.scrollIndicator}><div className={styles.scrollLine} /><span>scroll</span></div>
    </section>
  )
}
