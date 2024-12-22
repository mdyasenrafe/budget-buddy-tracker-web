import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: "Budget Buddy Tracker",
  description:
    "Your ultimate personal finance companion. Track your expenses, set budgets, and achieve your financial goals effortlessly with Budget Buddy Tracker. Take control of your finances today!",
};

const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${poppins.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
