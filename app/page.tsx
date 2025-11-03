import Header from "@/components/Header";
import * as BoringIcons from "@boring-icons/react";

export default function Home() {
  // Get all icon components
  const icons = Object.keys(BoringIcons)
    .filter((key) => key.startsWith("Icon"))
    .sort();

  return (
    <div className="flex flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl p-6">
        <h1 className="text-2xl font-semibold mb-2">Boring Icons</h1>
        <p className="text-gray-600 mb-6">{icons.length} icons available</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {icons.map((iconName) => {
            const IconComponent = BoringIcons[iconName as keyof typeof BoringIcons] as React.ComponentType<any>;
            const displayName = iconName.replace("Icon", "");

            return (
              <div
                key={iconName}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <IconComponent
                  size="2rem"
                  className="mb-2 transition-all duration-200 group-hover:scale-125 group-hover:text-blue-600"
                />
                <span className="text-xs text-center text-gray-700">{displayName}</span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
