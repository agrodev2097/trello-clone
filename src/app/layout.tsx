import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trello clone App",
  description: "Trello clone build with Next.js and TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark bg-gray-900">{children}</body>
    </html>
  );
}
