"use client";

import { useEffect, useRef, useState } from "react";
import * as BoringIcons from "@boring-icons/react";

interface IconModalProps {
  iconName: string;
  onClose: () => void;
}

export default function IconModal({ iconName, onClose }: IconModalProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgCode, setSvgCode] = useState<string>("");
  const [copiedReact, setCopiedReact] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);

  const IconComponent = BoringIcons[
    iconName as keyof typeof BoringIcons
  ] as React.ComponentType<any>;
  const displayName = iconName.replace("Icon", "");

  // Function to pretty print SVG
  const formatSvg = (svgString: string): string => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, 'image/svg+xml');
      const svg = doc.documentElement;

      const serializer = new XMLSerializer();
      let formatted = serializer.serializeToString(svg);

      // Add proper indentation
      let indent = 0;
      formatted = formatted
        .replace(/></g, '>\n<')
        .split('\n')
        .map(line => {
          if (line.match(/<\/\w/)) {
            indent--;
          }
          const indented = '  '.repeat(Math.max(0, indent)) + line;
          if (line.match(/<\w[^>]*[^\/]>$/)) {
            indent++;
          }
          return indented;
        })
        .join('\n');

      return formatted;
    } catch (e) {
      return svgString;
    }
  };

  useEffect(() => {
    // Extract SVG code from the rendered component
    if (svgRef.current) {
      const svgString = svgRef.current.outerHTML;
      setSvgCode(formatSvg(svgString));
    }
  }, [iconName]);

  useEffect(() => {
    // Close modal on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const copyToClipboard = async (text: string, type: "react" | "svg") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "react") {
        setCopiedReact(true);
        setTimeout(() => setCopiedReact(false), 2000);
      } else {
        setCopiedSvg(true);
        setTimeout(() => setCopiedSvg(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold">{displayName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Icon Preview */}
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
            <IconComponent ref={svgRef} size="3rem" />
          </div>

          {/* React Icon Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              React Component Name
            </label>
            <div className="flex gap-2">
              <code className="flex-1 px-4 py-3 bg-gray-50 rounded border border-gray-200 font-mono text-sm">
                {iconName}
              </code>
              <button
                onClick={() => copyToClipboard(iconName, "react")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                {copiedReact ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* SVG Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SVG Code
            </label>
            <div className="space-y-2">
              <pre className="px-4 py-3 bg-gray-50 rounded border border-gray-200 overflow-x-auto text-xs font-mono max-h-64">
                {svgCode}
              </pre>
              <button
                onClick={() => copyToClipboard(svgCode, "svg")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {copiedSvg ? "Copied!" : "Copy SVG"}
              </button>
            </div>
          </div>

          {/* Usage Example */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usage Example
            </label>
            <pre className="px-4 py-3 bg-gray-50 rounded border border-gray-200 overflow-x-auto text-xs font-mono">
              {`import { ${iconName} } from "@boring-icons/react";

// No props needed - uses defaults (size: 24, color: "currentColor")
<${iconName} />

// Or customize with props
<${iconName} size={32} color="#3B82F6" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
