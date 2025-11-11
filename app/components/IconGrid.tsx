"use client";

import * as BoringIcons from "@boring-icons/react";

interface IconGridProps {
  onIconClick: (iconName: string) => void;
}

export default function IconGrid({ onIconClick }: IconGridProps) {
  // Get all icon components
  const icons = Object.keys(BoringIcons)
    .filter((key) => key.startsWith("Icon"))
    .sort();

  return (
    <>
      <p className="text-fg-muted mb-6">{icons.length} icons available. More soon.</p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {icons.map((iconName) => {
          const IconComponent = BoringIcons[iconName as keyof typeof BoringIcons] as React.ComponentType<any>;
          const displayName = iconName.replace("Icon", "");

          return (
            <div
              key={iconName}
              onClick={() => onIconClick(iconName)}
              className="flex flex-col items-center px-1 py-3 rounded-xl hover:bg-surface-elevated transition-colors group cursor-pointer"
            >
              <IconComponent
                size="2rem"
                className="mb-2 stroke-fg transition-all duration-200 group-hover:scale-125 group-hover:stroke-lime-200"
              />
              <span className="text-xs text-center text-fg-muted">{displayName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
