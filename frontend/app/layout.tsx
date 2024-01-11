import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import MetaMaskClientProvider from "./components/providers/meta-mask-client-provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoName",
  description: "Vote with smart contracts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <MetaMaskClientProvider>{children}</MetaMaskClientProvider>
      </body>
    </html>
  );
}
