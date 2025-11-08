import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Doi Tung Finance',
  description: 'LINE-like petty cash demo',
  themeColor: '#0ea5e9',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <head>
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}

