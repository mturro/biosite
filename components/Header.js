import Navigation from './Navigation'
import { playfair } from '@lib/fonts'

export default function Header({ title, showNavigation = true }) {
  return (
    <div className="max-w-4xl mx-auto">
      {showNavigation && <Navigation />}
      <header className="px-4 pt-4" style={{ background: 'white' }}>
        <div className="py-8">
          <h1 className={`text-4xl leading-normal text-left ${playfair.className}`}>{title}</h1>
        </div>
      </header>
    </div>
  )
}
