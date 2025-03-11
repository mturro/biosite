import { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Navigation.module.css'
import { merriweather } from '../pages/_app'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.nav}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.button}>
        <span className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {isOpen && (
        <div className={`${styles.menu} ${merriweather.className}`}>
          <Link href="/">home</Link>
          <Link href="/journal">journal</Link>
          <Link href="/about">about</Link>
        </div>
      )}
    </div>
  )
} 