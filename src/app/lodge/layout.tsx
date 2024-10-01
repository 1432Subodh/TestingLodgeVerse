import Sidebar from "@/components/route/lodge-route/Sidebar";

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
