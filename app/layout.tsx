import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import { ViewModeProvider } from "@/context/ViewModeContext";
import { GridColsProvider } from "@/context/GridColsContext";
import Intro from "@/components/intro";

const PPEditorialNew = localFont({
  src: [
    {
      path: "../fonts/PPEditorialNew-Ultralight.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-PPeditorialNew",
  display: "swap",
});

const SuisseIntl = localFont({
  src: [
    {
      path: "../fonts/SuisseIntl-Regular-WebXL.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-SuisseIntl",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentin Valette",
  description: "Valentin valette's personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${PPEditorialNew.variable} ${SuisseIntl.variable} antialiased overflow-y-auto`}
      >
        <ViewModeProvider>
          <GridColsProvider>
            <Intro />
            <Navbar />
            {children}
          </GridColsProvider>
        </ViewModeProvider>
      </body>
    </html>
  );
}
