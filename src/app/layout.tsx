import './globals.css'
import { Inter } from 'next/font/google'


export const metadata = {
  title: 'Soniditos',
  description: 'Compartí y descargá soniditos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className=''>{children}</body>
    </html>
  )
}
