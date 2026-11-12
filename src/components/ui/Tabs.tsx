"use client";

import { useState, type ReactNode } from "react";

export interface TabItem {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
}

export default function Tabs({ tabs, defaultTab, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTab ?? tabs[0]?.label ?? "",
  );

  const activeContent = tabs.find((tab) => tab.label === activeTab)?.content;

  return (
    <section className={`w-full ${className}`}>
      <div role="tablist" className="grid grid-cols-3 border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          const tabId = `tab-${tab.label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")}`;

          return (
            <button
              key={tab.label}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tabId}-panel`}
              onClick={() => setActiveTab(tab.label)}
              className={`border-b-2 px-2 py-4 text-center text-sm transition-colors sm:text-base ${
                isActive
                  ? "border-black font-semibold text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`tab-${activeTab.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-panel`}
        role="tabpanel"
        className="min-h-40 py-6"
      >
        {activeContent}
      </div>
    </section>
  );
}
