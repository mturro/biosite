import { useRouter } from 'next/router'
import Navigation from './Navigation'
import { lora, merriweather, playfair } from '../pages/_app'

export default function Header({ title }) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <div className="max-w-4xl mx-auto">
      {!isHomePage && <Navigation />}
      <header className="px-4 pt-4" style={{ background: 'white' }}>
        <div className="py-8">
          <h1 className={`text-4xl leading-normal text-left ${playfair.className}`}>{title}</h1>
        </div>
      </header>
    </div>
  )
}
