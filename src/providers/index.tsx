"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import type { ReactNode } from "react";
import GoogleAuthProvider from "./google-auth-provider";
import QueryProvider from "./query.provider";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </QueryProvider>
    </GoogleAuthProvider>
  );
}
