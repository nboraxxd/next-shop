import localFont from 'next/font/local'
import type { Metadata } from 'next'

import { MeResponse } from '@/types/account.type'
import { baseOpenGraph } from '@/constants/shared-metadata'
import { AuthProvider, ThemeProvider } from '@/components/provider'
import { Header, SlideSession } from '@/components/shared'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const nunito = localFont({
  src: [
    {
      path: './fonts/nunito/Nunito-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: './fonts/nunito/Nunito-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-nunito',
})

const arimo = localFont({
  src: [
    {
      path: './fonts/arimo/Arimo-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: './fonts/arimo/Arimo-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-arimo',
})

const kanit = localFont({
  src: [
    {
      path: './fonts/kanit/Kanit-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/kanit/Kanit-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: './fonts/kanit/Kanit-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/kanit/Kanit-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: './fonts/kanit/Kanit-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/kanit/Kanit-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/kanit/Kanit-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/kanit/Kanit-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/kanit/Kanit-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/kanit/Kanit-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/kanit/Kanit-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/kanit/Kanit-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/kanit/Kanit-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/kanit/Kanit-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/kanit/Kanit-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/kanit/Kanit-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: './fonts/kanit/Kanit-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/kanit/Kanit-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-kanit',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Next shop',
    default: 'Next shop',
  },
  description: 'This is the main layout of the app.',
  openGraph: baseOpenGraph,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const me: MeResponse['data'] | null = null

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${arimo.className} ${arimo.variable} ${nunito.variable} ${kanit.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider me={me}>
            <Header />
            <SlideSession />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
