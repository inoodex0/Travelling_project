import { ReactNode } from "react";
import "./globals.css";
import TopBar from "@/components/global/TopBar"; 
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import SmoothScroll from "@/components/global/SmoothScroll";
import CustomCursor from "@/components/global/CustomCursor";
import Providers from "@/components/global/Providers";

export const metadata = {
  title: "TravelX - Best Tour & Travel Agency",
  description: "Book your next dream destination with us.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-white text-gray-900 antialiased dark:bg-slate-950 dark:text-gray-100 lg:cursor-none">
        <Providers>
          <CustomCursor />
          <SmoothScroll>
            
            {/* Header wrapper added here */}
            <header className="w-full block relative z-[99] bg-white dark:bg-slate-950">
              <TopBar /> 
              <Navbar />
            </header>

            <main className="flex-grow">
              {children}
            </main>

            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}