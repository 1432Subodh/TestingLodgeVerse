import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/component-ui/navbar/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata:Metadata = {
  title: "Lodge Verse",
  description: "Discover, manage, and explore comfortable and affordable lodging options with ease on Lodge Verse.",
  icons: {
    icon: "/favicon.png", // Path to your favicon
    shortcut: "/favicon.png", // For browsers that look for a shortcut icon
    // apple: "/apple-touch-icon.png", // Optional: For Apple devices (57px-180px sizes)
    other: [
      {
        rel: "icon",
        type: "image/png",
        url: "/favicon-32x32.png", // Optional: Custom sizes
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const scroll = new LocomotiveScroll();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={['light', 'dark']}
            disableTransitionOnChange
            >
            <Navbar/>
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
