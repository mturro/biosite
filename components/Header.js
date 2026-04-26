import Navigation from './Navigation'

export default function Header({ title, intro = false, showNavigation = true }) {
  return (
    <div className="max-w-4xl mx-auto">
      {showNavigation && <Navigation />}
      <header className="px-4 pt-4">
        <div className="py-8">
          <h1 className={intro ? 'page-intro' : 'site-title'}>{title}</h1>
        </div>
      </header>
    </div>
  )
}
