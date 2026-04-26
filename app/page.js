'use client'

import Header from '@components/Header'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import GitHubCalendar from 'react-github-calendar'

export default function Home() {
  const calendarRef = useRef(null)

  useEffect(() => {
    const root = calendarRef.current
    if (!root) return
    const scrollToEnd = () => {
      const scroller = root.querySelector('.react-activity-calendar__scroll-container')
      if (scroller) scroller.scrollLeft = scroller.scrollWidth
    }
    scrollToEnd()
    const observer = new MutationObserver(scrollToEnd)
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header title="(mturro:dotcom)" showNavigation={false} />
      <main className="px-4">
        <div ref={calendarRef} className="calendar-wrapper">
          <GitHubCalendar
            username="mturro"
            hideColorLegend
            blockSize={8}
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
