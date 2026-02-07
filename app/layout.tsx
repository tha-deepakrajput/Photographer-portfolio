import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        {/* Main content grows to fill space */}
        <main className="grow pt-32">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
