import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { ChatProvider } from '@/context/ChatContext'
import Navbar from '@/components/ui/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'
import AIAssistant from '@/components/ui/AIAssistant'
import Background3D from '@/components/core/Background3D'

export const metadata: Metadata = {
  title: 'Aizaz Iqbal — AI & Software Engineer',
  description: 'Portfolio of Aizaz Iqbal, specializing in AI, Flutter, and modern web development.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add('dark')}})();`
        }} />
      </head>
      <body>
        <ThemeProvider>
          <ChatProvider>
            <Background3D />
            <CustomCursor />
            <Navbar />
            <div className="relative" style={{ zIndex: 10 }}>
              {children}
            </div>
            <AIAssistant />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}