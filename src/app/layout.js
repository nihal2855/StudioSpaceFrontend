
import Footer from "@/components/layout/Footer";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "StudioSpace | Find Your Creative Space",
  description:
    "Discover and book professional photography studios, podcast rooms, music suites and creative workspaces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <NextTopLoader color="#ea7838" showSpinner={false} />
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
