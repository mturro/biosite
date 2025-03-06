import { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Navigation.module.css'

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
        <div className={styles.menu}>
          <Link href="/">home</Link>
          <Link href="/journal">journal</Link>
          <Link href="/about">about</Link>
        </div>
      )}
    </div>
  )
} 