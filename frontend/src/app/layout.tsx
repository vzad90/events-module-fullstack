import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Events module",
  description: "Frontend for events listing and registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-neutral-800/20 bg-neutral-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
              <a href="/events" className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide text-neutral-200">
                  Events
                </span>
                <span className="text-xs text-neutral-400">
                  Browse events and register in one place
                </span>
              </a>
            </div>
          </header>
          <main className="mx-auto flex w-full max-w-5xl flex-1 px-4 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
