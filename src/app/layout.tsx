import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className="antialiased flex flex-col min-h-dvh justify-between"
      >
        {children}
      </body>
    </html>
  );
}
