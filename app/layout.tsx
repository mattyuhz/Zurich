import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zürich Field Guide",
  description: "A decisive, low-stress field guide for eating, drinking coffee, seeing design, and exploring Zürich.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
