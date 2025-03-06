import Header from "@components/Header";
import Link from 'next/link'
import GitHubCalendar from 'react-github-calendar';

export default function Home() {
  return (
    <>
      <Header title="(mturro:dotcom)" />
      <main className="px-4">
        <div className="mb-8 mt-8">
          <GitHubCalendar
            username="mturro"
            hideColorLegend
            blockSize={8}
          />
        </div>
        <ul>
          <li><Link href={"https://github.com/mturro"}>github</Link></li>
          <li><a rel="me" href="https://shakedown.social/@mturro">mastodon</a></li>
          <li><Link href="/about">the story (approximately)</Link></li>
          <li><Link href="/journal">journal</Link></li>
          <li><Link href="https:linkedin.com/in/mturro">the professional</Link></li>
        </ul>
      </main>
    </>
  )
}
