"use client";

import { useEffect, useRef, useState } from "react";
import * as BoringIcons from "@boring-icons/react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { CodeBlock } from "./ui/CodeBlock";

interface IconModalProps {
  iconName: string;
  onClose: () => void;
}

export default function IconModal({ iconName, onClose }: IconModalProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgCode, setSvgCode] = useState<string>("");

  const IconComponent = BoringIcons[
    iconName as keyof typeof BoringIcons
  ] as React.ComponentType<any>;
  const displayName = iconName.replace("Icon", "");

  // Function to pretty print SVG
  const formatSvg = (svgString: string): string => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, "image/svg+xml");
      const svg = doc.documentElement;

      const serializer = new XMLSerializer();
      let formatted = serializer.serializeToString(svg);

      // Add proper indentation
      let indent = 0;
      formatted = formatted
        .replace(/></g, ">\n<")
        .split("\n")
        .map((line) => {
          if (line.match(/<\/\w/)) {
            indent--;
          }
          const indented = "  ".repeat(Math.max(0, indent)) + line;
          if (line.match(/<\w[^>]*[^\/]>$/)) {
            indent++;
          }
          return indented;
        })
        .join("\n");

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

  const usageExample = `import { ${iconName} } from "@boring-icons/react";

// No props needed - uses defaults (size: 24, color: "currentColor")
<${iconName} />

// Or customize with props
<${iconName} size={32} color="#3B82F6" />`;

  return (
    <Modal open={true} onClose={onClose} title={displayName}>
      <div className="space-y-6">
        {/* Icon Preview */}
        <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
          <IconComponent ref={svgRef} size="3rem" />
        </div>

        {/* React Component Name */}
        <Input
          label="React Component Name"
          value={iconName}
          readOnly
          showCopyButton
        />

        {/* SVG Code */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            SVG Code
          </label>
          <CodeBlock code={svgCode} copyButtonText="Copy SVG" />
        </div>

        {/* Usage Example */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Usage Example
          </label>
          <CodeBlock
            code={usageExample}
            language="jsx"
            showCopyButton={false}
          />
        </div>
      </div>
    </Modal>
  );
}
