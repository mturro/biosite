import Header from "@components/Header";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import bio from '../content/bio.md'
import { merriweather } from './_app'

export default function About() {
    return (
        <main>
            <Header title="a tedious and possibly pretentious accounting of a person by that person for those who might care to read it." />
            <div className={merriweather.className}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{bio}</ReactMarkdown>
            </div>
            <a rel="me" href="https://shakedown.social/@mturro">shakedown.social/@mturro</a>
        </main>
    )
}
