import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arena R12',
  description: 'Arena R12 a sua loja de esportes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="utf-8">
      <body className={`${inter.className} bg-gradient-to-r from-emerald-500 to-emerald-900`}>{children}</body>
    </html>
  )
}
