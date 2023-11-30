import './globals.css'
import Nav from './components/navbar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reuben Hale Art',
  description: 'Reuben Hale Art Gallery Manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + "h-full dark:bg-slate-900"}>
        <Nav></Nav>
        {children}
      </body>
    </html>
  )
}
