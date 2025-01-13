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

export const metadata: Metadata = {
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
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="NeCP9-mHATEt4Utgzw8A3TxgHDXCelYJGuF9zyCxywI" />
        <meta name="description" content="Discover, manage, and explore comfortable and affordable lodging options with ease on Lodge Verse." />
        <meta name="keywords" content="lodging, affordable lodging, comfortable lodging, Lodge Verse" />
        <meta name="author" content="Subodh Ravidas" />
        <meta property="og:title" content="Lodge Verse" />
        <meta property="og:description" content="Discover, manage, and explore comfortable and affordable lodging options with ease on Lodge Verse." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lodgeverse.com" />
        <meta property="og:image" content="https://www.lodgeverse.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lodgeverse" />
        <meta name="twitter:title" content="Lodge Verse" />
        <meta name="twitter:description" content="Discover, manage, and explore comfortable and affordable lodging options with ease on Lodge Verse." />
        <meta name="twitter:image" content="https://www.lodgeverse.com/twitter-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://lodgeverse.netlify.app",
              "@type": "WebSite",
              "url": "https://lodgeverse.netlify.app",
              "name": "Lodge Verse",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://lodgeverse.netlify.app/lodge/?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
