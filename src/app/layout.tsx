import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

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
    <html lang='es'>
      <body className='flex flex-col items-center'>
        <div className='bg-slate-50 sm:w-[80%] lg:w-[50%] h-screen p-4 '>
          <div className='flex bg-[#75aadb] rounded p-2 justify-between items-center'>
            <div className=''>
              <p className='text-white'>Compartí y descargá</p>
              <h1 className='font-bold font-sans text-4xl/6 pb-2 uppercase'>
                Soniditos
              </h1>
            </div>
            <Link className='bg-[#fcbf45] p-2 rounded mr-2 font-medium' href='/login'>Login</Link>
          </div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
