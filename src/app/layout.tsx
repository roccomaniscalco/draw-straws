import { ThemeProvider, ThemeToggle } from "@/components/theme";
import type { Metadata } from "next";
import "@/globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Draw Straws",
  description: "Draw straws with your friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="fixed top-4 right-4">
      <ThemeToggle />
    </header>
  );
}
