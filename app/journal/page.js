import Header from '@components/Header'
import { getPosts } from '@lib/journal'

export default function Journal() {
  const posts = getPosts()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Header
        title="every once in a while i will take approximately 15 minutes and journal some thoughts. these are the results."
        intro
      />

      {posts.map((post) => (
        <article key={post.id} className="space-y-6 list-none p-0">
          <h2 className="journal-date mb-2 font-bold">
            {new Date(post.created).toLocaleDateString()}
          </h2>
          <p className="line-clamp-3">{post.body}</p>
        </article>
      ))}
    </main>
  )
}
