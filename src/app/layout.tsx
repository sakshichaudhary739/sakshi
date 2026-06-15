import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Sakshi Digital Resume",
  description: "Digital Resume and Portfolio of Sakshi",
};

import { CursorEngine } from "@/engine/CursorEngine";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-[#2A0A18] font-sans antialiased cursor-none overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CursorEngine />
          {children}
          <AudioPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
