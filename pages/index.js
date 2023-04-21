import Head from 'next/head'
import Header from "@components/Header";
import ReactMarkdown from 'react-markdown'
import Footer from '@components/Footer'
import bio from './bio.md'

export default function Home() {
  return (
      <main>
          <Header title="a tedious and possibly pretentious accounting of a person by that person for those who might care to read it." />
          <ReactMarkdown>{bio}</ReactMarkdown>
      </main>
  )
}
