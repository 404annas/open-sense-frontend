import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Bebas_Neue, Playfair_Display, Dancing_Script, PT_Sans } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
import { MenuProvider } from "@/contexts/MenuContext";
import { AuthProvider } from "@/contexts/AuthContext";
import SEOProvider from "@/seo/SEOProvider";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
});

export const metadata = {
  title: "Open Sense - A Film Production Company & Creative Agency",
  description: "A Film Production Company & Creative Agency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${playfair.variable} ${dancing.variable} ${ptSans.variable} antialiased`}
      >
        <SEOProvider>
          <AuthProvider>
            <MenuProvider>
              <ClientWrapper>
                {children}
              </ClientWrapper>
            </MenuProvider>
          </AuthProvider>
        </SEOProvider>
      </body>
    </html>
  );
}
