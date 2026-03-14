import fs from 'fs'
import path from 'path'

function parseFrontmatter(content) {
  const lines = content.split('\n')
  const closeIndex = lines.indexOf('---', 1)
  const meta = {}
  lines.slice(1, closeIndex).forEach((line) => {
    const colonPos = line.indexOf(':')
    if (colonPos > -1) {
      meta[line.slice(0, colonPos).trim()] = line.slice(colonPos + 1).trim()
    }
  })
  const body = lines.slice(closeIndex + 2).join('\n').trim()
  return { ...meta, body }
}

export function getPosts() {
  const dir = path.join(process.cwd(), 'content', 'journal')

  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseFrontmatter(fs.readFileSync(path.join(dir, f), 'utf-8')))
    .sort((a, b) => new Date(b.created) - new Date(a.created))
}
