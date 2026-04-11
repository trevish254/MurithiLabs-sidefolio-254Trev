import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "next-themes";
import { MobileNavProvider } from "@/context/MobileNavContext";
import { FocusProvider } from "@/context/FocusContext";
import { MainContentWrapper } from "@/components/MainContentWrapper";
import GlobalNavigation from "@/components/ui/GlobalNavigation";
import GlobalPreloader from "@/components/ui/GlobalPreloader";
import RouteSkeleton from "@/components/ui/RouteSkeleton";

export const metadata: Metadata = {
  title: "Trevor - Systems Builder & Digital Innovator",
  description:
    "Trevor is a systems builder and digital innovator specializing in building intelligently scaling platforms and tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={twMerge(
          inter.className,
          "flex antialiased bg-black min-h-screen"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MobileNavProvider>
            <FocusProvider>
              <GlobalPreloader />
              <RouteSkeleton />
              <Sidebar />
              <MainContentWrapper>
                {children}
              </MainContentWrapper>
              <GlobalNavigation />
            </FocusProvider>
          </MobileNavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
