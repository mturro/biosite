'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { merriweather } from '@lib/fonts'

export default function AboutContent({ markdown }) {
  return (
    <div className={merriweather.className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}
