import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import ToasterContext from '../contexts/ToasterContext'

import './globals.css'

const font = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parole',
  description: 'A messages app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterContext />
        {children}
      </body>
    </html>
  )
}

