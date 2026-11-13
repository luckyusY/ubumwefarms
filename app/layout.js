import { Fraunces, Figtree } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE, whatsappLink } from '@/lib/site';
import BuyPopup from '@/components/BuyPopup';
import { WhatsAppIcon } from '@/components/Icons';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Figtree({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata = {
  title: { default: `${SITE.name} | Rabbits and farm animals for sale`, template: `%s | ${SITE.name}` },
  description: 'Buy healthy rabbits, chickens, goats, pigs and other farm animals directly from Ubumwe Farms.',
};

export const viewport = { themeColor: '#1f4a33' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <BuyPopup />
        <a
          className="wa-float"
          href={whatsappLink(`Hello ${SITE.name}, I would like to ask about your animals.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon aria-hidden /> WhatsApp
        </a>
      </body>
    </html>
  );
}
