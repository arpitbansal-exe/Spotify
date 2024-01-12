import type { Metadata } from 'next'
import Sidebar from './componants/Sidebar'
import { Figtree, Inter } from 'next/font/google'
import './globals.css'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModelProvider from '@/providers/ModelProvider'
import ToasterProvider from '@/providers/Toasterprovider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from './componants/Player'
const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Spotify by Arpit Bansal;',
}
export const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs= await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider/> 
            <Sidebar
              songs={userSongs}>
              {children}
            </Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
