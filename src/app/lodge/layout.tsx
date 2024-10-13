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
        <div className="pt-16 sm:px-10 px-4 sm:pl-[285px] pb-4">

        {children}
        </div>
    </>
  );
}
