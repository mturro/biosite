import Header from "@components/Header";
import { lora, merriweather, playfair } from '../_app';

export async function getServerSideProps() {
  try {
    const response = await fetch('https://write.as/api/collections/mturro/posts', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('API response not ok:', {
        status: response.status,
        statusText: response.statusText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Add console.log to see the structure of the response
    console.log('API Response:', data);

    // Fix: Access posts through data.data.posts
    const posts = Array.isArray(data.data.posts) ? data.data.posts : [];

    return {
      props: {
        posts: posts
      }
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      props: {
        posts: [],
        error: `Failed to load journal entries: ${error.message}`
      }
    };
  }
}

export default function Page({ posts, error }) {
  if (error) {
    return (
      <main className={`max-w-4xl mx-auto px-4 py-8 ${merriweather.className}`}>
        <Header title="(mturro:journal)" />
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className={`max-w-4xl mx-auto px-4 py-8 ${merriweather.className}`}>
      <Header title="every once in a while i will take approximately 15 minutes and journal some thoughts. these are the results." />
      
        {posts.map((post) => (
        <article key={post.id} className="space-y-6 list-none p-0">
            <h2 className={`text-gray-600 mb-2 font-bold ${lora.className}`}>
              {new Date(post.created).toLocaleDateString()}
            </h2>
            <p className="line-clamp-3">{post.body}</p>
        </article>
      ))}
    </main>
  );
} 