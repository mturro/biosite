import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import Footer from '@components/Footer'
import bio from './bio.md'

export default function Home() {
  return (
      <main>
        <ReactMarkdown>{bio}</ReactMarkdown>
      </main>
  )
}
