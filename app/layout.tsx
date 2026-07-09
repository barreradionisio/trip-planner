import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashWrapper from "./components/SplashWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Arma tu viaje ideal, sin complicaciones",
  manifest: "/manifest.json",
  icons: {
  icon: "/icons/icon-192x192.png",
  apple: "/icons/icon-192x192.png",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#1667E6" />
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
</head>
      <body className="min-h-full flex flex-col">
        <SplashWrapper />
        {children}
      </body>
    </html>
  );
}
