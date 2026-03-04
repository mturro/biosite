import '@styles/globals.css'
import { merriweather } from '@lib/fonts'

export const metadata = {
  title: '(mturro:dotcom)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={merriweather.className}>
        {children}
      </body>
    </html>
  )
}
