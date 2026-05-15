import type { Metadata } from 'next';
import { mono, display } from '@/lib/fonts';
import { Titlebar } from '@/components/ide/Titlebar';
import { Sidebar } from '@/components/ide/Sidebar';
import { TabBar } from '@/components/ide/TabBar';
import { StatusBar } from '@/components/ide/StatusBar';
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
      data-theme="dark"
      className={`${mono.variable} ${display.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent theme flash — reads localStorage before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var t = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', t);
              })();
            `,
          }}
        />
      </head>
      <body className="h-full flex flex-col font-mono bg-bg-primary text-text-primary overflow-hidden">
        {/* IDE Shell */}
        <Titlebar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TabBar />
            <main className="flex-1 overflow-y-auto bg-bg-editor p-6 md:p-8">
              {children}
            </main>
          </div>
        </div>
        <StatusBar />
      </body>
    </html>
  );
}
