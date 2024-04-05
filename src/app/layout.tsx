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
          <main className="container flex min-h-screen flex-col items-center justify-center">
            <Header />
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="container absolute top-0 flex items-center justify-between py-4">
      <h1 className="text-2xl">Draw Straws</h1>
      <ThemeToggle />
    </header>
  );
}
