import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import AppShellLayout from "@/components/app-shell/app-shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PHeP - Healthcare Predictive System",
  description: "PHeP - Healthcare Predictive System",
};

// export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
          <AppShellLayout>{children}</AppShellLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
