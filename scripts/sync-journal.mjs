#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, '..', 'content', 'journal')

function toMarkdown(post) {
  return [
    '---',
    `id: ${post.id}`,
    `slug: ${post.slug || ''}`,
    `created: ${post.created}`,
    '---',
    '',
    post.body,
  ].join('\n')
}

async function main() {
  const response = await fetch('https://write.as/api/collections/mturro/posts', {
    headers: { 'Accept': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  const posts = data?.data?.posts

  if (!Array.isArray(posts)) {
    throw new Error('Unexpected API response shape')
  }

  fs.mkdirSync(outputDir, { recursive: true })

  let count = 0
  for (const post of posts) {
    const filePath = path.join(outputDir, `${post.id}.md`)
    fs.writeFileSync(filePath, toMarkdown(post), 'utf-8')
    count++
  }

  console.log(`Synced ${count} posts to content/journal/`)
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
