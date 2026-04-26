'use client'

import { useState, useEffect } from 'react'
import Header from '@components/Header'
import Link from 'next/link'
import GitHubCalendar from 'react-github-calendar'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mql.matches)
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <>
      <Header title="(mturro:dotcom)" showNavigation={false} />
      <main className="px-4">
        <div className="calendar-wrapper">
          <GitHubCalendar
            username="mturro"
            hideColorLegend
            blockSize={isMobile ? 4 : 8}
            blockMargin={isMobile ? 2 : 4}
            colorScheme="light"
          />
        </div>
        <h3>here</h3>
        <ul>
          <li><Link href="/about">bio (approximately)</Link></li>
          <li><Link href="/journal">journal</Link></li>
        </ul>
        <h3>elsewhere</h3>
        <ul>
          <li><a href="https://gitpoem.mturro.com">gitpoem</a></li>
          <li><Link href="https://github.com/mturro">github</Link></li>
          <li><a rel="me" href="https://shakedown.social/@mturro">mastodon</a></li>
          <li><a rel="me" href="https://bsky.app/profile/mturro.com">bluesky</a></li>
          <li><Link href="https://linkedin.com/in/mturro">work</Link></li>
        </ul>
      </main>
    </>
  )
}
