import dynamic from 'next/dynamic';
import { Metadata } from "next";
import Script from 'next/script';

const Sidebar = dynamic(() => import('@/components/route/lodge-route/Sidebar'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Find Lodge",
  description: "Discover, manage, and explore comfortable and affordable lodging options with ease on Lodge Verse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="pt-16 sm:px-10 px-4 sm:pl-[285px] pb-4">
        {children}
      </main>
      <Script src="https://example.com/some-script.js" strategy="lazyOnload" />
    </>
  );
}
