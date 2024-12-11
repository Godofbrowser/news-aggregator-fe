import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '../containers/ThemeProvider';
import { AppProvider } from '../contexts/AppContext';
import { cn } from '@/lib/utils';
import { ArticlesContextProvider } from '@/contexts/ArticlesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NewsHub',
  description: 'Your personalized news platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'transition-all duration-300')} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AppProvider>
            <ArticlesContextProvider>
              {children}
              <Toaster />
            </ArticlesContextProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}