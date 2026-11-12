"use client";

import type { ReactNode } from "react";
import { RiCloseLine } from "react-icons/ri";

type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  side?: "left" | "right";
  width?: string;
};

export default function SideDrawer({
  open,
  onClose,
  children,
  title,
  side = "left",
  width = "w-[80%] max-w-[360px]",
}: SideDrawerProps) {
  const position = side === "left" ? "left-0" : "right-0";

  const closedPosition =
    side === "left" ? "-translate-x-full" : "translate-x-full";

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed bottom-0 top-0 ${position} z-[70] flex ${width} flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : closedPosition
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-3">
          {title ? (
            <h2 className="text-lg font-bold text-black">{title}</h2>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="ml-auto flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-500 transition hover:bg-gray-100"
          >
            <RiCloseLine size={22} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </aside>
    </>
  );
}
