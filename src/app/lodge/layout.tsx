import Sidebar from "@/components/route/lodge-route/Sidebar";
import { Fredoka } from "next/font/google";


export const Fredoka_font = Fredoka({
    subsets: ['latin'],
    weight: ['400'], // Define font weights
    style: ['normal'], // Optional: set style
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const scroll = new LocomotiveScroll();
  return (
    <>
        <Sidebar/>
        {children}
    </>
  );
}
