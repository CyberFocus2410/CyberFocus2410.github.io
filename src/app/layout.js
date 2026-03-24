import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: 'Vivan Mittal | BTech CSE Cybersecurity',
  description: 'Personal portfolio of Vivan Mittal — BTech CSE (Cybersecurity) student at Delhi Technical Campus, builder of accessibility tech and security tools.',
  keywords: ['Vivan Mittal', 'Cybersecurity', 'BTech CSE', 'Delhi Technical Campus', 'Portfolio', 'Python', 'Flutter', 'Security'],
  authors: [{ name: 'Vivan Mittal' }],
  openGraph: {
    title: 'Vivan Mittal | BTech CSE Cybersecurity',
    description: 'Personal portfolio of Vivan Mittal — builder of security tools, accessibility tech, and government-scale data platforms.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
