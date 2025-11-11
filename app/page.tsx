"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import IconModal from "@/app/components/IconModal";
import IconGrid from "@/app/components/IconGrid";

export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl p-6">
        <IconGrid onIconClick={setSelectedIcon} />
      </main>

      {/* Modal */}
      {selectedIcon && (
        <IconModal
          iconName={selectedIcon}
          onClose={() => setSelectedIcon(null)}
        />
      )}
    </>
  );
}
