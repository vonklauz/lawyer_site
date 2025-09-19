import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/ui/Components/ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className="antialiased"
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
