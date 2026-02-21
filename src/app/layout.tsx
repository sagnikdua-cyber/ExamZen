import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "sonner";
import OfflineAlert from "@/components/OfflineAlert";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ExamZen | Your Last Night Study Companion",
  description: "The ultimate AI-powered exam preparation tool for UEM students. Get PYQs, AI predictions, and flashcards instantly.",
  keywords: ["UEM Kolkata", "Exam Prep", "Engineering", "PYQs", "AI Study Assistant"],
  authors: [{ name: "Sagnik" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
          <OfflineAlert />
        </AuthProvider>
      </body>
    </html>
  );
}
