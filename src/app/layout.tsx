import type { Metadata } from 'next';
import { mono, display } from '@/lib/fonts';
import { Titlebar } from '@/components/ide/Titlebar';
import { Sidebar } from '@/components/ide/Sidebar';
import { TabBar } from '@/components/ide/TabBar';
import { StatusBar } from '@/components/ide/StatusBar';
import { EditorShell } from '@/components/ide/EditorShell';
import { ActivityBar } from '@/components/ide/ActivityBar';
import { Minimap } from '@/components/ide/Minimap';
import { TabProvider } from '@/lib/TabContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arnav Trivedi — Full Stack Developer',
  description:
    'Arnav Trivedi — Computer Science Undergraduate at VIT. Full Stack Developer building with MERN, Next.js, FastAPI, Spring Boot, and exploring AI/ML and DevOps.',
  openGraph: {
    title: 'Arnav Trivedi — Full Stack Developer',
    description:
      'Portfolio of Arnav Trivedi — CS @ VIT. Building intelligent systems with MERN, AI/ML, Spring Boot, and DevOps.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="catppuccin-mocha"
      className={`${mono.variable} ${display.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent theme flash — reads localStorage before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var stored = localStorage.getItem('portfolio-theme');
                var valid = ['catppuccin-mocha','midnight-void','matcha-earthy','catppuccin-latte','matcha-parchment'];
                var theme = (stored && valid.indexOf(stored) !== -1) ? stored : 'catppuccin-mocha';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className="h-full flex flex-col font-mono bg-bg-primary text-text-primary overflow-hidden">
        {/* Animated blob background — visible only on light themes via CSS var */}
        <div className="blob-bg" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        <TabProvider>
          {/* IDE Shell */}
          <Titlebar />
          <div className="flex flex-1 overflow-hidden">
            <ActivityBar />
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden editor-bg-texture">
              <TabBar />
              <div className="flex-1 flex overflow-hidden">
                <EditorShell>{children}</EditorShell>
                <Minimap />
              </div>
            </div>
          </div>
          <StatusBar />
        </TabProvider>
      </body>
    </html>
  );
}
