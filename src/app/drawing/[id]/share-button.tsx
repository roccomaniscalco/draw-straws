"use client";

import { Button } from "@/components/ui/button";
import { Check, Clipboard } from "lucide-react";
import { useEffect, useState } from "react";

export function ShareButton() {
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  });

  return (
    <Button
      onClick={async () => {
        await navigator.clipboard.writeText(
          window.location.origin + window.location.pathname,
        );
        setIsCopied(true);
      }}
    >
      {isCopied ? (
        <>
          <Check className="mr-2 h-4 w-4 animate-in zoom-in" />
          Link Copied
        </>
      ) : (
        <>
          <Clipboard className="mr-2 h-4 w-4" />
          Copy Shareable Link
        </>
      )}
    </Button>
  );
}
