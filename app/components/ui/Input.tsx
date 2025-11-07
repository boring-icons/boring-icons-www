"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Button } from "./Button";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCopyButton?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      showCopyButton = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
      const value = props.value?.toString() || "";
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="flex gap-2">
          <input
            ref={ref}
            className={`flex-1 px-4 py-3 bg-muted rounded-lg border border-border font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-base shadow-sm ${className}`.trim()}
            {...props}
          />
          {showCopyButton && (
            <Button
              onClick={copyToClipboard}
              variant="primary"
              size="md"
              type="button"
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          )}
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
