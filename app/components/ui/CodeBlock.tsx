"use client";

import { useState } from "react";
import { Button } from "./Button";

interface CodeBlockProps {
  code: string;
  language?: string;
  inline?: boolean;
  maxHeight?: string;
  showCopyButton?: boolean;
  copyButtonText?: string;
  copiedText?: string;
}

export function CodeBlock({
  code,
  language: _language = "text",
  inline = false,
  maxHeight = "16rem",
  showCopyButton = true,
  copyButtonText = "Copy",
  copiedText = "Copied!",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (inline) {
    return (
      <code className="px-2 py-1 bg-muted rounded-md border border-border font-mono text-sm text-foreground shadow-sm">
        {code}
      </code>
    );
  }

  return (
    <div className="space-y-2">
      <pre
        className="px-4 py-3 bg-muted rounded-lg border border-border overflow-x-auto text-xs font-mono text-foreground shadow-sm"
        style={{ maxHeight }}
      >
        {code}
      </pre>
      {showCopyButton && (
        <Button
          onClick={copyToClipboard}
          variant="primary"
          size="md"
          fullWidth
        >
          {copied ? copiedText : copyButtonText}
        </Button>
      )}
    </div>
  );
}
