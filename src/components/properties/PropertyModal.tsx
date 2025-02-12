"use client";

import { useState } from "react";
import PropertyForm from "@/components/properties/PropertyForm";
import { type PropertyRto } from "@/lib/schema";

interface PropertyModalProps {
  property?: PropertyRto;
  trigger: React.ReactNode;
}

export default function PropertyModal({ property, trigger }: PropertyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = Boolean(property);

  return (
    <div className="drawer drawer-end">
      <input id="property-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} />

      {/* Trigger wraps the passed in trigger component */}
      <div className="drawer-content" onClick={() => setIsOpen(true)}>
        {trigger}
      </div>

      {/* Sidebar content */}
      <div className="drawer-side">
        <label htmlFor="property-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={() => setIsOpen(false)}></label>

        <div className="bg-base-100 min-h-full w-[40rem] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">{isEditMode ? "Edit Property" : "Add New Property"}</h3>
            <button className="btn btn-circle btn-sm" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <PropertyForm property={property} onSuccess={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
}
