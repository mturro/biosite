import fs from 'fs'
import path from 'path'
import Header from '@components/Header'
import AboutContent from './AboutContent'

export default function About() {
  const bio = fs.readFileSync(path.join(process.cwd(), 'content/bio.md'), 'utf-8')

  return (
    <main>
      <Header
        title="a tedious and possibly pretentious accounting of a person by that person for those who might care to read it."
        intro
      />
      <AboutContent markdown={bio} />
      <footer>
        <a rel="me" href="https://shakedown.social/@mturro">shakedown.social/@mturro</a>
      </footer>
    </main>
  )
}
