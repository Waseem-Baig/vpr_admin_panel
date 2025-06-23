import "./globals.css";
import { Inter } from "next/font/google";
import { ClientLayout } from "@/components/layout/ClientLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VPR Admin Panel",
  description: "Admin panel for VPR platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
