import '@styles/globals.css'
import { fraunces, inter, jetbrainsMono } from '@lib/fonts'

export const metadata = {
  title: '(mturro:dotcom)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
