import './globals.css'
import { Inter } from 'next/font/google'

import 'react-toastify/dist/ReactToastify.css';

import Providers from './reduxStore/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bloggo App',
  description: 'Share Your Thought...! WITH BLOGGO',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  )
}
