import Header from "@components/Header";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import bio from '../content/bio.md'

export default function About() {
    return (
        <main>
            <Header title="a tedious and possibly pretentious accounting of a person by that person for those who might care to read it." />
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{bio}</ReactMarkdown>
            <a rel="me" href="https://shakedown.social/@mturro">shakedown.social/@mturro</a>
        </main>
    )
}
