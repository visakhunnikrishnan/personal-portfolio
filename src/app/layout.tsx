import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
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
  title: "Visakh Unni",
  description:
    "Research engineer exploring hidden pattern mining, parallel computing, data storytelling, and developer platforms.",
  openGraph: {
    title: "Visakh Unni",
    description:
      "Research engineer exploring hidden pattern mining, parallel computing, data storytelling, and developer platforms.",
    url: "https://visakhunni.com",
    siteName: "Visakh Unni",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visakh Unni",
    description:
      "Research engineer exploring hidden pattern mining, parallel computing, data storytelling, and developer platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
              <a href="/" className="text-base font-semibold tracking-tight">
                Visakh Unni
              </a>
              <ThemeToggle />
            </div>
          </header>
          <main className="mx-auto max-w-3xl px-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
