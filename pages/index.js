import Header from "@components/Header";
import Link from 'next/link'
import GitHubCalendar from 'react-github-calendar';

export default function Home() {
  return (
    <>
      <Header title="(mturro:dotcom)" />
      <main className="px-4">
        <div className="calendar-wrapper">
          <GitHubCalendar
            username="mturro"
            hideColorLegend
            blockSize={8}
          />
        </div>
        <h3>here</h3>
        <ul>
          <li><Link href="/about">bio (approximately)</Link></li>
          <li><Link href="/journal">journal</Link></li>
        </ul>
        <h3>elsewhere</h3>
        <ul> 
          <li><Link href={"https://github.com/mturro"}>github</Link></li>
          <li><a rel="me" href="https://shakedown.social/@mturro">mastodon</a></li>
          <li><a rel="me" href="https://bsky.app/profile/mturro.com">bluesky</a></li>
          <li><Link href="https://linkedin.com/in/mturro">work</Link></li>
        </ul>
      </main>
    </>
  )
}
